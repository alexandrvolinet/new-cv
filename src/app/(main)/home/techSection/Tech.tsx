"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 iResolution = u_resolution;
    float iTime = u_time;

    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y) * 1.5;
    float t = iTime * 0.15;

    float a = 0.0;
    float b = 0.0;
    float c = 1.0;

    for(float i = 0.0; i < 4.0; ++i) {
        a = sin(-b*b - uv.x);
        b = cos(-a*a + c*c - uv.y - cos(t-a*b*c+uv.x));
        c = cos(a - b*b + c - t);
    }

    vec3 col = vec3(a, b, c * 0.8);
    col = sin(col * 1.2 + vec3(0.8, 0.4, 1.2));
    col *= sqrt(abs(col));
    col = cos(sqrt(sqrt(cos(col * 1.56))) * 1.4 - vec3(abs(col.r)*0.3, 0.2, 0.4));

    vec3 blackBase = vec3(0.0, 0.0, 0.0);

    float intensity = (col.r + col.g + col.b) * 0.33;
    intensity = smoothstep(0.6, 0.9, intensity);
    intensity *= 0.6;

    vec3 gradientColor = mix(u_color1, u_color2, col.r * 0.5 + 0.5);
    gradientColor = mix(gradientColor, u_color3, col.g * 0.3 + 0.3);

    col = mix(blackBase, gradientColor * 2.5, intensity * 0.8);

    float wave = sin(uv.x * 3.0 + iTime * 0.8) * sin(uv.y * 2.0 + iTime * 0.6) * 0.5 + 0.5;
    col = mix(col, gradientColor * 3.0, wave * intensity * 0.1);

    gl_FragColor = vec4(col, 1.0);
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

export default function ShaderLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const timeUniformLocation = gl.getUniformLocation(program, "u_time");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const color1UniformLocation = gl.getUniformLocation(program, "u_color1");
    const color2UniformLocation = gl.getUniformLocation(program, "u_color2");
    const color3UniformLocation = gl.getUniformLocation(program, "u_color3");

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

    function resizeCanvas() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(time: number) {
      if (!gl) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUniformLocation, time * 0.001);
      if (canvas) {
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      }

      gl.uniform3f(color1UniformLocation, 0.1, 0.2, 0.6); 
      gl.uniform3f(color2UniformLocation, 0.2, 0.4, 0.8); 
      gl.uniform3f(color3UniformLocation, 0.5, 0.7, 1.0); 

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
