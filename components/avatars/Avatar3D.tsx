"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Avatar3DProps {
    color: string;
    accentColor: string;
    position?: [number, number, number];
}

export default function Avatar3D({
    color,
    accentColor,
    position = [0, 0, 0]
}: Avatar3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Mesh>(null);

    // Create materials
    const mainMaterial = useMemo(() =>
        new THREE.MeshStandardMaterial({
            color,
            roughness: 0.4,
            metalness: 0.1
        }),
        [color]
    );

    const accentMaterial = useMemo(() =>
        new THREE.MeshStandardMaterial({
            color: accentColor,
            roughness: 0.5,
            metalness: 0.1
        }),
        [accentColor]
    );

    // Idle animation - gentle floating and rotation
    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.1;
            groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
        }

        // Head slight movement
        if (headRef.current) {
            const t = state.clock.getElapsedTime();
            headRef.current.rotation.x = Math.sin(t * 1.2) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Head */}
            <mesh ref={headRef} position={[0, 1.8, 0]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.15, 1.85, 0.4]} castShadow>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.15, 1.85, 0.4]} castShadow>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Body - torso */}
            <mesh position={[0, 0.9, 0]} castShadow>
                <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
                <primitive object={mainMaterial} attach="material" />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.6, 1.0, 0]} rotation={[0, 0, 0.3]} castShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.9, 16]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>
            <mesh position={[0.6, 1.0, 0]} rotation={[0, 0, -0.3]} castShadow>
                <cylinderGeometry args={[0.12, 0.12, 0.9, 16]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>
            <mesh position={[0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>

            {/* Feet */}
            <mesh position={[-0.2, -0.45, 0.1]} castShadow>
                <boxGeometry args={[0.2, 0.1, 0.3]} />
                <meshStandardMaterial color="#2C3E50" />
            </mesh>
            <mesh position={[0.2, -0.45, 0.1]} castShadow>
                <boxGeometry args={[0.2, 0.1, 0.3]} />
                <meshStandardMaterial color="#2C3E50" />
            </mesh>
        </group>
    );
}
