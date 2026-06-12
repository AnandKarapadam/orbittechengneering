// src/components/OrbitBackground.jsx
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "../styles/orbitbackground.css";

function FloatingParticles() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      state.pointer.x,
      0.035
    );

    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      state.pointer.y,
      0.035
    );

    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x = mouse.current.y * 0.08;
    pointsRef.current.rotation.z = mouse.current.x * 0.05;

    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.004;

      if (positions[i + 1] < -6) {
        positions[i + 1] = 6;
        positions[i] = (Math.random() - 0.5) * 18;
        positions[i + 2] = (Math.random() - 0.5) * 10;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#9fe7ff"
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

export default function OrbitBackground() {
  return (
    <div className="orbit-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <FloatingParticles />
      </Canvas>
    </div>
  );
}