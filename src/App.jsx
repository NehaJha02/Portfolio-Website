import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Hometown from './components/Hometown';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Achievements from './components/Achievements';
import Creative from './components/Creative';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Cursor glow effect */}
      <div className="cursor-glow" id="cursor-glow" />

      <Navbar />
      <Hero />
      <About />
      <Hometown />
      <Education />
      <Skills />
      <Projects />
      <Internship />
      <Achievements />
      <Creative />
      <Contact />
    </div>
  );
}

// Cursor glow effect
if (typeof window !== 'undefined') {
  document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('cursor-glow');
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });
}

export default App;
