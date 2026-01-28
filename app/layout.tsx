import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "WebPros - Digital Excellence",
  description: "A creative studio blending technical expertise with artistic vision.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased font-body bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-black overflow-x-hidden">
        <Providers>
          <SmoothScroll>
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
