"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const recipientEmail = "lakshyaparmar1282@gmail.com";
        const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        // Open user's email client with pre-filled data
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    };

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
                        <a href="mailto:lakshyaparmar1282@gmail.com" className="block hover:text-accent transition-colors">lakshyaparmar1282@gmail.com</a>
                        <a href="tel:+919303795369" className="block hover:text-accent transition-colors">+91 9303795369</a>
                    </div>
                </div>

                {/* Right: Functional Form */}
                <div className="md:w-3/5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-0 border-t border-secondary/20">
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground"
                            />
                        </div>
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground"
                            />
                        </div>
                        <div className="group relative border-b border-secondary/20 hover:bg-primary/50 transition-colors">
                            <textarea
                                placeholder="Tell us about your project"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full bg-transparent py-8 px-4 font-body text-xl outline-none placeholder:text-secondary/50 text-foreground resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-foreground text-primary font-bold uppercase tracking-widest py-8 hover:bg-accent hover:text-white transition-colors text-xl"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

