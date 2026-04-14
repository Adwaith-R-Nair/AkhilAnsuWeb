/**
 * Shared mouse state for WebGL shaders.
 * Updated every mousemove in App.tsx, read every frame in ParticleField / Nebula.
 * Module-level (singleton) — no React re-renders, no context overhead.
 *
 * Coordinate convention:  x ∈ [-1, 1]  y ∈ [-1, 1]  (WebGL NDC, Y-up)
 */
export const webglMouse = { x: 0.0, y: 0.0 }
