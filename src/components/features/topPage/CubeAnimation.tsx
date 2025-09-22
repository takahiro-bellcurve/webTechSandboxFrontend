"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Cube {
  mesh: THREE.Mesh;
  rotationSpeed: THREE.Vector3;
  moveSpeed: THREE.Vector3;
  initialPosition: THREE.Vector3;
  amplitude: number;
}

export default function CubeAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const cubes: Cube[] = [];
    const cubeCount = 15;

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.5 + 0.2;
      const geometry = new THREE.BoxGeometry(size, size, size);
      
      const hue = Math.random() * 360;
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${hue}, 30%, 85%)`),
        emissive: new THREE.Color(`hsl(${hue}, 20%, 75%)`),
        emissiveIntensity: 0.1,
        shininess: 100,
        opacity: 0.8,
        transparent: true,
      });

      const cube = new THREE.Mesh(geometry, material);
      
      const initialPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3
      );
      cube.position.copy(initialPosition);

      scene.add(cube);

      cubes.push({
        mesh: cube,
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01
        ),
        moveSpeed: new THREE.Vector3(
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01
        ),
        initialPosition: initialPosition.clone(),
        amplitude: Math.random() * 2 + 1,
      });
    }

    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      cubes.forEach((cube) => {
        cube.mesh.rotation.x += cube.rotationSpeed.x;
        cube.mesh.rotation.y += cube.rotationSpeed.y;
        cube.mesh.rotation.z += cube.rotationSpeed.z;

        cube.mesh.position.x =
          cube.initialPosition.x +
          Math.sin(elapsedTime * cube.moveSpeed.x * 10) * cube.amplitude;
        cube.mesh.position.y =
          cube.initialPosition.y +
          Math.cos(elapsedTime * cube.moveSpeed.y * 10) * cube.amplitude;
        cube.mesh.position.z =
          cube.initialPosition.z +
          Math.sin(elapsedTime * cube.moveSpeed.z * 10) * cube.amplitude * 0.5;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubes.forEach((cube) => {
        cube.mesh.geometry.dispose();
        (cube.mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ touchAction: "none" }}
    />
  );
}