document.addEventListener("DOMContentLoaded", function () {
    // 1. Animación para la sección de habilidades
    const skillsSection = document.getElementById('skills');
    
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // 2. Mostrar/ocultar el menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');

    if (hamburger && menuItems) {
        hamburger.addEventListener('click', () => {
            menuItems.classList.toggle('show');
        });

        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('.menu-items a').forEach(link => {
            link.addEventListener('click', () => {
                menuItems.classList.remove('show');
            });
        });
    }

    // 3. Activar observación de testimonios solo después de pasar "Servicios"
    const servicesSection = document.getElementById('services');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Observador de la sección "Servicios"
    const servicesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando "Servicios" es visible, comienza a observar cada testimonio
                testimonials.forEach(testimonial => {
                    testimonialVisibilityObserver.observe(testimonial);
                });
                observer.unobserve(entry.target); // Deja de observar "Servicios"
            }
        });
    }, {
        threshold: 0.5
    });

    if (servicesSection) {
        servicesObserver.observe(servicesSection); // Observa "Servicios"
    }

    // Observador de visibilidad de cada testimonio
    const testimonialVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Agrega clase 'visible' para activar la animación
                testimonialVisibilityObserver.unobserve(entry.target); // Deja de observar cada testimonio tras animarlo
            }
        });
    }, {
        threshold: 0.3
    });

    // 4. Animar las barras de habilidades cuando sean visibles
    function checkSkillBars() {
        const skills = document.querySelectorAll('.bar');

        skills.forEach(skill => {
            const rect = skill.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

            if (isVisible && !skill.classList.contains('animated')) {
                const skillValue = skill.getAttribute('data-skill');
                skill.style.width = skillValue + '%';
                skill.classList.add('animated');
            }
        });
    }

    window.addEventListener('load', checkSkillBars);
    window.addEventListener('scroll', checkSkillBars);

    // 5. Cerrar el menú (oculta por defecto)
    document.querySelector('.menu').classList.remove('show');
});
