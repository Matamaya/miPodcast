import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ReproductorAudio from '../components/AudioPlayer';
import PromoVideo from '../components/PromoVideo';
import Transcripcion from '../components/Transcription';

gsap.registerPlugin(useGSAP);

export default function Home() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        // Animar los 3 circulos de izquierda a derecha (Scroll lateral simulado como entrada)
        tl.from(".hero-circle", {
            x: "-150%",
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(".main-title", {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "back.out(1.5)"
            }, "-=1")
            .from(".bottom-cards", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            }, "-=0.5");

    }, { scope: container });

    return (
        <section id="home" className="w-full flex justify-center items-center flex-col mt-4 overflow-hidden px-4 md:px-0" ref={container}>

            {/* HERO : 3 Círculos superpuestos */}
            <article className="relative w-full max-w-7xl h-[400px] md:h-[700px] flex items-center justify-center mb-16">

                {/* CIRCULO 1: Izquierda (Naranja + Texto) */}
                <div className="hero-circle absolute left-[-10%] md:left-[8%] w-[250px] h-[250px] md:w-[550px] md:h-[550px] bg-[#ff9900] rounded-full z-10 flex flex-col justify-center px-10 md:px-16 shadow-2xl overflow-hidden">
                    <p className="text-white text-sm md:text-lg font-medium leading-snug -translate-y-[110px]">
                        Todo lo que tus oidos <br />necesitan escuchar
                    </p>
                </div>

                {/* CIRCULO 2: Centro (Imagen gris) */}
                <div className="hero-circle absolute left-[20%] md:left-[30%] w-[250px] h-[250px] md:w-[550px] md:h-[550px] bg-zinc-800 rounded-full z-20 overflow-hidden shadow-2xl border border-zinc-700/50">
                    <img
                        src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=600&auto=format&fit=crop"
                        alt="Podcast Center"
                        className="w-full h-full object-cover grayscale opacity-70 mix-blend-overlay"
                    />
                </div>

                {/* CIRCULO 3: Derecha (Imagen principal) */}
                <div className="hero-circle absolute left-[50%] md:left-[52%] w-[250px] h-[250px] md:w-[550px] md:h-[550px] bg-zinc-900 rounded-full z-10 overflow-hidden shadow-2xl border border-zinc-800">
                    <img
                        src="https://images.unsplash.com/photo-1516280440502-d964619b8823?q=80&w=600&auto=format&fit=crop"
                        alt="Artist"
                        className="w-full h-full object-cover grayscale opacity-90"
                    />
                </div>

                {/* TEXTO GIGANTE EN MEDIO */}
                <h1 className="main-title absolute z-30 text-white text-[3rem] md:text-[8rem] font-bold tracking-tighter uppercase pointer-events-none drop-shadow-2xl">
                    SHOCKWAVE
                </h1>

                {/* Botón flotante estilo imagen inferior derecha */}
                <div className="hero-circle absolute bottom-10 md:bottom-30 right-10 md:right-[17%] z-40">
                    <button className="bg-white text-black rounded-full px-6 py-3 font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                        Learn More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>

            </article>

            {/* RESTO DE SECCIONES */}
            <div className="w-full max-w-7xl">
                <article id="reproductor-sec" className="reproductor mt-12 mb-16 relative z-10 bottom-cards">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">Tenemos tu contenido favorito</h2>
                    <ReproductorAudio />
                </article>

                <article id="transcripcion-sec" className="transcripcion relative z-10 bottom-cards">
                    <Transcripcion />
                </article>

                <article id="promo-sec" className="promocion relative z-10 bottom-cards mt-16">
                    <PromoVideo />
                </article>
            </div>

        </section>
    );
}