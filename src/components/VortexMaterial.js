import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const VortexMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#ffffff'),
    uOpacity: 0.0,
    uActivation: 0.0,
    uWaterFlow: 0.0,
    uClarity: 0.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uActivation;
  uniform float uWaterFlow;
  uniform float uClarity;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
  float noise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    
    float dist = distance(uv, vec2(0.5));
    float mask = smoothstep(0.5, 0.45, dist);
    
    // 1. Centrifugal Swirl (Aerodynamics)
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float swirlV = sin(dist * 12.0 - uTime * uActivation * 8.0 + angle * 4.0);
    
    // 2. Gravity Downward Flow (Physical Water)
    // Moving noise field downwards to simulate water being pulled by gravity
    vec2 flowUv = vec2(uv.x * 2.0, uv.y * 5.0 + uTime * uWaterFlow * 3.0);
    float waterNoise = noise(flowUv + swirlV * 0.1);
    
    // 3. Physical State Synthesis
    // Murky/Turbulent during flow -> Clear during drying
    float turbulence = mix(swirlV * waterNoise, swirlV * 0.05, uClarity);
    float gravityPresence = mix(waterNoise * 1.5, 0.0, uClarity);

    vec3 baseColor = uColor;
    vec3 finalColor = baseColor + (gravityPresence * 0.1) + (turbulence * 0.1);
    
    // Alpha logic: Activation dictates existence, Clarity dictates transparency
    float alpha = mask * uOpacity * (uActivation * 0.7 + gravityPresence * uWaterFlow * 0.3);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
  `
)

extend({ VortexMaterial })

export default VortexMaterial
