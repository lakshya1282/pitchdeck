"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Avatar3D from './Avatar3D';
import Image from 'next/image';
import styles from './AvatarCanvas.module.css';

interface AvatarCanvasProps {
  color: string;
  accentColor: string;
  avatarImage?: string;
}

export default function AvatarCanvas({ color, accentColor, avatarImage }: AvatarCanvasProps) {
  // If avatar image is provided, show it as 2D image with smooth animations
  if (avatarImage) {
    return (
      <div className={styles.avatarWrapper}>
        {/* Animated background gradient */}
        <div
          className={styles.avatarBgGlow}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}60, ${accentColor}30, transparent 70%)`
          }}
        />

        {/* Avatar image with floating animation */}
        <div className={styles.avatarFloatWrapper}>
          <Image
            src={avatarImage}
            alt="Team member avatar"
            width={320}
            height={320}
            className={styles.avatarImage}
            priority
            quality={95}
          />
        </div>
      </div>
    );
  }

  // Otherwise show geometric 3D avatar
  return (
    <div className="w-full h-full">
      <Canvas shadows className="cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.4} color="#ffffff" />
        <Avatar3D color={color} accentColor={accentColor} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
