import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Services from "@/components/Services";
import MeetTeam from "@/components/MeetTeam";
import Hero3D from "@/components/Hero3D";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />

      {/* Sticky Hero Container */}
      <div className="sticky top-0 z-0 h-screen w-full">
        <Hero3D />
        <Hero />
      </div>

      {/* 2. Services (Layer 10 - Relative) - Slides over Hero */}
      <div className="relative z-10 bg-background shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
        <Services />
      </div>

      {/* 3. Sticky About (Layer 0 - Sticky) - Appears after Services, sticks to top */}
      {/* Since it comes after Hero in DOM, it will stack on top of Hero when sticky */}
      <div className="sticky top-0 z-0 h-screen w-full">
        <About />
      </div>

      {/* 4. Rest (Layer 20 - Relative) - Slides over About */}
      <div className="relative z-20 bg-background shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
        <MeetTeam />
        <ProjectShowcase />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
