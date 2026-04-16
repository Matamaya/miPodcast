import React, { useEffect } from 'react';
import gsap from 'gsap';
import Home from './pages/Home';
import Produccion from './pages/Production';
import Contacto from './pages/Contacto';

function App() {
  useEffect(() => {
    // Detectar la preferencia del navegador/sistema
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (e) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(999); // Corta las animaciones de GSAP si prefiere reducir movimiento
      } else {
        gsap.globalTimeline.timeScale(1); // Mantiene animaciones si no
      }
    };

    // Comprobamos el estado inicial nada más cargar
    handleMotionChange(motionQuery);

    // Escuchamos por si en el navegador lo cambian on-the-fly
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-6 focus:py-4 focus:rounded-lg focus:font-bold focus:shadow-2xl"
      >
        Saltar al contenido principal
      </a>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex items-center justify-between px-6 py-0 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-500">
              <path d="M4 12V20H8V12H4Z" fill="currentColor" />
              <path d="M10 8V20H14V8H10Z" fill="currentColor" />
              <path d="M16 4V20H20V4H16Z" fill="currentColor" />
            </svg>
          </div>
          <p className="text-xl font-bold tracking-tight">ShockWave</p>
        </div>

        {/* PILL CENTRAL */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 bg-zinc-900/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-800 pointer-events-auto shadow-2xl">
          <ul className="flex gap-8 text-sm font-medium text-zinc-300">
            <li><a href="#home" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2">Home</a></li>
            <li><a href="#reproductor-sec" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2">Contenido</a></li>
            <li><a href="#produccion" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2">Producción</a></li>
            <li><a href="#contacto" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2">Contacto</a></li>
          </ul>
        </nav>

        {/* ESPACIADOR DERECHA (Para equilibrar el flex) */}
        <div className="w-32 hidden md:block"></div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main id="main-content" className="w-full relative pt-32">
        <Home />
        <Produccion />
        <Contacto />
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-400 py-8 text-center mt-20 border-t border-zinc-900">
        <p>© 2024 ShockWave.</p>
        <p className="text-sm mt-2">
          Contenido bajo licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="underline hover:text-white transition-colors" target="_blank" rel="noreferrer">Creative Commons BY-NC-SA 4.0</a>
        </p>
      </footer>
    </div>
  );
}

export default App;