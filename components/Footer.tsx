"use client";

export default function Footer() {
    return (
        <footer className="relative bg-secondary text-primary py-24 px-4 md:px-16 overflow-hidden border-t border-primary/10">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-24">

                {/* Massive CTA */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-display text-[12vw] leading-[0.8] tracking-tighter uppercase text-primary mix-blend-normal">
                        Let&#39;s Talk
                    </h2>
                    <h2 className="font-display text-[12vw] leading-[0.8] tracking-tighter uppercase text-right opacity-50 hover:opacity-100 transition-opacity duration-500 text-primary">
                        Future
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-sm uppercase tracking-widest border-t border-primary/20 pt-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-accent">Social</span>
                        <a href="#" className="hover:text-accent transition-colors">Twitter / X</a>
                        <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                        <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-accent">Sitemap</span>
                        <a href="#work" className="hover:text-accent transition-colors">Work</a>
                        <a href="#services" className="hover:text-accent transition-colors">Services</a>
                        <a href="#about" className="hover:text-accent transition-colors">About</a>
                    </div>

                    <div className="flex flex-col gap-4 md:col-span-2">
                        <span className="text-accent">Newsletter</span>
                        <form className="flex border-b border-primary/50 pb-2">
                            <input type="email" placeholder="ENTER_EMAIL" className="bg-transparent w-full outline-none placeholder:text-primary/30 text-primary" />
                            <button type="button" className="text-accent hover:text-white transition-colors">→</button>
                        </form>
                    </div>
                </div>

                <div className="flex justify-between font-mono text-xs text-primary/30 pt-12">
                    <span>© 2026 WEBPROS INC.</span>
                    <span>ALL RIGHTS RESERVED.</span>
                </div>
            </div>
        </footer>
    );
}
