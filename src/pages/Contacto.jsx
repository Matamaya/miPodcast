import React from 'react';

export default function Contacto() {
    return (
        <section id="contacto" className="w-full max-w-7xl mx-auto py-24 px-6 md:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
                
                {/* LADO IZQUIERDO: Formulario Verde */}
                <div className="w-full lg:w-2/3 bg-[#3fec65] rounded-[2rem] p-8 md:p-12 lg:p-16 text-black flex flex-col justify-between shadow-2xl">
                    <div className="mb-12 md:mb-20">
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-light mb-2">
                            ¿Tienes más cosas que contarnos?
                        </h2>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium">
                            Hablemos
                        </h2>
                    </div>

                    <form className="flex flex-col gap-8 md:gap-12 w-full">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
                            {/* Nombre */}
                            <div className="flex-1">
                                <label htmlFor="nombre" className="block text-sm md:text-base font-medium mb-3">Tu Nombre*</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    required
                                    className="w-full bg-transparent border-b border-black/30 pb-3 text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                                    placeholder="Escribe tu nombre"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex-1">
                                <label htmlFor="email" className="block text-sm md:text-base font-medium mb-3">Tu email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-black/30 pb-3 text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                                    placeholder="Escribe tu correo"
                                />
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="w-full">
                            <label htmlFor="mensaje" className="block text-sm md:text-base font-medium mb-3">Tu mensaje o sugerencia*</label>
                            <input
                                type="text"
                                id="mensaje"
                                name="mensaje"
                                required
                                className="w-full bg-transparent border-b border-black/30 pb-3 text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                                placeholder="Me encantaría que hablaran sobre..."
                            />
                        </div>

                        {/* Fila del Botón */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-4">
                            <button
                                type="submit"
                                className="group flex items-center justify-between gap-4 border border-black rounded-full py-2 pl-6 pr-2 hover:bg-black hover:text-[#3fec65] transition-colors focus:outline-none"
                            >
                                <span className="font-semibold text-sm tracking-wide">ENVIAR</span>
                                <span className="bg-black group-hover:bg-[#3fec65] group-hover:text-black text-[#3fec65] rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </span>
                            </button>
                            <p className="text-black/60 text-xs max-w-xs leading-relaxed">
                                Al hacer clic en enviar, aceptas nuestra <br className="hidden md:block"/>
                                <a href="#" className="font-semibold text-black underline decoration-black/40 hover:decoration-black transition-colors">Política de Privacidad</a>
                            </p>
                        </div>
                    </form>
                </div>

                {/* LADO DERECHO: Tarjetas oscuras */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6">
                    
                    {/* Tarjeta 1: Audio Upload (Requisito de la práctica) */}
                    <div className="flex-1 min-h-[250px] bg-[#090b0f] border border-zinc-800 rounded-[2rem] p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors group relative overflow-hidden">
                        <div className="z-10 flex flex-col items-center justify-center h-full gap-4 text-white hover:text-[#3fec65] transition-colors cursor-pointer"
                             tabIndex="0" 
                             onClick={() => document.getElementById('audio-upload').click()}
                             onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('audio-upload').click() }}>
                            
                            <input
                                type="file"
                                id="audio-upload"
                                accept="audio/mp3, audio/wav"
                                className="sr-only" 
                            />
                            
                            {/* Icono de Micrófono */}
                            <svg className="w-10 h-10 opacity-90 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                            <span className="font-bold tracking-widest text-sm text-center">ENVIAR AUDIO</span>
                        </div>
                        
                        <div className="z-10 flex items-center justify-between mt-auto">
                             <div className="flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                                <span className="text-sm font-medium">Adjuntar archivo</span>
                            </div>
                        </div>
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none rounded-full"></div>
                    </div>

                    {/* Tarjeta 2: Redes Sociales / Telegram (De la imagen referencial) */}
                    <a href="#" className="flex-1 min-h-[250px] bg-[#090b0f] border border-zinc-800 rounded-[2rem] p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors group relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-white hover:text-[#0088cc] transition-colors relative z-10">
                            {/* Icono Telegram SVG simulado */}
                            <svg className="w-10 h-10 opacity-90 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.32.023.467.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.01-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            <span className="font-bold tracking-widest text-sm">TELEGRAM</span>
                        </div>
                        
                        <div className="z-10 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                                <span className="text-sm font-medium">Join chat</span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none rounded-full"></div>
                    </a>

                </div>

            </div>
        </section>
    );
}