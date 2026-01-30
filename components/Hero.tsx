"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// --- PARTICLE COMPONENT ---
const Particles = () => {
    // Generate static random positions on mount (to avoid hydration mismatch)
    const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const particleCount = 40; // Increased count for visibility
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 6 + 2, // Larger: 2px to 8px
            duration: Math.random() * 15 + 10, // 10s to 25s
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        boxShadow: `0 0 ${p.size * 5}px 1px rgba(255, 255, 255, 0.9)` // Stronger GLOW
                    }}
                    animate={{
                        y: [0, -150, 0], // Larger movement range
                        x: [0, 80, -80, 0],
                        opacity: [0.1, 0.8, 0.1], // Higher max opacity for visibility
                        scale: [0.5, 1.2, 0.5] // More noticeable pulsing
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
};

export default function Hero() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Mouse Movement for 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth "heavy" feel
    const springConfig = { damping: 50, stiffness: 400 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["20deg", "-20deg"]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-20deg", "20deg"]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    // --- ENTRANCE ANIMATION VARIANTS ---
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 120,
            rotateX: 30,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 1.4,
                ease: "easeOut" as const
            }
        }
    };

    const prosFloatVariants = {
        hidden: {
            opacity: 0,
            z: 300,
            x: 50
        },
        visible: {
            opacity: 1,
            z: 120,
            x: 0,
            transition: {
                duration: 1.6,
                ease: "easeOut" as const,
                delay: 1.0
            }
        }
    };

    return (
        <section
            ref={container}
            className="relative h-screen w-full overflow-hidden bg-black perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* GLOSSY BLACK BACKGROUND */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                {/* 1. Base Black */}
                <div className="absolute inset-0 bg-black" />

                {/* 2. Glossy Highlight (Top Center) - Creates the "Shiny Surface" look */}
                <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)] blur-3xl opacity-60" />

                {/* 3. Deep Vignette (Edges) - Keeps focus on center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_100%)]" />

                {/* MOVING GLOSSY PARTICLES */}
                <Particles />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center section-padding">

                {/* Clean Typography */}
                <div className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center text-center">
                    <motion.h1
                        style={{
                            y: yText,
                            rotateX,
                            rotateY
                        }}
                        className="font-display leading-[0.8] tracking-tighter z-10 flex flex-col items-center justify-center select-none relative [perspective:2000px] [transform-style:preserve-3d]"
                    >
                        {/* LIQUID TEXT ANIMATION: "WEB" - Staggered Letters */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="relative flex justify-center items-center gap-2 md:gap-4 [transform-style:preserve-3d] drop-shadow-2xl"
                        >
                            {['W', 'E', 'B'].map((letter, i) => (
                                <motion.div
                                    key={i}
                                    variants={letterVariants}
                                    className="relative text-[25vw] md:text-[22vw] font-bold tracking-tight leading-none [transform-style:preserve-3d]"
                                >
                                    {/* 3D Extrusion Layers - SILVER/METALLIC (Deepened) */}
                                    <span className="absolute inset-0 text-zinc-500/30" style={{ transform: 'translate(4px, 4px) translateZ(-10px)' }}>{letter}</span>
                                    <span className="absolute inset-0 text-zinc-600/30" style={{ transform: 'translate(8px, 8px) translateZ(-20px)' }}>{letter}</span>
                                    <span className="absolute inset-0 text-zinc-700/30" style={{ transform: 'translate(12px, 12px) translateZ(-30px)' }}>{letter}</span>
                                    <span className="absolute inset-0 text-zinc-800/30" style={{ transform: 'translate(16px, 16px) translateZ(-40px)' }}>{letter}</span>
                                    <span className="absolute inset-0 text-zinc-900/30" style={{ transform: 'translate(20px, 20px) translateZ(-50px)' }}>{letter}</span>

                                    {/* Layer 1: Ghost/Outline (Light) */}
                                    <span
                                        className="text-transparent relative z-10"
                                        style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)' }}
                                    >
                                        {letter}
                                    </span>

                                    {/* Layer 2: Liquid Filling - BRIGHT SILVER GRADIENT */}
                                    <motion.div
                                        className="absolute inset-0 overflow-hidden z-20"
                                        initial={{ clipPath: "circle(0% at 0% 100%)" }}
                                        whileInView={{ clipPath: "circle(150% at 0% 100%)" }}
                                        transition={{ duration: 3, ease: "easeOut", delay: 1 + (i * 0.2) }}
                                        viewport={{ once: true }}
                                    >
                                        {/* HIGH SHINE SILVER: Crisp White to Dark Steel */}
                                        <span className="absolute inset-0 bg-gradient-to-br from-white via-slate-300 to-slate-700 bg-clip-text text-transparent mix-blend-normal">
                                            {letter}
                                        </span>

                                        {/* Noise Overlay */}
                                        <span
                                            className="absolute inset-0 text-transparent bg-clip-text opacity-40 pointer-events-none mix-blend-overlay font-bold tracking-tight leading-none"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                                                backgroundSize: '100px 100px',
                                                WebkitBackgroundClip: 'text'
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    </motion.div>
                                </motion.div>
                            ))}

                            {/* "PROS" - Floating & Chrome */}
                            <motion.span
                                variants={prosFloatVariants}
                                className="absolute -bottom-[2vw] -right-[5vw] z-30 mix-blend-normal drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                            >
                                {/* High-Contrast Chrome Gradient */}
                                <span className="font-serif italic text-[10vw] md:text-[8vw] bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent whitespace-nowrap">
                                    PROS
                                </span>
                            </motion.span>
                        </motion.div>
                    </motion.h1>
                </div>

                {/* Subtext */}
                <div className="mt-12 max-w-2xl text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 1 }}
                    >
                        <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                            Crafting digital experiences with precision and chaos. We build systems that scale.
                        </p>
                        <button className="bg-white text-black hover:bg-zinc-200 hover:text-black font-medium text-sm uppercase tracking-wider py-4 px-10 rounded-full transition-all duration-300">
                            Start Project
                        </button>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
