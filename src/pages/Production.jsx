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

                {/* PARTE IZQUIERDA: Mockup en caja visual */}
                <div className="prod-left w-full lg:w-5/12 aspect-[4/5] bg-gradient-to-br from-[#0c515a] via-[#10375a] to-[#04111d] rounded-3xl p-8 relative overflow-hidden flex items-end justify-center shadow-2xl border border-zinc-800/50">

                    {/* Grid decorativo de fondo simulando el blueprint de la imagen */}
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay"></div>

                    {/* Dispositivo Mockup */}
                    <div className="relative z-10 w-3/4 max-w-sm bg-black rounded-t-[2.5rem] border-x-8 border-t-8 border-zinc-900 shadow-2xl h-[90%] overflow-hidden translate-y-2 group">

                        {/* Status bar */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-full z-20"></div>

                        {/* Pantalla interior */}
                        <div className="w-full h-full bg-[#0a1e2f] relative p-4 flex flex-col gap-4">
                            <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center px-4">
                                <div className="w-10 h-10 rounded-full bg-teal-500/30"></div>
                                <div className="ml-4 flex-1">
                                    <div className="h-3 w-3/4 bg-teal-500/30 rounded mb-2"></div>
                                    <div className="h-2 w-1/2 bg-teal-500/20 rounded"></div>
                                </div>
                            </div>

                            <div className="flex-1 w-full rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4">
                                <div className="h-4 w-1/3 bg-zinc-800 rounded mb-6"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-zinc-800 rounded"></div>
                                    <div className="h-2 w-full bg-zinc-800 rounded"></div>
                                    <div className="h-2 w-4/5 bg-zinc-800 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Reflejo animado */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-30 pointer-events-none"></div>
                    </div>
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