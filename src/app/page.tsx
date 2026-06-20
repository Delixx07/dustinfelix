import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar name={profile.name} />
      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} projects={projects} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>
      <footer className="border-t border-[#4BB8FA]/20 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </footer>
    </>
  );
}
