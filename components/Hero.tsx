"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={container} className="relative h-screen w-full overflow-hidden bg-background">
            {/* Minimal Background */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 opacity-100">
                {/* Subtle Gradient - Professional feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center section-padding">

                {/* Clean Typography */}
                <div className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center text-center">
                    <motion.h1
                        style={{ y: yText }}
                        className="font-display leading-[0.8] tracking-tighter z-10 flex flex-col items-center justify-center pointer-events-none select-none relative"
                    >
                        {/* Architectural Anchor - Massive "WEB" */}
                        <span className="text-[25vw] md:text-[22vw] font-bold text-foreground opacity-10 tracking-tight leading-none mix-blend-multiply">
                            WEB
                        </span>

                        {/* Structural Lock - Overlapping "PROS" */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-normal">
                            <span className="font-serif italic text-[12vw] md:text-[10vw] text-accent z-20 whitespace-nowrap">
                                PROS
                            </span>
                        </span>
                    </motion.h1>
                </div>

                {/* Subtext - Centered and Professional */}
                <div className="mt-12 max-w-2xl text-center mx-auto">
                    <p className="font-body text-lg text-secondary mb-8 leading-relaxed">
                        Crafting digital experiences with precision and chaos. We build systems that scale.
                    </p>
                    <button className="bg-foreground text-primary hover:bg-accent hover:text-white font-medium text-sm uppercase tracking-wider py-4 px-10 rounded-full transition-all duration-300">
                        Start Project
                    </button>
                </div>
            </div>
        </section>
    );
}

