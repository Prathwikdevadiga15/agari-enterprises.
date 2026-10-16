'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated "circuit trace" particle network for the hero background.
 * Nodes drift slowly and connect to nearby nodes with thin lines, evoking
 * a PCB trace / repair-shop circuit board — grounded in the brand's own
 * "trace" and "copper" color tokens. Pauses off-screen and respects
 * prefers-reduced-motion.
 */
export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer, scene, camera, points, lineSegments, animId;
    let running = true;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    async function init() {
      const THREE = await import('three');

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.z = 20;

      const COUNT = window.innerWidth < 768 ? 55 : 110;
      const positions = new Float32Array(COUNT * 3);
      const velocities = [];
      const spread = { x: 22, y: 13, z: 8 };

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread.x * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z * 2;
        velocities.push({
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.004,
        });
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const copper = new THREE.Color('#E8A657');
      const material = new THREE.PointsMaterial({
        size: 0.13,
        color: copper,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      points = new THREE.Points(geometry, material);
      scene.add(points);

      const lineGeometry = new THREE.BufferGeometry();
      const maxLines = COUNT * 6;
      const linePositions = new Float32Array(maxLines * 2 * 3);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('#5FBFA0'),
        transparent: true,
        opacity: 0.16,
      });
      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      const LINK_DIST = 5.4;

      function tick() {
        if (!running) return;
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;
          if (Math.abs(pos[i * 3]) > spread.x) velocities[i].x *= -1;
          if (Math.abs(pos[i * 3 + 1]) > spread.y) velocities[i].y *= -1;
          if (Math.abs(pos[i * 3 + 2]) > spread.z) velocities[i].z *= -1;
        }
        geometry.attributes.position.needsUpdate = true;

        let lineIdx = 0;
        const linePos = lineGeometry.attributes.position.array;
        for (let i = 0; i < COUNT && lineIdx < maxLines; i++) {
          for (let j = i + 1; j < COUNT && lineIdx < maxLines; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < LINK_DIST) {
              linePos[lineIdx * 6] = pos[i * 3];
              linePos[lineIdx * 6 + 1] = pos[i * 3 + 1];
              linePos[lineIdx * 6 + 2] = pos[i * 3 + 2];
              linePos[lineIdx * 6 + 3] = pos[j * 3];
              linePos[lineIdx * 6 + 4] = pos[j * 3 + 1];
              linePos[lineIdx * 6 + 5] = pos[j * 3 + 2];
              lineIdx++;
            }
          }
        }
        lineGeometry.setDrawRange(0, lineIdx * 2);
        lineGeometry.attributes.position.needsUpdate = true;

        scene.rotation.y += 0.0006;

        renderer.render(scene, camera);
        animId = requestAnimationFrame(tick);
      }

      if (prefersReduced) {
        renderer.render(scene, camera);
      } else {
        tick();
      }
    }

    function handleResize() {
      if (!renderer || !camera) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting && !prefersReduced;
        if (running && !animId) init().catch(() => {});
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    init().catch(() => {});
    window.addEventListener('resize', handleResize);

    return () => {
      running = false;
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer?.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* CSS gradient fallback — always visible behind canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(95,191,160,.08) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 30% 70%, rgba(232,166,87,.06) 0%, transparent 50%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}
