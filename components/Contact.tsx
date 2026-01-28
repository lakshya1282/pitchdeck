"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-background text-foreground relative border-t border-secondary/10">
            <div className="container-width flex flex-col md:flex-row gap-12 md:gap-20">
                {/* Left: Info */}
                <div className="md:w-2/5 flex flex-col justify-between min-w-0">
                    <div>
                        <h2 className="font-display text-[12vw] md:text-[5vw] leading-[0.9] uppercase text-foreground mb-8">
                            Start<br />line
                        </h2>
                        <p className="font-body text-secondary/80 mb-8 leading-relaxed text-base md:text-lg">
                            Ready to build something extraordinary? We are currently accepting new projects globally.
                        </p>
                    </div>

                    <div className="font-mono text-lg space-y-2">
                        <a href="mailto:hello@webpros.agency" className="block hover:text-accent transition-colors">hello@webpros.agency</a>
                        <a href="#" className="block hover:text-accent transition-colors">+1 (555) 000-0000</a>
                    </div>
                </div>

                {/* Right: Simple Form */}
                <div className="md:w-3/5">
                    <form className="flex flex-col gap-0 border-t border-secondary/20">
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <input type="text" placeholder="Name" className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground" />
                        </div>
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <input type="email" placeholder="Email" className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground" />
                        </div>
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <textarea placeholder="Tell us about your project" rows={4} className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground resize-none" />
                        </div>

                        <button type="button" className="bg-foreground text-primary font-bold uppercase tracking-widest py-8 hover:bg-accent hover:text-white transition-colors text-xl">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
