uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p * 8.0);
  vec2 f = fract(p * 8.0);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  float n = noise(vUv + uTime * 0.01);
  // Reveal pixels where noise < progress
  float reveal = step(n, uProgress);
  // Desaturate when progress < 1
  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 desaturated = vec3(gray);
  float saturation = smoothstep(0.3, 0.9, uProgress);
  vec3 finalColor = mix(desaturated, texColor.rgb, saturation);
  gl_FragColor = vec4(finalColor, texColor.a * reveal);
}
