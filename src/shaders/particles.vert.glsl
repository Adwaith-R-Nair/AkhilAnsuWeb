uniform float uTime;
uniform float uSize;
attribute float aScale;
attribute float aTwinkle;
varying float vTwinkle;

void main() {
  vTwinkle = aTwinkle;
  vec3 pos = position;
  // Slow upward drift — wraps in a 200-unit band
  pos.y += mod(uTime * 0.8 + aTwinkle * 100.0, 200.0) - 100.0;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * aScale * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
