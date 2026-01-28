'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 mx-auto max-w-4xl ${scrolled || isOpen ? 'glass-nav rounded-full py-3 px-6 shadow-lg' : 'bg-transparent py-4 px-6'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="font-display text-xl font-bold tracking-tight">
                        WebPros
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['Services', 'About', 'Work', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-secondary hover:text-foreground transition-colors text-sm font-medium tracking-wide"
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-5 py-2 bg-foreground text-primary font-medium rounded-full hover:bg-accent hover:text-white transition-all text-xs uppercase tracking-wider"
                        >
                            Let's Collaborate
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-6 items-center text-center">
                            {['Services', 'About', 'Work', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-foreground text-2xl font-display font-bold uppercase"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
