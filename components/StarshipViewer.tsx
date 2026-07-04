"use client";

import { useEffect, useRef } from "react";
import type { Mesh } from "three";

/**
 * Kushal's own Blender starship, rendered with a slim three.js scene.
 * The model has no textures, so it uses a normal-driven gradient shader
 * (same trick as the old p5.js `normalMaterial()` site) remapped to the
 * site's indigo → violet → cyan palette.
 *
 * Perf: lazy-imports three, caps devicePixelRatio, and only renders while
 * on-screen and the tab is visible.
 */

const VERT = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal) * 0.5 + 0.5;
    vec3 indigo = vec3(0.231, 0.165, 0.553);
    vec3 violet = vec3(0.655, 0.545, 0.980);
    vec3 cyan   = vec3(0.133, 0.827, 0.933);
    vec3 col = mix(indigo, violet, n.x);
    col = mix(col, cyan, n.y * n.y);
    col += (n.z - 0.5) * 0.12;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function StarshipViewer({ className }: { className?: string }) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      if (disposed || !el.isConnected) return;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(2.4, 1.6, 3.4);

      const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG });
      const group = new THREE.Group();
      scene.add(group);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.6;
      controls.minPolarAngle = Math.PI * 0.25;
      controls.maxPolarAngle = Math.PI * 0.75;

      new GLTFLoader().load("/models/starship.glb", (gltf) => {
        gltf.scene.traverse((o) => {
          if ((o as Mesh).isMesh) (o as Mesh).material = material;
        });
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3()).length();
        const s = 2.6 / size;
        gltf.scene.scale.setScalar(s);
        // scaling happens about the origin, so the center moves to center*s
        gltf.scene.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(s));
        // engines sit at the model's -Y end — tip the whole group so they read
        // clearly in the default framing instead of pointing straight down
        group.rotation.z = Math.PI * 0.55;
        group.add(gltf.scene);
      });

      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(el);

      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        controls.update();
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        controls.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      if (disposed) cleanup();
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={holder}
      className={className}
      style={{ width: "100%", height: "100%", touchAction: "none", cursor: "grab" }}
      aria-label="Original starship 3D model by Kushal Naik — drag to orbit"
      role="img"
    />
  );
}
