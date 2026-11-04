/* 
  ====================================================================
  CONTROL DE ACCESO, CARRUSEL DE DOCENTES, FORMULARIOS Y MENÚ RESPONSIVO - CETIS 12
  ==================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // 1. LÓGICA DEL MENÚ HAMBURGUESA Y SUBMENÚS ("PAPITAS")
    // =================================================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    // 1.1 Conmutar menú principal (Abre/Cierra la hamburguesa y cambia a "X")
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 1.2 Control de submenús anidados ("Papitas") en dispositivos móviles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle, .submenu-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Solo actúa en vista móvil (< 768px)
            if (window.innerWidth < 768) {
                e.preventDefault(); // Evita el salto del enlace '#'
                toggle.classList.toggle('open');
                
                const targetSubmenu = toggle.nextElementSibling;
                if (targetSubmenu) {
                    targetSubmenu.classList.toggle('open');
                }
            }
        });
    });

    // 1.3 Cierre automático del menú al hacer clic en una opción final
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .submenu a:not(.submenu-toggle)');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && navMenu) {
                navMenu.classList.remove('active');
                if (hamburgerBtn) hamburgerBtn.classList.remove('active');

                // Cierra todos los submenús abiertos
                document.querySelectorAll('.submenu, .submenu-lvl2').forEach(sub => sub.classList.remove('open'));
                document.querySelectorAll('.dropdown-toggle, .submenu-toggle').forEach(t => t.classList.remove('open'));
            }
        });
    });


    // =================================================================
    // 2. LÓGICA DEL FORMULARIO DE LOGIN (ALUMNOS)
    // =================================================================
    const formularioLogin = document.getElementById('form-login');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            alert(`¡Acceso concedido!\nBienvenido al sistema escolar, usuario: ${usuario}`);
            formularioLogin.reset();
        });
    }


    // =================================================================
    // 3. LÓGICA DE BOTONES Y ARRASTRE DEL CARRUSEL DE DOCENTES
    // =================================================================
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const teachersTrack = document.getElementById('teachers-track');

    if (btnPrev && btnNext && teachersTrack) {
        
        const getScrollAmount = () => {
            const card = teachersTrack.querySelector('.teacher-card');
            if (!card) return 320;
            return card.offsetWidth + 24;
        };

        btnNext.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        btnPrev.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Arrastre fluido con el mouse
        let isDown = false;
        let startX;
        let scrollLeft;

        teachersTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - teachersTrack.offsetLeft;
            scrollLeft = teachersTrack.scrollLeft;
            teachersTrack.style.scrollBehavior = 'auto';
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            teachersTrack.style.scrollBehavior = 'smooth';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teachersTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            teachersTrack.scrollLeft = scrollLeft - walk;
        });
    }


    // =================================================================
    // 4. LÓGICA PARA EL FORMULARIO DE SOLICITUD DE INFORMES (INDEX HERO)
    // =================================================================
    const formularioHero = document.getElementById('form-hero-informes');

    if (formularioHero) {
        formularioHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreUsuario = document.getElementById('info_nombre').value;
            alert(`¡Gracias por tu interés, ${nombreUsuario}!\nTus datos han sido enviados con éxito. Nos pondremos en contacto contigo pronto desde el CETIS 12.`);
            formularioHero.reset();
        });
    }

});