"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "Next.js", x: -20, y: -20, rotate: 10 },
    { name: "React", x: 20, y: -40, rotate: -5 },
    { name: "Typescript", x: -40, y: 10, rotate: 15 },
    { name: "Tailwind", x: 30, y: 30, rotate: -10 },
    { name: "Framer Motion", x: -10, y: 50, rotate: 5 },
    { name: "UI/UX", x: 50, y: 0, rotate: -15 },
    { name: "SEO", x: 0, y: -60, rotate: 20 },
    { name: "Performance", x: -50, y: -30, rotate: -8 },
];

export default function Skills() {
    return (
        <section className="relative py-32 bg-background flex flex-col items-center justify-center overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center z-10 mb-20"
            >
                <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                    Powering Your Vision
                </h2>
                <p className="font-body text-secondary text-lg">
                    Built with the modern stack for speed and scale.
                </p>
            </motion.div>

            {/* Floating Skills Grid/Orbit */}
            <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center">
                {/* Center Glow */}
                <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />

                {skills.map((skill, i) => (
                    <FloatingSkill key={skill.name} skill={skill} index={i} />
                ))}
            </div>
        </section>
    );
}

function FloatingSkill({ skill, index }: { skill: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="absolute"
            style={{
                left: `calc(50% + ${skill.x}%)`,
                top: `calc(50% + ${skill.y}%)`
            }}
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [skill.rotate, skill.rotate - 5, skill.rotate]
                }}
                transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                className="bg-primary/50 border border-primary/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg cursor-default group hover:border-accent transition-colors"
            >
                <span className="font-display font-medium text-foreground group-hover:text-accent transition-all">
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    )
}
