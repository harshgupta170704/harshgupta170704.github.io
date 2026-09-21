/* ========================================
   HARSH GUPTA PORTFOLIO — SCRIPT.JS
   Typing effect, scroll animations, counters
   ======================================== */

// === Typing Effect ===
const typedElement = document.getElementById('typedText');
const phrases = [
    'Data Engineer',
    'ML Engineer',
    'Deep Learning Researcher',
    'AI Agent Builder',
    'Hardware + Software Engineer',
    'Competitive Programmer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// === Mobile Menu Toggle ===
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Scroll Reveal Animation ===
function revealOnScroll() {
    const elements = document.querySelectorAll(
        '.project-card, .skill-category, .achievement-card, .timeline-item, .about-grid, .contact-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);

// === Counter Animation ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetStr = entry.target.getAttribute('data-count');
                const target = parseFloat(targetStr);
                const isFloat = targetStr.includes('.');
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;

                    if (target >= 1000) {
                        entry.target.textContent = (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'K+';
                    } else if (isFloat) {
                        entry.target.textContent = current.toFixed(1);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target >= 10000) {
                            entry.target.textContent = Math.floor(target / 1000) + 'K+';
                        } else if (target >= 1000) {
                            entry.target.textContent = (target / 1000).toFixed(1) + 'K+';
                        } else if (isFloat) {
                            entry.target.textContent = target.toFixed(1);
                        } else {
                            entry.target.textContent = target;
                        }
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// === Cursor Glow Effect ===
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });
}

// === Active Nav Link Highlight ===
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', updateActiveNav);

// === Hero Slideshow ===
const heroSlideshow = document.getElementById('heroSlideshow');
if (heroSlideshow) {
    const totalImages = 18;
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `assets/memories/${i}.jpg?v=${Date.now()}`;
        if (i === 1) img.classList.add('active');
        heroSlideshow.appendChild(img);
    }

    let currentSlide = 0;
    const slides = heroSlideshow.querySelectorAll('img');
    
    setInterval(() => {
        if(slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000); // 3 seconds per image
}
