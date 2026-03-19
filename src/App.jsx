import React from 'react';
import Home from './pages/Home';
import Produccion from './pages/Production';
import Contacto from './pages/Contacto';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex items-center justify-between px-6 py-0 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-500">
              <path d="M4 12V20H8V12H4Z" fill="currentColor" />
              <path d="M10 8V20H14V8H10Z" fill="currentColor" />
              <path d="M16 4V20H20V4H16Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">ShockWave</h1>
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
      <main className="w-full relative pt-32">
        <Home />
        <Produccion />
        <Contacto />
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 py-8 text-center mt-20 border-t border-zinc-900">
        <p>© 2024 ShockWave.</p>
        <p className="text-sm mt-2">
          Contenido bajo licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="underline hover:text-white transition-colors" target="_blank" rel="noreferrer">Creative Commons BY-NC-SA 4.0</a>
        </p>
      </footer>
    </div>
  );
}

export default App;