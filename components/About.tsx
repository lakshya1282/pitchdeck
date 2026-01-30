"use client";

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="section-padding relative bg-primary text-foreground overflow-hidden">
            {/* Editorial Layout */}
            <div className="container-width flex flex-col items-start gap-16 relative z-10">
                <div className="w-full border-b border-foreground/20 pb-4 mb-12 flex justify-between items-end">
                    <span className="font-mono text-sm tracking-widest text-secondary">EST. 2024</span>
                </div>

                <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                    {/* Left Column - Huge Statement */}
                    <div className="md:w-1/2">
                        <h2 className="font-display text-[5vw] leading-[0.9] uppercase font-bold tracking-tight text-foreground">
                            We don't just build sites. We build <span className="text-primary bg-foreground px-2">systems</span>.
                        </h2>
                    </div>

                    {/* Right Column - Detail */}
                    <div className="md:w-1/3 flex flex-col gap-8 pt-4">
                        <p className="font-body text-xl leading-relaxed font-medium text-secondary">
                            WebPros is a digital collective focused on radical differentiation. In a sea of templates, we chose chaos, precision, and impact.
                        </p>
                        <p className="font-mono text-sm uppercase text-secondary/60">
                            Our philosophy is simple: Minimize the noise, maximize the signal. Every pixel serves a purpose.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <Stat label="SINCE" value="2024" />
                            <Stat label="TEAM" value="4" />
                            <Stat label="TECH STACKS" value="10+" />
                            <Stat label="COMMITMENT" value="100%" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -z-0 hidden md:block" />
        </section>
    );
}

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col border-l border-foreground/20 pl-4">
            <span className="font-display text-3xl font-bold text-foreground">{value}</span>
            <span className="font-mono text-xs text-secondary/50">{label}</span>
        </div>
    )
}
