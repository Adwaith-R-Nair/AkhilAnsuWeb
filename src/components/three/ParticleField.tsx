import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { webglMouse } from '../../utils/webglMouse'

// Fewer, smaller, much lighter particles — delicate sparkle on white
const PARTICLE_COUNT = 3600
const WORLD_SCALE    = 34.64   // NDC → world at z=0 (camera z=60, fov=60)

const vertexShader = `
uniform float uTime;
uniform float uSize;
uniform vec2  uMouse;
uniform float uMouseRadius;
attribute float aScale;
attribute float aTwinkle;
varying float vTwinkle;

void main() {
  vTwinkle = aTwinkle;

  vec3 pos = position;
  // Gentle upward drift
  pos.y = mod(pos.y + uTime * 0.4 + aTwinkle * 100.0, 200.0) - 100.0;

  // Subtle mouse swirl — much gentler than before
  vec2 mouseWorld = uMouse * ${WORLD_SCALE.toFixed(2)};
  vec2 delta      = pos.xy - mouseWorld;
  float dist      = length(delta);
  float influence = smoothstep(uMouseRadius, 0.0, dist);

  float swirlAngle = atan(delta.y, delta.x) + 0.6;
  vec2  swirlDir   = vec2(cos(swirlAngle), sin(swirlAngle));
  float pulse      = sin(uTime * 1.6 + aTwinkle * 6.28318) * 0.25 + 0.75;

  pos.xy += swirlDir * influence * 5.0 * pulse;

  vec4 mvPosition  = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize     = uSize * aScale * (260.0 / -mvPosition.z);
  gl_Position      = projectionMatrix * mvPosition;
}
`

// Very light pastel palette — looks beautiful on white without competing with text
const fragmentShader = `
uniform float uTime;
varying float vTwinkle;

void main() {
  vec2  uv   = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;

  // Soft glow: bright centre fading to transparent edge
  float alpha = pow(1.0 - dist * 2.0, 2.2);

  // Richer palette — more saturated lavender, rose and violet
  vec3 lavColor   = vec3(0.58, 0.44, 0.96);   // vivid lavender
  vec3 blushColor = vec3(0.96, 0.55, 0.74);   // vivid rose
  vec3 pearlColor = vec3(0.70, 0.48, 0.99);   // vivid violet

  vec3 color = mix(lavColor, blushColor,  smoothstep(0.0, 0.55, vTwinkle));
  color      = mix(color,    pearlColor,  smoothstep(0.65, 1.0, vTwinkle));

  // More pronounced twinkle
  float twinkle = sin(uTime * 1.2 + vTwinkle * 6.28318) * 0.30 + 0.70;

  // Higher opacity for visible colour
  gl_FragColor = vec4(color, alpha * twinkle * 0.78);
}
`

export function ParticleField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, scales, twinkles } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const scales    = new Float32Array(PARTICLE_COUNT)
    const twinkles  = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 180
      positions[i * 3 + 1] = (Math.random() - 0.5) * 180
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      scales[i]   = Math.random() * 1.4 + 0.5
      twinkles[i] = Math.random()
    }
    return { positions, scales, twinkles }
  }, [])

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    materialRef.current.uniforms.uMouse.value.set(webglMouse.x, webglMouse.y)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aScale"   array={scales}    count={PARTICLE_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aTwinkle" array={twinkles}  count={PARTICLE_COUNT} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:        { value: 0 },
          uSize:        { value: 6.5 },        // slightly larger for colour visibility
          uMouse:       { value: new THREE.Vector2(0, 0) },
          uMouseRadius: { value: 18.0 },       // narrower influence zone
        }}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
