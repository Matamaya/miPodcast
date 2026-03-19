## Bienvenido a ShockWave

Este informe resume el proceso de creación del producto digital final, integrando producción multimedia y desarrollo web accesible.

1. Producción Multimedia
    
    •	Podcast: Grabado y editado íntegramente en Audacity. Se aplicó reducción de ruido para limpiar la voz y el efecto Auto Duck para equilibrar la música de fondo con la locución.

    •	Optimización de Audio: El archivo final se exportó en formato MP3 a 192 kbps para garantizar un equilibrio entre calidad y velocidad de carga en la web.

    •	Material Promocional: Se ha integrado un vídeo en formato MP4 (H.264) para asegurar compatibilidad universal. Para cumplir con los requisitos de accesibilidad.


2. Desarrollo Web y Diseño

    •	Tecnologías: La web se ha desarrollado con React, organizando la interfaz en componentes funcionales y reutilizables.

    •	Estilos y Animación: Se utilizó Tailwind CSS v4.0 para el diseño responsivo y GSAP para animaciones de entrada fluidas que mejoran la experiencia de usuario.

    •	Integración: Siguiendo las directrices de la práctica, tanto el audio como el vídeo están incrustados directamente en la interfaz mediante etiquetas nativas de HTML5 controladas por React, evitando enlaces externos.

3. Accesibilidad (WCAG AA)

Se han implementado las siguientes medidas para asegurar el cumplimiento de los estándares de accesibilidad:

    •	Estructura Semántica: Uso de etiquetas <header>, <main>, <section> y <nav>.

    •	Navegación: Toda la interfaz es navegable mediante teclado, con un foco visible claramente definido mediante anillos de contraste.

    •	Contenido Alternativo: Se ha incluido una transcripción completa del podcast dentro de la web y subtítulos en el vídeo promocional.

    •	Verificación: La accesibilidad se ha verificado utilizando las herramientas Lighthouse y WAVE, corrigiendo errores de contraste y etiquetas aria-label en elementos interactivos.
    
4. Licencia y Atribución

El proyecto, incluyendo el audio, las imágenes y el código, se publica bajo una licencia Creative Commons (CC BY-NC-SA 4.0), garantizando el reconocimiento de autoría y permitiendo el uso no comercial.


