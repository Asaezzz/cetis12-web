/* 
  ====================================================================
  CONTROL DE ACCESO, CARRUSEL DE DOCENTES Y FORMULARIOS - CBTis 166
  ==================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Formulario de Login (Alumnos)
    const formularioLogin = document.getElementById('form-login');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            alert(`¡Acceso concedido!\nBienvenido al sistema escolar, usuario: ${usuario}`);
            formularioLogin.reset();
        });
    }

    // 2. Lógica de los Botones y Arrastre del Carrusel de Docentes
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const teachersTrack = document.getElementById('teachers-track');

    if (btnPrev && btnNext && teachersTrack) {
        
        // Función para calcular el ancho de desplazamiento al hacer clic en las flechas
        const getScrollAmount = () => {
            const card = teachersTrack.querySelector('.teacher-card');
            if (!card) return 320;
            return card.offsetWidth + 24; // Ancho de la tarjeta + la separación (gap)
        };

        // Evento para el botón derecho (siguiente)
        btnNext.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Evento para el botón izquierdo (anterior)
        btnPrev.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // --- ARRASTRE SUAVE CON EL MOUSE ---
        let isDown = false;
        let startX;
        let scrollLeft;

        teachersTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - teachersTrack.offsetLeft;
            scrollLeft = teachersTrack.scrollLeft;
            teachersTrack.style.scrollBehavior = 'auto'; // Desactiva el smooth temporalmente para respuesta inmediata con el mouse
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            teachersTrack.style.scrollBehavior = 'smooth'; // Restaura el desplazamiento suave
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teachersTrack.offsetLeft;
            const walk = (x - startX) * 1.5; // Velocidad de arrastre proporcional
            teachersTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. Lógica para el Formulario de Solicitud de Informes (Index Hero)
    const formularioHero = document.getElementById('form-hero-informes');

    if (formularioHero) {
        formularioHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreUsuario = document.getElementById('info_nombre').value;
            alert(`¡Gracias por tu interés, ${nombreUsuario}!\nTus datos han sido enviados con éxito. Nos pondremos en contacto contigo pronto desde el CBTis 166.`);
            formularioHero.reset();
        });
    }

});