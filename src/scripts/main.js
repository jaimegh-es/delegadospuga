// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParallax();
    initializeFormHandling();
});

function initializeAnimations() {
    // Hero animations
    gsap.timeline()
        .from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.8')
        .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.hero-scroll', {
            duration: 0.6,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3');

    // Floating shapes animation
    gsap.to('.floating-shape', {
        duration: 8,
        rotation: 360,
        ease: 'none',
        repeat: -1
    });

    // News cards animation
    gsap.from('.news-card', {
        scrollTrigger: {
            trigger: '.news-section',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Feature cards animation
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 80%'
        },
        duration: 1,
        y: 80,
        opacity: 0,
        rotationY: 15,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Stats animation
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%'
        },
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Form animation
    gsap.from('.form-container', {
        scrollTrigger: {
            trigger: '.suggestions-section',
            start: 'top 80%'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        rotationY: -10,
        ease: 'power3.out'
    });

    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.suggestions-section',
            start: 'top 80%'
        },
        duration: 0.8,
        x: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Section titles animation
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        scale: 0.8,
        ease: 'back.out(1.7)'
    });

    // Improvement items animation
    gsap.from('.improvement-item', {
        scrollTrigger: {
            trigger: '.recent-improvements',
            start: 'top 80%'
        },
        duration: 0.6,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

function initializeParallax() {
    // Hero parallax effect
    gsap.to('.floating-shape', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -200,
        opacity: 0.3,
        ease: 'none'
    });

    // Section backgrounds parallax
    gsap.to('.news-section', {
        scrollTrigger: {
            trigger: '.news-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        backgroundPosition: '50% 100px',
        ease: 'none'
    });

    // 3D tilt effect on scroll
    ScrollTrigger.batch('.feature-card, .news-card, .info-card', {
        onEnter: elements => gsap.from(elements, {
            duration: 0.8,
            y: 60,
            opacity: 0,
            rotationY: 15,
            stagger: 0.1,
            ease: 'power2.out'
        }),
        onLeave: elements => gsap.to(elements, {
            duration: 0.3,
            opacity: 0.8,
            ease: 'power2.out'
        }),
        onEnterBack: elements => gsap.to(elements, {
            duration: 0.3,
            opacity: 1,
            ease: 'power2.out'
        })
    });
}

function initializeFormHandling() {
    const form = document.getElementById('suggestionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = form.querySelector('.submit-btn');
            const originalText = button.querySelector('span').textContent;
            
            // Animate button
            gsap.to(button, {
                duration: 0.3,
                scale: 0.95,
                ease: 'power2.out'
            });
            
            button.querySelector('span').textContent = 'Enviando...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.querySelector('span').textContent = '¡Enviado! ✓';
                
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: '#001e60',
                    ease: 'back.out(1.7)'
                });
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    button.querySelector('span').textContent = originalText;
                    button.disabled = false;
                    
                    gsap.to(button, {
                        duration: 0.3,
                        backgroundColor: '',
                        ease: 'power2.out'
                    });
                }, 2000);
            }, 1500);
        });
    }

    // Enhanced form field animations
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: '0 8px 32px rgba(0, 30, 96, 0.2)',
                ease: 'power2.out'
            });
        });

        field.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 0 0 rgba(0, 30, 96, 0)',
                ease: 'power2.out'
            });
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Interactive cursor effect
document.addEventListener('mousemove', function(e) {
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .news-card, .feature-card');
    
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        if (Math.abs(x) < rect.width / 2 && Math.abs(y) < rect.height / 2) {
            gsap.to(element, {
                duration: 0.3,
                rotationY: x * 0.05,
                rotationX: -y * 0.05,
                ease: 'power2.out'
            });
        }
    });
});

// Reset transforms when mouse leaves
document.addEventListener('mouseleave', function() {
    gsap.to('.btn-primary, .btn-secondary, .news-card, .feature-card', {
        duration: 0.5,
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out'
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-container');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        gsap.to(nav, {
            duration: 0.3,
            y: -100,
            ease: 'power2.out'
        });
    } else {
        // Scrolling up
        gsap.to(nav, {
            duration: 0.3,
            y: 0,
            ease: 'power2.out'
        });
    }
    
    lastScrollTop = scrollTop;
});