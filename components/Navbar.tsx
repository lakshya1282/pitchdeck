'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { StaggeredMenu } from '@/components/StaggeredMenu';

const menuItems = [
    { label: 'Home', link: '#', ariaLabel: 'Go to home' },
    { label: 'Services', link: '#services', ariaLabel: 'View our services' },
    { label: 'About', link: '#about', ariaLabel: 'Learn about us' },
    { label: 'Work', link: '#work', ariaLabel: 'See our work' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Get in touch' },
];

const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mouseAtTop, setMouseAtTop] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inFooter, setInFooter] = useState(false);

    // Smart scroll detection + footer detection
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        // Check if near footer (last 400px of page)
        const footerThreshold = documentHeight - viewportHeight - 400;
        setInFooter(currentScrollY > footerThreshold);

        setScrolled(currentScrollY > 20);

        if (currentScrollY < heroHeight * 0.8) {
            setHidden(false);
        } else {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setHidden(false);
            }
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    // Mouse at top of screen
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const threshold = 80;
        if (e.clientY < threshold) {
            setMouseAtTop(true);
            setHidden(false);
        } else if (e.clientY > threshold * 2) {
            setMouseAtTop(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleScroll, handleMouseMove]);

    const shouldShowLogo = !hidden || mouseAtTop || menuOpen;

    // Logo color: white in hero or footer, black when scrolled over light sections
    const logoColor = (!scrolled || inFooter) ? 'text-white' : 'text-black';

    return (
        <>
            {/* Logo - Shows based on scroll behavior, no pill styling */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: shouldShowLogo ? 0 : -100,
                    opacity: shouldShowLogo ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-4 z-[100] py-4 px-6"
            >
                <Link
                    href="/"
                    className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}
                >
                    WebPros
                </Link>
            </motion.header>

            {/* StaggeredMenu - Full Navigation with GSAP animations */}
            <StaggeredMenu
                position="right"
                colors={['#1a1a1a', '#0a0a0a']}
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                logoUrl=""
                menuButtonColor={(!scrolled || inFooter) ? "#ffffff" : "#000000"}
                openMenuButtonColor="#ffffff"
                accentColor="#ac747a"
                changeMenuColorOnOpen={true}
                isFixed={true}
                closeOnClickAway={true}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
            />
        </>
    );
}

