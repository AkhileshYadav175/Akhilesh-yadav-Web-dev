import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Process />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
