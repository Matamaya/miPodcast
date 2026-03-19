import React, { useState, useRef } from 'react';

export default function PromoVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayClick = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-16 md:my-32 relative group">

            {/* Contenedor principal del video con aspect ratio 16:9 ajustado */}
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800 transition-all duration-500 hover:border-zinc-700">

                {/* 1. Elemento de Video (Siempre de fondo, se muestra con controles cuando isPlaying es true) */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop"
                    controls={isPlaying}
                    onPause={() => setIsPlaying(false)}
                    aria-label="Vídeo de presentación"
                >
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Tu navegador no soporta el reproductor de vídeo.
                </video>

                {/* Capa de Overlay (Visual cuando NO se está reproduciendo) */}
                {!isPlaying && (
                    <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 lg:p-24 bg-gradient-to-r from-black/80 via-black/50 to-transparent">

                        {/* Izquierda: Textos */}
                        <div className="w-full md:w-1/2 flex flex-col justify-end md:justify-center h-full text-white z-20">
                            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-white/50 uppercase mb-4 md:mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-red-500"></span>
                                Detrás de cámaras
                            </span>

                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-4 md:mb-8 leading-none">
                                Descubre el <br className="hidden md:block" />
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">proyecto</span>
                            </h3>

                            <p className="text-zinc-400 font-light md:text-lg leading-relaxed max-w-md hidden md:block">
                                Grabar "Zombie Internet" fue una experiencia interesante.
                                En este breve clip te cuento por qué elegí este tema y qué puedes esperar de los próximos episodios.
                            </p>
                        </div>

                        {/* Derecha: Botón Play Blanco */}
                        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mt-8 md:mt-0 z-20 relative">
                            {/* Círculo expansivo de animación */}
                            <div className="absolute w-20 h-20 md:w-32 md:h-32 bg-white/20 rounded-full animate-ping pointer-events-none"></div>

                            {/* Botón visual */}
                            <button
                                onClick={handlePlayClick}
                                className="w-20 h-20 md:w-32 md:h-32 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-300 focus:outline-none z-10"
                                aria-label="Reproducir vídeo oculto"
                            >
                                <svg className="w-8 h-8 md:w-12 md:h-12 ml-2 md:ml-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}