"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "TheWaveCon",
        category: "INDUSTRIAL_COMPANY",
        year: "2025",
        link: "https://thewavecon.com"
    },
    {
        id: "02",
        title: "BrownLand",
        category: "COFFEE_OUTLET",
        year: "2025",
        link: "https://brownlandcoffee.com"
    },
    {
        id: "03",
        title: "WebPros",
        category: "AGENCY",
        year: "2025",
        link: "#"
    },
    {
        id: "04",
        title: "Revamped Sting",
        category: "REDESIGN",
        year: "2026",
        link: "https://elaborate-haupia-dccea1.netlify.app/"
    },
    {
        id: "05",
        title: "CULINARY ARTISTRY",
        category: "RESTAURANT",
        year: "2026",
        link: "https://monumental-sawine-960dd6.netlify.app/"
    }
];

export default function ProjectShowcase() {
    return (
        <section id="work" className="relative bg-background text-foreground section-padding">
            {/* Header */}
            <div className="mb-32 flex flex-col md:flex-row justify-between items-end border-b border-primary/20 pb-8">
                <h2 className="font-display text-[10vw] leading-none uppercase text-foreground">
                    Selected<br />
                    <span className="text-primary text-opacity-50 indent-24 block">Work</span>
                </h2>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {projects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}

function ProjectItem({ project }: { project: any }) {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            initial="initial"
            whileHover="hover"
            className="group relative flex flex-col md:flex-row items-baseline justify-between border-t border-white/20 py-16 transition-colors hover:bg-white/5 px-2 md:px-8 overflow-hidden cursor-pointer"
        >
            <div className="flex items-baseline gap-4 md:gap-12 relative z-10 w-full md:w-auto">
                <h3 className="font-display text-4xl md:text-8xl font-bold uppercase transition-transform duration-500 group-hover:translate-x-4">
                    {project.title}
                </h3>
            </div>

            <div className="flex items-center gap-8 md:gap-32 mt-4 md:mt-0 relative z-10">
                <span className="font-mono text-xs tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                    [{project.category}]
                </span>
                <motion.div
                    variants={{
                        initial: { x: 0, y: 0 },
                        hover: { x: 5, y: -5 }
                    }}
                    className="text-primary"
                >
                    <ArrowUpRight size={24} />
                </motion.div>
            </div>

            {/* Hover Background Noise/Color */}
            <motion.div
                variants={{
                    initial: { height: "0%" },
                    hover: { height: "100%" }
                }}
                transition={{ duration: 0.3, ease: "circIn" }}
                className="absolute bottom-0 left-0 w-full bg-primary/10 -z-0"
            />
        </motion.a>
    );
}
