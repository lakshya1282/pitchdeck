"use client";

import { motion } from 'framer-motion';

const services = [
    {
        id: "01",
        title: "STRATEGY",
        description: "Brand Positioning, UX Research, Technical Architecture",
        details: ["Audit", "Roadmap", "Consulting"]
    },
    {
        id: "02",
        title: "DESIGN",
        description: "UI/UX, Visual Identity, Motion Design",
        details: ["Figma", "Design Systems", "Prototyping"]
    },
    {
        id: "03",
        title: "DEVELOPMENT",
        description: "Next.js, React, WebGL, Creative Coding",
        details: ["Frontend", "Backend", "CMS"]
    },
    {
        id: "04",
        title: "OPTIMIZATION",
        description: "SEO, Performance, Conversion Rate",
        details: ["Speed", "Analytics", "Growth"]
    }
];

export default function Services() {
    return (
        <section id="services" className="section-padding bg-background text-foreground relative">
            <div className="container-width">
                <div className="flex justify-between items-end mb-24 border-b border-secondary/20 pb-4">
                    <h2 className="font-display text-[8vw] leading-none text-foreground">
                        SERVICES
                    </h2>
                </div>

                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <ServiceItem key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ service }: { service: any }) {
    return (
        <div className="group relative border-t border-secondary/20 py-16 transition-all hover:bg-primary/50 cursor-pointer">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 px-2 md:px-8">
                {/* ID & Title */}
                <div className="flex items-baseline gap-8 md:w-1/3">
                    <span className="font-mono text-accent text-sm">({service.id})</span>
                    <h3 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground group-hover:text-accent transition-colors">
                        {service.title}
                    </h3>
                </div>

                {/* Description */}
                <p className="font-mono text-sm md:text-base text-secondary uppercase tracking-wide md:w-1/3">
                    {service.description}
                </p>

                {/* Details (Hidden on mobile, revealed on hover/desktop) */}
                <div className="hidden md:flex gap-4 md:w-1/3 justify-end text-right">
                    {service.details.map((detail: string) => (
                        <span key={detail} className="font-mono text-xs border border-secondary/20 px-2 py-1 text-secondary/50 group-hover:border-accent group-hover:text-accent transition-colors">
                            {detail}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
