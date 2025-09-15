"use client";

import { useEffect, useRef, useState } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
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
  
  vec3 p_temp = p * p * p * p; // p^4
  float new_d = pow(dot(p_temp, p_temp), 0.125) - 0.5
      - pow(1.0 + S.x*S.y*S.z, 8.0) / 1e5;
  
  G = min(G, max(abs(length(p) - 0.6), new_d));
  d = new_d;
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

  z = 0.0;
  for(int iter = 0; iter < 100; iter++) {
    if(z >= 9.0 || d <= M) break;
    p = z * I;
    p.z -= uZOffset;
    z += D(p);
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
    
    float dist = sqrt(dot(C2, C2)) + 1.0;
    O = z * z * (
      r.y > 0.0
        ? 500.0 * smoothstep(5.0, 4.0, dist) * dist * B
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

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface CuboidProps {
  onReady?: () => void;
}

export default function Cuboid({ onReady }: CuboidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const zOffsetRef = useRef(0);
  const isReadyCalledRef = useRef(false);
  const animationStartTimeRef = useRef<number | null>(null);
  const [maxZoomOut, setMaxZoomOut] = useState(3.0);

  useEffect(() => {
    const handleResize = () => {
      setMaxZoomOut(window.innerWidth > 992 ? 2.0 : 3.0);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      onReady?.();
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      onReady?.();
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      onReady?.();
      return;
    }

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const timeUniformLocation = gl.getUniformLocation(program, "iTime");
    const resolutionUniformLocation = gl.getUniformLocation(program, "iResolution");
    const zOffsetUniformLocation = gl.getUniformLocation(program, "uZOffset");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const ANIMATION_DURATION = 4000;

    function resizeCanvas() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(time: number) {
      if (!canvas) return;

      if (animationStartTimeRef.current === null) {
        animationStartTimeRef.current = time;
      }

      const elapsedTime = time - animationStartTimeRef.current;
      const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1.0);
      
      const easedProgress = easeInOutCubic(progress);
      
      zOffsetRef.current = easedProgress * maxZoomOut;

      if (!gl) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUniformLocation, time * 0.001);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(zOffsetUniformLocation, zOffsetRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isReadyCalledRef.current) {
        isReadyCalledRef.current = true;
        onReady?.();
      }

      animationRef.current = requestAnimationFrame(render);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onReady, maxZoomOut]); 

  return (
      <canvas ref={canvasRef} className="w-full h-full block" />
  );
}