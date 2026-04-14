import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StarData {
  start: THREE.Vector3
  end: THREE.Vector3
  progress: number
  speed: number
  line: THREE.Line
}

function makeStarData(group: THREE.Group): StarData {
  const x = (Math.random() - 0.5) * 150
  const y = Math.random() * 40 + 10
  const z = (Math.random() - 0.5) * 50 - 20

  const start = new THREE.Vector3(x - 30, y, z)
  const end   = new THREE.Vector3(x + 30, y - 15, z)

  const geo = new THREE.BufferGeometry().setFromPoints([start, start.clone()])
  const mat = new THREE.LineBasicMaterial({
    color: '#c4b0f0',
    transparent: true,
    opacity: 0.8,
  })
  const line = new THREE.Line(geo, mat)
  group.add(line)

  return { start, end, progress: 0, speed: 0.35 + Math.random() * 0.25, line }
}

export function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null!)
  const starsRef = useRef<StarData[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Spawn stars on an interval — pure refs, no React state
  useEffect(() => {
    const spawn = () => {
      if (groupRef.current) {
        starsRef.current.push(makeStarData(groupRef.current))
      }
      timerRef.current = setTimeout(spawn, 6000 + Math.random() * 8000)
    }
    timerRef.current = setTimeout(spawn, 2000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      // Dispose all Three.js objects on unmount
      starsRef.current.forEach(({ line }) => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
        groupRef.current?.remove(line)
      })
      starsRef.current = []
    }
  }, [])

  // Update star positions every frame — no React re-renders
  useFrame((_, delta) => {
    const alive: StarData[] = []

    for (const star of starsRef.current) {
      star.progress += delta * star.speed

      if (star.progress >= 1) {
        // Done — dispose and remove
        star.line.geometry.dispose()
        ;(star.line.material as THREE.Material).dispose()
        groupRef.current?.remove(star.line)
        continue
      }

      // Update line endpoints directly on the existing geometry
      const pos  = star.start.clone().lerp(star.end, star.progress)
      const tail = star.start.clone().lerp(star.end, Math.max(0, star.progress - 0.18))
      star.line.geometry.setFromPoints([tail, pos])
      star.line.geometry.attributes.position.needsUpdate = true
      ;(star.line.material as THREE.LineBasicMaterial).opacity = 0.8 * (1 - star.progress)

      alive.push(star)
    }

    starsRef.current = alive
  })

  return <group ref={groupRef} />
}
