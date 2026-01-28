"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-3 rounded-full border border-white/10 hover:border-primary/50 transition-colors group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10 text-primary">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <motion.div
                className="absolute inset-0 bg-white/5"
                initial={false}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.2, 0]
                }}
                transition={{ duration: 0.5 }}
                key={theme}
            />
        </button>
    );
}
