import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Services from "@/components/Services";
import MeetTeam from "@/components/MeetTeam";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <MeetTeam />
      <ProjectShowcase />
      <Contact />
      <Footer />
    </main>
  );
}
