// src/components/HeroModel.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function HeroModel({ onProgress, onLoaded }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.2, 4);

    const isMobile =
      typeof window !== "undefined" && window.innerWidth <= 768;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: isMobile ? "low-power" : "default",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.25)
    );
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x8fdcff, 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(-4, 1, -3);
    scene.add(rimLight);

    let model = null;
    let frameId = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let lastRenderTime = 0;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const loader = new GLTFLoader();

    loader.load(
      "/model/airports_around_the_world.glb",
      (gltf) => {
        model = gltf.scene;

        model.traverse((child) => {
          if (child.isMesh) {
            child.frustumCulled = true;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = 2.35 / maxAxis;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        scene.add(model);
        if (onProgress) onProgress(100);
        if (onLoaded) onLoaded();
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = (xhr.loaded / xhr.total) * 100;
          if (onProgress) onProgress(percent);
        }
      },
      (error) => {
        console.error("Error loading model:", error);
        if (onProgress) onProgress(100);
        if (onLoaded) onLoaded();
      }
    );

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const stopLoop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const animate = (timestamp) => {
      if (!isVisible || !isTabActive) {
        stopLoop();
        return;
      }

      frameId = requestAnimationFrame(animate);

      const elapsed = timestamp - lastRenderTime;

      if (elapsed > frameInterval) {
        lastRenderTime = timestamp - (elapsed % frameInterval);

        if (model) {
          model.rotation.y += 0.004;
          model.rotation.x = Math.sin(timestamp * 0.0005) * 0.06;
        }

        renderer.render(scene, camera);
      }
    };

    const startLoop = () => {
      if (!frameId && isVisible && isTabActive) {
        lastRenderTime = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };

    // IntersectionObserver to pause loop when scrolled offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", resize);

    resize();
    startLoop();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      stopLoop();

      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();

            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }

      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  return <div ref={canvasRef} className="hero-canvas" />;
}