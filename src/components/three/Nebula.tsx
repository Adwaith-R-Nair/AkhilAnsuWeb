import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { webglMouse } from '../../utils/webglMouse'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Very light nebula — a soft atmospheric wash, barely visible through the page
const fragmentShader = `
uniform float uTime;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec2  uMouse;
varying vec2  vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),               hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p  = p * 2.1 + vec2(100.0);
    a *= 0.48;
  }
  return v;
}

void main() {
  float t = uTime * 0.045;

  // Very gentle mouse stir
  vec2 stir = uMouse * 0.10;
  vec2 warp = vec2(sin(vUv.y * 3.14 + t * 0.6), cos(vUv.x * 3.14 - t * 0.4)) * 0.04;

  float n  = fbm(vUv * 2.5 + t       + stir + warp);
  float n2 = fbm(vUv * 3.2 - t * 0.5 - stir * 0.5 + vec2(1.7));
  float blend = n * n2;

  vec3 color = mix(uColorA, uColorB, smoothstep(0.1, 0.7, blend));

  // Gentle atmospheric wash — visible now that page wrapper is transparent
  float alpha = smoothstep(0.0, 0.5, blend) * 0.16;

  gl_FragColor = vec4(color, alpha);
}
`

interface NebulaPlaneProps {
  colorA:    THREE.Color
  colorB:    THREE.Color
  position:  [number, number, number]
  rotation?: [number, number, number]
}

function NebulaPlane({ colorA, colorB, position, rotation = [0, 0, 0] }: NebulaPlaneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    matRef.current.uniforms.uMouse.value.set(webglMouse.x, webglMouse.y)
  })

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[150, 150]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:   { value: 0 },
          uColorA: { value: colorA },
          uColorB: { value: colorB },
          uMouse:  { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function Nebula() {
  return (
    <>
      {/* Lavender wash */}
      <NebulaPlane
        colorA={new THREE.Color('#c4b0f0')}
        colorB={new THREE.Color('#ddd0f8')}
        position={[0, 0, -55]}
      />
      {/* Blush accent, far corner */}
      <NebulaPlane
        colorA={new THREE.Color('#edbfca')}
        colorB={new THREE.Color('#c4b0f0')}
        position={[30, 15, -65]}
        rotation={[0.2, 0.15, 0.08]}
      />
    </>
  )
}
