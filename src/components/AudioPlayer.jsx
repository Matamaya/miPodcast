import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const playlistData = [
    { id: 1, title: "Zombie Internet", src: "/podcast_audio.wav" },
    { id: 2, title: "Mockup Audio 1", src: "/mockup audio 1.mp3" },
    { id: 3, title: "Mockup Audio 2", src: "/mockup audio 2.mp3" },
    { id: 4, title: "Mockup Audio 3", src: "/mockup audio 3.mp3" }
];

export default function ReproductorAudio() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [trackDurations, setTrackDurations] = useState({});

    // Waveform state
    const [waveData, setWaveData] = useState(new Array(64).fill(2));

    const overlayRef = useRef(null);
    const audioRef = useRef(null);
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);

    // Get track durations on mount
    useEffect(() => {
        playlistData.forEach((track, index) => {
            const tempAudio = new Audio(track.src);
            tempAudio.addEventListener('loadedmetadata', () => {
                setTrackDurations(prev => ({ ...prev, [index]: tempAudio.duration }));
            });
        });
    }, []);

    // Handle audio volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle audio play/pause when state changes
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().then(() => {
                    // Initialize AudioContext if not done yet
                    if (!audioCtxRef.current) {
                        const AudioContext = window.AudioContext || window.webkitAudioContext;
                        audioCtxRef.current = new AudioContext();
                        analyserRef.current = audioCtxRef.current.createAnalyser();
                        analyserRef.current.fftSize = 128; // gives 64 frequency bins

                        sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
                        sourceRef.current.connect(analyserRef.current);
                        analyserRef.current.connect(audioCtxRef.current.destination);
                    }

                    if (audioCtxRef.current.state === 'suspended') {
                        audioCtxRef.current.resume();
                    }
                }).catch(e => console.error("Play error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    // Update Waveform data
    useEffect(() => {
        const updateWave = () => {
            if (analyserRef.current && isPlaying) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                const newWaveData = Array.from(dataArray).map(val => Math.max(2, (val / 255) * 32));
                setWaveData(newWaveData);
            } else if (!isPlaying) {
                setWaveData(prev => prev.map(val => Math.max(2, val - 1)));
            }
            animationRef.current = requestAnimationFrame(updateWave);
        };

        animationRef.current = requestAnimationFrame(updateWave);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying]);

    const openPlayer = () => {
        setIsOpen(true);
        setTimeout(() => {
            gsap.fromTo(overlayRef.current,
                { x: "100%" },
                { x: "0%", duration: 0.8, ease: "power4.out" }
            );
        }, 10);
    };

    const closePlayer = () => {
        gsap.to(overlayRef.current, {
            x: "-100%",
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => setIsOpen(false)
        });
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlistData.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlistData.length) % playlistData.length);
        setIsPlaying(true);
    };

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return "0:00";
        const min = Math.floor(timeInSeconds / 60);
        const sec = Math.floor(timeInSeconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const currentTrack = playlistData[currentTrackIndex];

    return (
        <div className="w-full">
            <audio
                ref={audioRef}
                src={currentTrack.src}
                crossOrigin="anonymous"
                onTimeUpdate={() => {
                    const time = audioRef.current?.currentTime || 0;
                    setCurrentTime(time);
                    window.dispatchEvent(new CustomEvent('podcast-time-update', { detail: { time } }));
                }}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onEnded={handleNext}
            />

            {/* ESTADO CERRADO: Bento Grid de Episodios Recientes */}
            <div className="w-full text-white font-sans max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold tracking-wide">Episodios Recientes</h2>
                    <button className="flex items-center gap-3 border border-zinc-600 rounded-full pl-5 pr-1 py-1 text-sm font-medium hover:bg-zinc-800 transition">
                        Ver Todos los Episodios
                        <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                            <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Left Column (3 episodes) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {playlistData.slice(1).map((track, idx) => {
                            const originalIndex = idx + 1; // 1, 2, 3
                            const authors = ["Lauryn Hill", "Dave Grohl", "Billy Joel"];
                            const descs = [
                                "Exploring the art of storytelling and its impact on various mediums, from books to podcasts.",
                                "Delving into the psychology of happiness, discussing happiness-boosting strategies.",
                                "Practical tips and techniques to boost productivity and make the most of your time."
                            ];
                            const waves = [
                                [1, 2, 3, 2, 4, 3, 1, 2, 4, 5, 2, 1, 3, 2, 4, 2],
                                [2, 3, 1, 4, 2, 5, 3, 1, 4, 2, 3, 5, 2, 4, 1, 3],
                                [1, 4, 2, 3, 5, 2, 1, 4, 3, 2, 5, 1, 3, 4, 2, 1]
                            ];
                            return (
                                <div
                                    key={track.id}
                                    onClick={() => { playTrack(originalIndex); openPlayer(); }}
                                    className="bg-[#1c1c1e] rounded-3xl p-6 lg:p-8 cursor-pointer hover:bg-[#252528] transition-colors group relative overflow-hidden flex flex-col"
                                >
                                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-4 text-xs font-semibold text-zinc-300">
                                        <span className="bg-black/80 px-4 py-2 rounded-full">Episode {originalIndex + 1}</span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                                            {authors[idx]}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            {trackDurations[originalIndex] ? formatTime(trackDurations[originalIndex]) : '--:--'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-green-300 transition-colors uppercase">{track.title}</h3>
                                    <p className="text-zinc-500 text-sm mb-8 line-clamp-2 md:pr-10">{descs[idx]}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="flex items-center gap-3 font-semibold text-sm">
                                            <span className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </span>
                                            Listen Now
                                        </span>
                                        <div className="flex gap-[3px] items-center h-10 opacity-20 group-hover:opacity-60 transition-opacity">
                                            {waves[idx].map((v, i) => (
                                                <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${v * 20}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column (1 large episode) */}
                    <div
                        onClick={() => { playTrack(0); openPlayer(); }}
                        className="lg:col-span-5 rounded-3xl cursor-pointer group relative overflow-hidden h-full flex flex-col justify-end min-h-[500px]"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src="../portada.jpg"
                                alt="Episode Cover"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay para legibilidad */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-xs font-semibold">
                            <span className="bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm">Episode 1</span>
                            <span className="flex items-center gap-2 text-zinc-100 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                {trackDurations[0] ? formatTime(trackDurations[0]) : '--:--'}
                            </span>
                        </div>

                        {/* Content Bottom */}
                        <div className="relative z-10 p-6 lg:p-10">
                            <div className="flex items-center gap-2 text-zinc-200 mb-4 text-xs font-semibold">
                                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                                Matamaya
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-green-300 transition-colors leading-tight uppercase">{playlistData[0].title}</h3>
                            <p className="text-zinc-300 text-sm mb-8 line-clamp-2 pr-4">El internet está muerto ¿Hay alguien ahí?</p>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-3 font-semibold text-sm bg-white text-black pl-2 pr-5 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                                    <span className="w-8 h-8 flex items-center justify-center">
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </span>
                                    Listen Now
                                </span>
                                <div className="flex gap-[3px] items-center h-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {[2, 4, 3, 5, 2, 1, 3, 6, 4, 3, 5, 2].map((v, i) => (
                                        <div key={i} className="w-1.5 bg-white rounded-full" style={{ height: `${v * 16}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OVERLAY DEL PLAYER FULL SCREEN */}
            {isOpen && (
                <div ref={overlayRef} className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-[#080808] text-white w-full h-full overflow-hidden shadow-2xl">

                    {/* COLUMNA IZQUIERDA (Cover) */}
                    <div className="relative w-full md:w-[40%] bg-gradient-to-br from-[#101962] via-[#351052] to-[#de141c] h-[40%] md:h-full flex flex-col justify-between p-6 md:p-12 z-20 overflow-hidden">

                        {/* Botón BACK */}
                        <button onClick={closePlayer} className="flex items-center gap-3 text-white/70 hover:text-white transition group w-fit z-10 font-light tracking-widest text-sm md:text-xl">
                            <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-2 transition-transform opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            BACK
                        </button>

                        {/* IMAGEN DEL ARTISTA DE FONDO */}
                        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-overlay opacity-50 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop"
                                alt="Artist"
                                className="w-full h-full object-cover object-left grayscale drop-shadow-2xl translate-x-8"
                            />
                        </div>

                        {/* Textos inferiores capa izquierda */}
                        <div className="relative z-10 flex justify-between items-end w-full">
                            <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] hover:text-white/80 transition-colors uppercase">
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                PLAY ALL
                            </button>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA (Lista y controles) */}
                    <div className="relative w-full md:w-[60%] bg-[#121212] h-[60%] md:h-full flex flex-col p-6 md:p-16 overflow-y-auto">

                        {/* Cabecera */}
                        <div className="text-zinc-500 text-[10px] md:text-[11px] tracking-[0.2em] mb-4 md:mb-8 font-medium uppercase relative z-10">
                            PLAYLIST / <span className="text-[#de141c]">2026</span>
                        </div>

                        {/* Titulo Gigante */}
                        <div className="flex items-start gap-10 mb-8 overflow-hidden w-full relative">
                            <h1 className="text-white text-5xl md:text-6xl leading-none font-light tracking-tight flex items-start gap-4 z-10 whitespace-nowrap">
                                <span className="text-2xl md:text-5xl mt-1 md:mt-2 font-normal">{(currentTrackIndex + 1).toString().padStart(2, '0')}<span className="text-zinc-700/50 mx-1 md:mx-2">-</span></span>
                                {currentTrack.title.toUpperCase()}
                            </h1>
                        </div>

                        <div className="h-[1px] w-full bg-zinc-800/80 mb-6 md:mb-10"></div>

                        {/* Tracklist */}
                        <div className="flex flex-col gap-2 flex-1 pb-32 md:pb-40">
                            {playlistData.map((track, i) => {
                                const isActive = i === currentTrackIndex;
                                return (
                                    <div
                                        key={track.id}
                                        onClick={() => playTrack(i)}
                                        className={`flex items-center justify-between cursor-pointer px-4 py-3 transition-colors ${isActive
                                            ? 'text-white bg-zinc-900/40 rounded-sm -mx-4 backdrop-blur-sm border-l border-[#de141c]'
                                            : 'text-zinc-500 hover:text-white group'
                                            }`}
                                    >
                                        <div className="flex items-center gap-6 relative">
                                            {isActive ? (
                                                <svg className="w-3 h-3 md:w-4 md:h-4 text-[#de141c]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                            ) : (
                                                <svg className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            )}

                                            <span className="text-xs md:text-sm tracking-[0.1em] font-medium flex items-center gap-3">
                                                {i + 1}&nbsp;&nbsp;&nbsp;{track.title.toUpperCase()}
                                                {isActive && <span className="bg-zinc-800 text-zinc-400 text-[9px] w-4 h-4 flex items-center justify-center rounded border border-zinc-700">E</span>}
                                            </span>
                                        </div>
                                        <span className="text-xs tracking-wider">{trackDurations[i] ? formatTime(trackDurations[i]) : '--:--'}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Reproductor Sticky */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-3xl border-t border-zinc-800 p-6 md:p-10 flex flex-col gap-6 md:gap-8 z-30">

                            {/* Fila info y tiempo */}
                            <div className="flex justify-between items-center text-[9px] md:text-[11px] tracking-[0.15em] font-medium">
                                <div className="text-white/80 flex items-center gap-3 uppercase">
                                    {currentTrackIndex + 1}&nbsp;&nbsp;{currentTrack.title}
                                    <span className="bg-zinc-800 text-zinc-400 text-[9px] w-4 h-4 rounded border border-zinc-700 hidden md:flex items-center justify-center">E</span>
                                </div>
                                <div className="text-zinc-500 tracking-widest">
                                    {formatTime(currentTime)} <span className="text-zinc-700 mx-1">/</span> {formatTime(duration)}
                                </div>
                            </div>

                            {/* Controles y waveform */}
                            <div className="flex justify-between items-end gap-6 md:gap-12">

                                {/* Controles Playback */}
                                <div className="flex items-center gap-4 md:gap-6 text-zinc-500 mb-1">
                                    {/* Prev */}
                                    <button onClick={handlePrev} className="hover:text-white transition group"><svg className="w-3 h-3 md:w-4 md:h-4 fill-current group-active:scale-90 transition-transform" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
                                    {/* Play/Pause */}
                                    <button onClick={togglePlay} className="hover:text-[#de141c] transition text-white/90 group active:scale-90">
                                        {isPlaying ?
                                            <svg className="w-5 h-5 md:w-6 md:h-6 fill-current text-[#de141c]" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> :
                                            <svg className="w-5 h-5 md:w-6 md:h-6 fill-current group-hover:text-[#de141c]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        }
                                    </button>
                                    {/* Next */}
                                    <button onClick={handleNext} className="hover:text-white transition group"><svg className="w-3 h-3 md:w-4 md:h-4 fill-current group-active:scale-90 transition-transform" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
                                </div>

                                {/* Waveform roja simulada interactiva */}
                                <div
                                    className="flex-1 flex items-end gap-[1px] md:gap-[2px] h-6 md:h-8 opacity-80 cursor-pointer group relative"
                                    onClick={(e) => {
                                        if (!audioRef.current || !duration) return;
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const clickPosition = (e.clientX - rect.left) / rect.width;
                                        audioRef.current.currentTime = clickPosition * duration;
                                    }}
                                >
                                    {waveData.map((h, i) => {
                                        const isActive = (i / waveData.length) <= (currentTime / (duration || 1));
                                        return (
                                            <div key={i} style={{ height: `${h}px` }} className={`flex-1 rounded-t-[1px] transition-colors duration-75 ${isActive ? 'bg-[#de141c]' : 'bg-zinc-700'}`}></div>
                                        )
                                    })}
                                </div>

                                {/* Control Volumen con Drag Bar */}
                                <div className="flex items-center gap-2 hidden md:flex mb-1">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 fill-current text-zinc-500" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="w-20 h-1 accent-[#de141c] cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}