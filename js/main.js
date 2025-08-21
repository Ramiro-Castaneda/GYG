/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
/*function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 1500) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUpButton = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(window.scrollY >= 200) {
        scrollUpButton.classList.add('show-scroll');
    } else {
        scrollUpButton.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        // Seleccionar el enlace de "Nosotros"
        const nosotrosLink = document.querySelector(".nav__menu a[href*='specs']");

        // Resaltar "Nosotros" también cuando estemos en la sección #case
        if (sectionId === 'case' && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            nosotrosLink?.classList.add('active-link');
        } else {
            const navLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        }
    });
}
window.addEventListener('scroll', scrollActive)

/*================ PRODUCT CAROUSEL ==================*/
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carousels de productos
    const carousels = document.querySelectorAll('.products__carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.products__img, .products__carousel-img');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel__arrow--prev');
        const nextBtn = carousel.querySelector('.carousel__arrow--next');
        let currentSlide = 0;
        
        // Función para mostrar una slide específica
        function showSlide(slideIndex) {
            // Remover clase active de todas las imágenes e indicadores
            images.forEach(img => {
                img.classList.remove('active');
            });
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Asegurar que el índice esté en rango
            if (slideIndex < 0) slideIndex = 0;
            if (slideIndex >= images.length) slideIndex = images.length - 1;
            
            // Agregar clase active a la imagen e indicador actual
            if (images[slideIndex]) {
                images[slideIndex].classList.add('active');
            }
            if (indicators[slideIndex]) {
                indicators[slideIndex].classList.add('active');
            }
            
            currentSlide = slideIndex;
            updateArrowStates();
        }
        
        // Función para actualizar el estado de las flechas
        function updateArrowStates() {
            if (prevBtn && nextBtn) {
                prevBtn.classList.toggle('carousel__arrow--disabled', currentSlide === 0);
                nextBtn.classList.toggle('carousel__arrow--disabled', currentSlide === images.length - 1);
            }
        }
        
        // Función para ir a la siguiente slide
        function nextSlide() {
            if (currentSlide < images.length - 1) {
                showSlide(currentSlide + 1);
            }
        }
        
        // Función para ir a la slide anterior
        function prevSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            }
        }
        
        // Event listeners para las flechas
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                nextSlide();
            });
        }
        
        // Event listeners para los indicadores (opcional)
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                showSlide(index);
            });
        });
        
        // Manejar eventos de hover para resetear a la primera imagen
        const card = carousel.closest('.products__card');
        if (card) {
            card.addEventListener('mouseleave', () => {
                // Volver a la primera imagen cuando se quita el hover
                showSlide(0);
            });
        }
        
        // Inicializar el carousel
        showSlide(0);
    });
});

/*================ PRODUCT CARDS INTERACTION ==================*/
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const productCards = document.querySelectorAll('.products__card');

if (isTouchDevice) {
    // Configuración para pantallas táctiles
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Primero quitamos la clase active de todas las otras cards
            productCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    const otherDescription = otherCard.querySelector('.products__description');
                    otherDescription?.classList.remove('active');
                }
            });
            
            // Luego alternamos el estado de la card clickeada
            const description = card.querySelector('.products__description');
            card.classList.toggle('active');
            description?.classList.toggle('active');
        });
    });
} else {
    // Para dispositivos no táctiles, el hover ya funciona con CSS
    // Pero también agregamos funcionalidad de click para mayor compatibilidad
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Alternamos la clase active al hacer clic
            card.classList.toggle('active');
            const description = card.querySelector('.products__description');
            description?.classList.toggle('active');
        });
    });
}




/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false
})

sr.reveal(`.home__header, .section__title, .home__img`,{delay: 600})
sr.reveal(`.home__footer, .button--flex`,{delay: 700})

// Configuración especial para el carousel de sponsors
sr.reveal(`.sponsor__carousel`,{
    origin: 'bottom',
    distance: '30px',
    duration: 1500,
    delay: 200,
    afterReveal: function(domEl) {
        // Iniciar la animación del carousel después de que aparezca
        const track = domEl.querySelector('.sponsor__track');
        if (track) {
            track.style.animationPlayState = 'running';
        }
    }
})

sr.reveal(`.products__category, .products__card, .footer__logo, .footer__content, .footer__copy`,{origin: 'top', interval: 100})
sr.reveal(`.specs__content, .discount__animate`,{origin: 'left', interval: 100})
sr.reveal(`.specs__img, .discount__img`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)