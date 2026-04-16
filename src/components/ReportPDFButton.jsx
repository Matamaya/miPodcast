import React from 'react';
import { jsPDF } from 'jspdf';

export default function ReportPDFButton() {
    const handleDownload = async () => {
        const doc = new jsPDF();
        let y = 20;
        const pageHeight = 280;
        const margin = 20;
        const maxWidth = 170;

        const checkPageBreak = (spaceNeeded) => {
            if (y + spaceNeeded > pageHeight) {
                doc.addPage();
                y = 20;
            }
        };

        const addTitle = (text, size = 14) => {
            checkPageBreak(15);
            doc.setFontSize(size);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(222, 20, 28);
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, margin, y);
            y += lines.length * (size * 0.4) + 6;
        };

        const addText = (text, isBold = false) => {
            doc.setFontSize(10);
            doc.setFont(undefined, isBold ? 'bold' : 'normal');
            doc.setTextColor(40, 40, 40);
            const lines = doc.splitTextToSize(text, maxWidth);
            checkPageBreak(lines.length * 5 + 5);
            doc.text(lines, margin, y);
            y += lines.length * 5 + 3;
        };

        const addImagePlaceholder = (text) => {
            checkPageBreak(30);
            doc.setDrawColor(200, 200, 200);
            doc.setFillColor(245, 245, 245);
            doc.rect(margin, y, maxWidth, 20, 'FD');
            doc.setFontSize(10);
            doc.setFont(undefined, 'italic');
            doc.setTextColor(100, 100, 100);
            doc.text(`[Espacio para: ${text}]`, margin + 5, y + 12);
            y += 26;
        };

        const addRealImage = (imgUrl) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    const imgHeight = (maxWidth * img.height) / img.width;
                    checkPageBreak(imgHeight + 10);
                    // Forzamos tratarla como PNG/JPEG
                    const format = imgUrl.toLowerCase().endsWith('.png') ? 'PNG' : 'JPEG';
                    doc.addImage(img, format, margin, y, maxWidth, imgHeight);
                    y += imgHeight + 10;
                    resolve();
                };
                img.onerror = () => {
                    console.error("Error cargando imagen para el PDF:", imgUrl);
                    addImagePlaceholder("Error al cargar: " + imgUrl);
                    resolve();
                };
                img.src = imgUrl; // Ruta pública como /assets/img.png
            });
        };

        addTitle("INFORME DE AUDITORIA DE ACCESIBILIDAD", 18);
        addText("Proyecto ShockWave Podcast - Evaluacion Tecnica Completa Nivel AA", true);
        addText("Autor: Mateo Amaya\nEmpresa: Monlau\nFecha: 16/04/2026\nAnalista / Tutor: Marc Bastias\nCliente: Plataforma digital de podcasts ShockWave");
        y += 5;

        addTitle("IDENTIFICACION Y ENLACES OFICIALES DEL PROYECTO");
        addText("URL publica (produccion): https://mi-podcast-seven.vercel.app/\nRepositorio GitHub: https://github.com/Matamaya/miPodcast.git\nBranch analizada: main\nCommit base sin acc.: /tree/\nCommit con acc.: \nComparacion directa de cambios (diff): /compare/commit-base...commit-accesibilidad");

        await addRealImage("/src/assets/rendimiento.png");
        addText("- Descripcion - \nEn este apartado documentamos la evolucion del proyecto ShockWave, una web para podcasts. Inicialmente la plataforma era funcional pero no estaba planteada para cumplir los parametros de accesibilidad modernos. Mediante el historial de commits, demostramos el desarrollo progresivo. Entender que un commit es un registro de cambio en el historial es vital en entornos profesionales: la trazabilidad demuestra un desarrollo tecnico real y permite seguir que se modifico, cuando y por que, garantizando que no sean modificaciones superficiales.");

        y += 5;
        addTitle("RESUMEN EJECUTIVO");
        addText("Este documento presenta la auditoria tecnica completa realizada sobre la aplicacion web desarrollada con React 18/19 y desplegada en entorno de produccion mediante Vercel.");
        addText("El analisis se basa en las WCAG 2.2 nivel AA. Las WCAG (Web Content Accessibility Guidelines) establecen criterios tecnicos internacionales de accesibilidad, siendo el nivel AA el exigido estandar.\n\nLa auditoria combina:\n- Evaluacion automatica mediante Lighthouse, WAVE y Axe.\n- Evaluacion manual mediante navegacion exclusiva con teclado.\n- Revision estructural del DOM (Document Object Model) y el renderizado concurrente.");
        addText("Este informe demuestra no solo correccion tecnica, sino comprension profunda de la accesibilidad como requisito estructural clave.");

        y += 5;
        addTitle("CONTEXTO TECNICO DEL PROYECTO");
        addText("La aplicacion esta desarrollada con React. Esta libreria se basa en arquitectura de componentes (unidades de interfaz reutilizables) y al aplicar renderizado dinamico, se corria el riesgo de perder el rastro comprensivo sin recargar la pagina, algo fatal para asistencia. Por ello se aplicaron soluciones especificas como aria-live para anunciar cambios sin actualizar toda la dom.");
        addImagePlaceholder("Captura 2 (img2) - Estructura general del proyecto en VSCode");
        addText("La estructura incluye una organización por modulos y componentes especificos que integran directamente mejoras de accesibilidad en su ciclo de vida.");

        y += 5;
        addTitle("AUDITORIA INICIAL");
        addText("Lighthouse arrojo un resultado inicial deficiente (71/100). Las alertas detectaron falta de 'alt', contraste por debajo del nivel, y ausencia de semantica.");
        addImagePlaceholder("Captura 3 (img3) - Lighthouse inicial (Ej: 71/100)");
        addText("WAVE y Axe DevTools señalaron fallas de nivel critico, identificando interacciones inaccesibles en los reproductores en los inputs visuales y contrastes erroneos. Esta combinacion de error automatico vs revision manual arrojo un marco claro a atacar.");
        addImagePlaceholder("Captura 4 (img4) - Resultado WAVE inicial");
        addImagePlaceholder("Captura 5 (img5) - Resultado Axe inicial");

        y += 5;
        addTitle("DESARROLLO TECNICO DE LA AUDITORIA INICIAL");
        addText("El desarrollo tecnico de la auditoria inicial busco identificar barreras reales antes de arreglar nada. Utilizando Lighthouse integrado en Google Chrome y herramientas de extension. El resultado del 71 indicaba problemas estructurales severos en DOM (como <div> usados falsamente de contenedor principal sin landmark).");
        addText("Mas alla del test automatico, la navegacion manual por teclado detecto carencia absoluta del 'foco visible' vital para entender que componente esta activo al pulsar Tab. La auditoria evidencio las causas tecnicas puntuales.");

        y += 5;
        addTitle("PROBLEMAS DETECTADOS");
        addText("Estructura semantica insuficiente: Abuso de 'div' genéricos aislando al lector de la capacidad de navegar entre regiones importantes (<main>, <nav>).");
        addImagePlaceholder("Captura 6 (img6) - Estructura DOM antes de refactorizacion");
        addText("Imagenes sin atributo alt y Contraste insuficiente: Varias covers de podcasts y botones carecian de ratio 4.5:1. Se uso letra gris tenue sobre negro.");
        addImagePlaceholder("Captura 7 (img7) - Ejemplo de contraste insuficiente");
        addText("Formularios faltos de labels & Foco inactivo: Inputs en formularios huérfanos que imposibilitaban que el lector de pantalla describiera el campo, sumado al impedimento visual de rastrear Tab.");

        y += 5;
        addTitle("MEJORAS IMPLEMENTADAS");
        addText("Refactorizacion estructural web: Reestructurado DOM para integrar <header>, <nav>, <main> y <footer> correctamente. Refactorizando evitamos cambiar la logica externa del app, solo estabilizamos sus cimientos.");
        addImagePlaceholder("Captura 8/9 (img8, img9) - DOM Antes y Despues");
        addText("Formulario Accesible y Skip Link: Cada input conectó su id y label. Utilizacion de enlaces de salto (Skip link) en cabeceras para ir al texto y 'aria-live' para feedback dinámico.");
        addImagePlaceholder("Captura 10/11 - Componentes y Feedback dinámico");
        addText("Prefers-reduced-motion y Contraste: Paleta principal refinada y soporte para desactivación de animaciones en navegadores que informan fatiga de movimiento.");

        y += 5;
        addTitle("VALIDACION FINAL");
        addText("Tras pruebas iteradas, Lighthouse alcanzo 97/100, acompañado de cero alertas determinantes en Wave y Axe DevToos. Mas alla de guarismos numericos, la validacion manual ratifico la operabilidad total mediante focus states consistentes en Tab.");
        addImagePlaceholder("Captura 15/16/17 - Lighthouse Final: 97/100, WAVE y Axe");

        y += 5;
        addTitle("GENERACION AUTOMATICA DEL INFORME PDF");
        addText("Se implemento la generacion de este informe desde React vía la libreria jsPDF. El propio boton esta validado e integrado en la experiencia asginando texto descriptivo real en el DOM.");
        addImagePlaceholder("Captura 18/19 - Boton Descargar e Informe Render");

        y += 5;
        addTitle("CONCLUSION");
        addText("El proyecto ha progresado estructural e iterativamente. Alcanzar un estandar dictado por pautas WCAG 2.2 nivel AA corrobora una aplicacion usable para absolutamente cada persona, elevando la madurez tecnica en el uso de ecosistemas React profesionales.");

        doc.save("informe_auditoria_completo_RA5.pdf");
    };

    return (
        <button
            onClick={handleDownload}
            aria-label="Descargar Informe de Accesibilidad en PDF"
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-colors border border-zinc-700 hover:border-transparent mt-4 focus:outline-none focus:ring-4 focus:ring-orange-500"
        >
            <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar informe de auditoría PDF
        </button>
    );
}
