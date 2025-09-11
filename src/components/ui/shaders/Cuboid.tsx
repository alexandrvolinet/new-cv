'use client'

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const fragmentShader = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uZOffset;

mat2 R;
float d = 1.0;
float z = 0.0;
float G = 9.0;
float M = 1e-3;

float D(vec3 p) {
  p.xy *= R;
  p.xz *= R;
  vec3 S = sin(123. * p);
  G = min(G, max(abs(length(p) - 0.6),
    d = pow(dot(p*=p*p*p, p), 0.125) - 0.5
      - pow(1.0 + S.x*S.y*S.z, 8.0) / 1e5));
  return d;
}

void mainImage(out vec4 o, vec2 fragCoord) {
  vec2 C = fragCoord;
  vec3 p = vec3(0.0);
  vec3 O = vec3(0.0);
  vec3 r = vec3(0.0);
  vec3 I = normalize(vec3(C - 0.5 * iResolution.xy, iResolution.y));
  vec3 B = vec3(1.0, 2.0, 9.0) * M;

  float a = 0.1 * iTime;
  R = mat2(cos(a), -sin(a), sin(a), cos(a));

  for(; z < 9.0 && d > M; z += D(p)) {
    p = z * I;
    p.z -= uZOffset;
  }

  if(z < 9.0) {
    for(int i = 0; i < 3; i++) {
      r = vec3(0.0);
      r[i] = M;
      O[i] = D(p + r) - D(p - r);
    }
    z = 1.0 + dot(normalize(O), I);
    O = normalize(O);
    r = reflect(I, O);
    vec2 C2 = (p + r * (5.0 - p.y) / abs(r.y)).xz;
    O = z * z * (
      r.y > 0.0
        ? 500.0 * smoothstep(5.0, 4.0, d = sqrt(dot(C2, C2)) + 1.0) * d * B
        : exp(-2.0 * length(C2)) * (B / M - 1.0)
    ) + pow(1.0 + O.y, 5.0) * B;
  }

  o = vec4(sqrt(O + B / G), 1.0);
}

void main() {
  vec4 col;
  mainImage(col, gl_FragCoord.xy);
  gl_FragColor = col;
}
`;

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function ShaderPlane({ onReady }: { onReady?: () => void }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size, viewport } = useThree();
  const [zOffset, setZOffset] = useState(2.0);

  useEffect(() => {
    const value = size.width < 600 ? 3.5 
                : size.width < 1000 ? 3.0 
                : 2.0;
    setZOffset(value);
  }, [size.width]);

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value.set(size.width, size.height);
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uZOffset.value = zOffset;
    }
  }, [zOffset]);

  useEffect(() => {
    if (materialRef.current && onReady) {
      onReady(); 
    }
  }, [onReady]);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(size.width, size.height) },
          uZOffset: { value: zOffset },
        }}
      />
    </mesh>
  );
}

export default function Cuboid({ onReady }: { onReady?: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas orthographic dpr={[1, 2]}>
        <ShaderPlane onReady={onReady} />
      </Canvas>
    </div>
  );
}