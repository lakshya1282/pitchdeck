"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
    {
        id: 1,
        name: "Arbab Riffat Shahnawaz",
        role: "Backend Developer & DB Manager",
        image: "/team/arbab.png",
    },
    {
        id: 2,
        name: "Abdul Sheikh Zeeshan",
        role: "Frontend Developer",
        image: "/team/zeeshan.png",
        mobileImage: "/team/mobile/zeeshan.webp",
    },
    {
        id: 3,
        name: "Lakshya Parmar",
        role: "Frontend Developer",
        image: "/team/lakshya.jpeg",
        mobileImage: "/team/mobile/lakshya.jpeg",
    },
    {
        id: 4,
        name: "Ayush Kumar Parghania",
        role: "UI/UX Designer",
        image: "/team/aayush.png",
    },
];

export default function MeetTeam() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const panels = panelsRef.current.filter(Boolean);

        if (!container || !title || panels.length === 0) return;

        const ctx = gsap.context(() => {
            // Initial state for all panels - ensure they are off-screen to the right
            gsap.set(panels, { xPercent: 100 });

            // Initial state for images (for parallax effect)
            // We want them to look like they are 'unveiling' rather than just sliding
            panels.forEach(panel => {
                const img = panel?.querySelector(".team-image");
                if (img) {
                    gsap.set(img, { scale: 1.2, filter: "brightness(0.5)" });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=400%", // Much longer scroll distance to "slow down" the feel
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 1. Hero Title Animation
            tl.to(title, {
                opacity: 0,
                scale: 1.5,
                duration: 0.5, // Faster title fade out
                ease: "power2.inOut",
            });

            // 2. Animate each team member panel
            panels.forEach((panel, index) => {
                const img = panel?.querySelector(".team-image");

                // Slide in panel
                tl.to(
                    panel,
                    {
                        xPercent: 0,
                        duration: 1.5, // Slide takes '1.5 units' of time
                        ease: "power2.inOut", // Smoother in/out
                    }
                );

                // Animate Image (Parallax + Scale + Brightness) in parallel with panel slide
                if (img) {
                    tl.to(img, {
                        scale: 1,
                        filter: "brightness(1)",
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, "<");
                }

                // Text Animation - Trigger it as the panel settles
                const textContent = panel?.querySelector(".member-info");
                if (textContent) {
                    tl.from(
                        textContent,
                        {
                            y: 50,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.out",
                        },
                        "<+0.5" // Start 0.5s into the slide (or near end of slide)
                    );
                }

                // IMPORTANT: Add a SIGNIFICANT pause (hold) after the panel is fully in
                // This forces the user to scroll for a while with the image static before the next one starts
                tl.to({}, { duration: 0.5 });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
            {/* Hero Title */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <h2
                    ref={titleRef}
                    className="text-[12vw] font-black uppercase tracking-tighter text-foreground leading-none text-center select-none"
                >
                    MEET OUR
                    <br />
                    <span className="text-primary">TEAM</span>
                </h2>
            </div>

            {/* Team Panels */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                {teamMembers.map((member, index) => (
                    <div
                        key={member.id}
                        ref={(el) => {
                            panelsRef.current[index] = el;
                        }}
                        className="absolute inset-0 w-full h-full bg-background will-change-transform"
                        style={{ zIndex: index + 1 }}
                    >
                        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                            {/* Background Image - Full Cover */}
                            <div className="team-image-container absolute inset-0 w-full h-full overflow-hidden">
                                {/* Mobile Image - only for members with mobileImage */}
                                {member.mobileImage && (
                                    <Image
                                        src={member.mobileImage}
                                        alt={member.name}
                                        fill
                                        className="team-image object-cover object-center md:hidden"
                                        priority={index === 0}
                                        quality={90}
                                    />
                                )}
                                {/* Desktop Image (or fallback for all screens if no mobileImage) */}
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className={`team-image object-cover object-center ${member.mobileImage ? 'hidden md:block' : ''}`}
                                    priority={index === 0}
                                    quality={90}
                                />
                                {/* Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            </div>

                            {/* Member Info Overlay */}
                            <div className="member-info absolute bottom-20 left-10 md:bottom-32 md:left-20 z-20 text-white max-w-4xl">
                                <h3 className="text-5xl md:text-8xl font-bold uppercase tracking-tight mb-4 drop-shadow-lg">
                                    {member.name}
                                </h3>
                                <p className="text-xl md:text-3xl font-light tracking-widest uppercase text-primary/90">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
