
import Hero from './components/sections/Hero';
import Technologies from './components/sections/Technologies';
import Competencias from './components/sections/Competencias';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Technologies />
      <Competencias />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
