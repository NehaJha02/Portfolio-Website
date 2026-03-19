import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Lightbox from './components/Lightbox';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ images: [], index: null });

  const openLightbox = useCallback((images, index) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ images: [], index: null });
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="app">
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Hometown onImageClick={openLightbox} />
          <Education onImageClick={openLightbox} />
          <Skills />
          <Projects />
          <Internship />
          <Achievements />
          <Creative onImageClick={openLightbox} />
          <Contact />

          {lightbox.index !== null && (
            <Lightbox
              images={lightbox.images}
              index={lightbox.index}
              onClose={closeLightbox}
              onPrev={prevImage}
              onNext={nextImage}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
