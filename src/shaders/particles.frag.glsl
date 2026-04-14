uniform float uTime;
varying float vTwinkle;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;
  float alpha = pow(1.0 - dist * 2.0, 2.5);
  // Lavender to blush tint per particle
  vec3 lavColor   = vec3(0.82, 0.75, 0.97);
  vec3 blushColor = vec3(0.95, 0.80, 0.85);
  vec3 color = mix(lavColor, blushColor, vTwinkle);
  // Twinkle
  float twinkle = sin(uTime * 2.0 + vTwinkle * 6.28318) * 0.3 + 0.7;
  gl_FragColor = vec4(color, alpha * twinkle * 0.6);
}
