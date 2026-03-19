import React, { useState } from 'react';

export default function Transcripcion() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto mt-12 mb-20">
            {/* Título de sección discreto arriba */}
            <h2 className="text-3xl font-bold mb-8 text-white text-center md:text-left">
                Transcripción
            </h2>

            <div className={`w-full flex flex-col md:flex-row gap-6 h-[550px] md:h-[650px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]`}>

                {/* LADO IZQUIERDO: Transcripción (Estilo Lyrics Spotify) */}
                <div
                    className={`relative flex flex-col justify-between bg-[#df1d72] rounded-[2rem] p-8 md:p-12 overflow-hidden transition-all duration-700 shadow-2xl origin-left ${isExpanded ? 'w-full' : 'w-full md:w-1/2'}`}
                >
                    {/* Header (Portada, Titulo, Artista) */}
                    <div className="flex items-center gap-4 z-10 w-full">
                        <img
                            src="../public/portada.jpg"
                            alt="Album Cover"
                            className="w-14 h-14 md:w-16 md:h-16 rounded shadow-lg object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <h3 className="text-black text-lg md:text-2xl font-bold tracking-tight leading-tight">Zombie Internet</h3>
                            <p className="text-black/80 font-medium tracking-wide text-sm md:text-base">Matamaya</p>
                        </div>

                        {/* Botón de Expandir */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors flex-shrink-0"
                            title={isExpanded ? "Reducir" : "Expandir"}
                        >
                            {isExpanded ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Lyrics / Transcripción (Scrollable) */}
                    <div className="flex-1 overflow-y-auto mt-8 pr-4 z-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="flex flex-col gap-6 text-[2rem] md:text-[3.5rem] leading-[1.1] font-bold tracking-tighter text-black">

                            {/* Líneas de transcripción con efecto hover simulando la lectura (karaoke) */}
                            <p className="hover:text-white transition-colors duration-300 cursor-default">
                                You know where to find me
                            </p>
                            <p className="hover:text-white transition-colors duration-300 cursor-default">
                                And I know where to look
                            </p>
                            <p className="hover:text-white transition-colors duration-300 opacity-60 cursor-default">
                                Bienvenidos a un nuevo episodio.
                            </p>
                            <p className="hover:text-white transition-colors duration-300 opacity-40 cursor-default">
                                Hoy vamos a sumergirnos en cómo la geometría de la Bauhaus...
                            </p>
                            <p className="hover:text-white transition-colors duration-300 opacity-30 cursor-default">
                                Sigue viva en cada botón que pulsamos en la web moderna.
                            </p>
                            <p className="hover:text-white transition-colors duration-300 opacity-20 cursor-default">
                                Usar CSS Grid y Tailwind para traer colores primarios y formas limpias.
                            </p>
                            <p className="hover:text-white transition-colors duration-300 opacity-20 cursor-default mb-20 text-xl font-medium tracking-normal">
                                -- Fin de la transcripción --
                            </p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: Espacio para animación 3D */}
                <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hidden md:flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl ${isExpanded ? 'w-0 opacity-0 overflow-hidden px-0 mx-0 border-none' : 'w-1/2 opacity-100'}`}>
                </div>
            </div>
        </div>
    );
}