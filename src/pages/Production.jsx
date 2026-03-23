import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Produccion() {
    const container = useRef();

    useGSAP(() => {
        // Animamos el título principal y la descripción
        gsap.from(".prod-header", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            }
        });

        // Animamos el contenedor de la imagen izquierda
        gsap.from(".prod-left", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        // Animamos las tarjetas en grid, una tras otra
        gsap.from(".prod-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".prod-grid-container", // Trigger específico para la zona derecha
                start: "top 80%",
            }
        });
    }, { scope: container });

    return (
        <section id="produccion" className="w-full max-w-7xl mx-auto py-24 px-6 md:px-8 scroll-mt-24 text-white relative z-10" ref={container}>

            {/* HEADER SUPERIOR: Título (Izq) y Descripción (Der) estilo la imagen de referencia */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16 border-b border-zinc-800 pb-12">
                <div className="w-full lg:w-1/2 prod-header">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                        Detrás de los <br className="hidden md:block" />
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Micrófonos</span>
                    </h2>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-6 lg:gap-12 prod-header mt-2">
                    <p className="text-zinc-400 text-sm md:text-lg leading-relaxed flex-1 font-light">
                        El secreto de un buen podcast no es sólo hablar, es tener un sistema robusto que acompañe desde el minuto cero.
                    </p>
                    <p className="text-zinc-400 text-sm md:text-lg leading-relaxed flex-1 font-light">
                        Descubre en detalle el proceso técnico y creativo que hace posible cada episodio que publicamos en nuestra plataforma.
                    </p>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL: Bento*/}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* PARTE IZQUIERDA: Video background */}
                <div className="prod-left w-full lg:w-5/12 aspect-[4/5] bg-[#04111d] rounded-3xl relative overflow-hidden shadow-2xl border border-zinc-800/50 group">
                    <video 
                        src="../public/cool_bg.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    ></video>
                </div>

                {/* PARTE DERECHA: Tarjetas */}
                <div className="prod-grid-container w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">

                    {/* Tarjeta 1 */}
                    <article className="prod-card bg-[#111111] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-zinc-800/80 hover:bg-[#1a1a1a] hover:border-teal-500/30 transition-colors group h-full flex flex-col">
                        <span className="text-4xl font-light text-teal-500/80 mb-6 md:font-semibold tracking-widest block">01</span>
                        <h3 className="text-xl font-medium text-white mb-4">Grabación</h3>
                        <p className="text-zinc-500 font-light leading-relaxed text-lg flex-1">
                            Utilizamos micrófonos de condensador para capturar la voz con máxima claridad. El guion se prepara previamente asegurando coherencia.
                        </p>
                    </article>

                    {/* Tarjeta 2 */}
                    <article className="prod-card bg-[#111111] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-zinc-800/80 hover:bg-[#1a1a1a] hover:border-teal-500/30 transition-colors group h-full flex flex-col">
                        <span className="text-4xl font-light text-teal-500/80 mb-6 md:font-semibold tracking-widest block">02</span>
                        <h3 className="text-xl font-medium text-white mb-4">Edición (Audacity)</h3>
                        <p className="text-zinc-500 font-light leading-relaxed text-lg flex-1">
                            El audio bruto pasa por Audacity. Aplicamos reducción de ruido y Auto Duck para que la música disminuya suavemente al dialogar.
                        </p>
                    </article>

                    {/* Tarjeta 3 */}
                    <article className="prod-card bg-[#111111] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-zinc-800/80 hover:bg-[#1a1a1a] hover:border-teal-500/30 transition-colors group h-full flex flex-col">
                        <span className="text-4xl font-light text-teal-500/80 mb-6 md:font-semibold tracking-widest block">03</span>
                        <h3 className="text-xl font-medium text-white mb-4">Optimización Web</h3>
                        <p className="text-zinc-500 font-light leading-relaxed text-lg flex-1">
                            Exportamos en MP3 optimizado para asegurar tiempos de carga rápidos. Todo se integra en React y nuestra arquitectura Frontend.
                        </p>
                    </article>

                    {/* Tarjeta 4 (Nueva añadida) */}
                    <article className="prod-card bg-[#111111] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-zinc-800/80 hover:bg-[#1a1a1a] hover:border-teal-500/30 transition-colors group h-full flex flex-col">
                        <span className="text-4xl font-light text-teal-500/80 mb-6 md:font-semibold tracking-widest block">04</span>
                        <h3 className="text-xl font-medium text-white mb-4">Publicación</h3>
                        <p className="text-zinc-500 font-light leading-relaxed text-lg flex-1">
                            Distribuimos el episodio globalmente con sus meta-datos (RSS) generados automáticamente para garantizar la máxima difusión y SEO.
                        </p>
                    </article>

                </div>
            </div>
        </section>
    );
}