import { Canvas, useFrame } from '@react-three/fiber'
import { ParticleField } from './ParticleField'
import { Nebula } from './Nebula'
import { ShootingStars } from './ShootingStars'
import { webglMouse } from '../../utils/webglMouse'

// Smooth mouse ref for camera — lerped separately so it's silkier than the particle swirl
const smoothCamMouse = { x: 0, y: 0 }

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()

    // Lerp camera mouse toward cursor — very gentle, silk-smooth
    smoothCamMouse.x += (webglMouse.x - smoothCamMouse.x) * 0.018
    smoothCamMouse.y += (webglMouse.y - smoothCamMouse.y) * 0.018

    // Slow autonomous drift — feels alive without mouse
    const autoY = Math.sin(t * 0.00028) * 0.07
    const autoX = Math.sin(t * 0.00019) * 0.04

    // Mouse tilt — tiny rotation that follows cursor
    camera.rotation.y = autoY + smoothCamMouse.x * 0.04
    camera.rotation.x = autoX - smoothCamMouse.y * 0.025
    camera.rotation.z = smoothCamMouse.x * smoothCamMouse.y * 0.008
  })
  return null
}

export function BackgroundCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 60], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CameraDrift />
        <Nebula />
        <ParticleField />
        <ShootingStars />
      </Canvas>
    </div>
  )
}
