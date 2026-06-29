import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2  uPointer;
uniform float uAspect;
varying vec2  vUv;

// Smooth blend for metaball union
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

// Rotate a point around Y then X axes (slow tumble)
vec3 rotateBlob(vec3 p, float t) {
  float ry = t * 0.12;
  float rx = t * 0.07;
  // Y-rotation
  float cy = cos(ry), sy = sin(ry);
  p = vec3(p.x*cy + p.z*sy, p.y, -p.x*sy + p.z*cy);
  // X-rotation
  float cx = cos(rx), sx = sin(rx);
  p = vec3(p.x, p.y*cx - p.z*sx, p.y*sx + p.z*cx);
  return p;
}

// 7-sphere metaball SDF — knobby organic cluster
float sdfBlob(vec3 p, float t) {
  p = rotateBlob(p, t);

  // Tight blend (k=0.12) keeps lobes distinct instead of merging into an egg
  float d = length(p) - 0.22;                                                   // small core
  d = smin(d, length(p - vec3( 0.38,  0.10,  0.00)) - 0.20, 0.12);            // right
  d = smin(d, length(p - vec3(-0.36,  0.12, -0.05)) - 0.19, 0.12);            // left
  d = smin(d, length(p - vec3( 0.06,  0.42,  0.00)) - 0.18, 0.12);            // top
  d = smin(d, length(p - vec3( 0.08, -0.40,  0.05)) - 0.17, 0.12);            // bottom
  d = smin(d, length(p - vec3( 0.18,  0.18,  0.32)) - 0.16, 0.12);            // front-right
  d = smin(d, length(p - vec3(-0.20,  0.20, -0.30)) - 0.15, 0.12);            // back-left
  return d;
}

// Central-difference normal
vec3 calcNormal(vec3 p, float t) {
  const float e = 0.003;
  return normalize(vec3(
    sdfBlob(p + vec3(e,0,0), t) - sdfBlob(p - vec3(e,0,0), t),
    sdfBlob(p + vec3(0,e,0), t) - sdfBlob(p - vec3(0,e,0), t),
    sdfBlob(p + vec3(0,0,e), t) - sdfBlob(p - vec3(0,0,e), t)
  ));
}

void main() {
  // Aspect-correct centered UV
  vec2 uv = vUv - 0.5;
  uv.x *= uAspect;
  uv -= uPointer * 0.022;   // mouse parallax

  // Orthographic ray — larger divisor = blob appears smaller on screen
  vec3 ro = vec3(uv * 3.2, 3.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);

  // ── Raymarching ─────────────────────────────────────────────────
  float dist = 0.05;
  bool  hit  = false;
  for (int i = 0; i < 64; i++) {
    vec3  p = ro + rd * dist;
    float d = sdfBlob(p, uTime);
    if (d < 0.0012) { hit = true; break; }
    if (dist > 6.0)  break;
    dist += d * 0.88;
  }

  vec4 pixel = vec4(0.0);   // transparent where empty

  if (hit) {
    vec3 p = ro + rd * dist;
    vec3 n = calcNormal(p, uTime);
    vec3 V = -rd;

    // ── Lighting ─────────────────────────────────────────────────
    vec3  L1   = normalize(vec3( 0.55,  1.20,  1.80));
    vec3  L2   = normalize(vec3(-0.70, -0.40,  0.80));
    float d1   = max(dot(n, L1), 0.0);
    float d2   = max(dot(n, L2), 0.0) * 0.20;
    float amb  = 0.05;
    vec3  H    = normalize(L1 + V);
    float spec = pow(max(dot(n, H), 0.0), 100.0) * 0.90;
    float rim  = pow(1.0 - max(dot(n, V), 0.0), 3.5) * 0.10;

    // ── Fine horizontal ridges ────────────────────────────────────
    // World-space Y of hit point (before rotation) — use rotated p from SDF
    float freq  = 90.0;                         // dense ridges like the reference
    float sinY  = sin(p.y * freq);
    float ridge = 0.5 + 0.5 * sinY;

    // Perturb normal along Y for 3-D ridge shadows/highlights
    vec3  rN    = normalize(n + vec3(0.0, cos(p.y * freq) * 0.14, 0.0));
    float rDiff = max(dot(rN, L1), 0.0);

    float brightness = mix(rDiff, d1, 0.20) + d2 + amb + spec * 1.1 + rim;
    brightness *= mix(0.45, 1.0, ridge);        // deeper valley darkening

    pixel = vec4(vec3(clamp(brightness, 0.0, 1.0)), 1.0);
  }

  // ── Red dot scan line (below the blob) ───────────────────────────
  float scanY    = 0.22;
  float halfBand = 0.010;
  float scanDist = abs(vUv.y - scanY);

  if (scanDist < halfBand * 3.5) {
    float cellX  = fract(vUv.x * 88.0) - 0.5;
    float dotR   = length(vec2(cellX, 0.0));
    float dotMsk = 1.0 - smoothstep(0.16, 0.22, dotR);

    float pulse  = 0.5 + 0.5 * sin(vUv.x * 20.0 - uTime * 2.8);
    float glow   = 1.0 - smoothstep(0.0, halfBand, scanDist);
    float intens = dotMsk * glow * (0.50 + 0.50 * pulse);

    vec3  red   = vec3(1.0, 0.04, 0.0);
    float alpha = intens * 0.88;
    pixel = mix(pixel, vec4(red, 1.0), alpha);
  }

  gl_FragColor = pixel;
}
`;

const HeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:    { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uAspect:  { value: 1 },
      },
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      material.uniforms.uAspect.value = w / h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    const raw    = new THREE.Vector2();
    const smooth = new THREE.Vector2();
    const onMove = (e) => {
      raw.set(
        (e.clientX / window.innerWidth)  *  2 - 1,
        (e.clientY / window.innerHeight) * -2 + 1
      );
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      material.uniforms.uTime.value = clock.getElapsedTime();
      smooth.lerp(raw, 0.04);
      material.uniforms.uPointer.value.copy(smooth);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default HeroBackground;
