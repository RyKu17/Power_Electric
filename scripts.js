/* ================================================
   Red Power Electric - Scripts
   Interactive Functionality
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ================================================
       Navigation Scroll Effect
       ================================================ */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    /* Mobile Menu Toggle */
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    /* ================================================
       Smooth Scroll for Anchor Links
       ================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#home' || href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ================================================
       Contact Form Handling
       ================================================ */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            //收集表单数据
            const data = {
                nombre: formData.get('name'),
                email: formData.get('email'),
                telefono: formData.get('phone'),
                servicio: formData.get('service'),
                mensaje: formData.get('message')
            };
            
            // Simulate form submission
            setTimeout(function() {
                // Show success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <h3>¡Solicitud Enviada!</h3>
                        <p>Gracias por contactarnos. Nos pondremos en contacto con usted dentro de las 24 horas.</p>
                        <button type="button" class="btn btn-primary" onclick="location.reload()">
                            <i class="fas fa-envelope"></i>
                            Enviar Another Message
                        </button>
                    </div>
                `;
                
                // Add success styles
                const successDiv = contactForm.querySelector('.form-success');
                if (successDiv) {
                    successDiv.style.textAlign = 'center';
                    successDiv.style.padding = '40px 20px';
                }
                
                const successIcon = contactForm.querySelector('.success-icon');
                if (successIcon) {
                    successIcon.style.width = '80px';
                    successIcon.style.height = '80px';
                    successIcon.style.display = 'flex';
                    successIcon.style.alignItems = 'center';
                    successIcon.style.justifyContent = 'center';
                    successIcon.style.background = '#4CAF50';
                    successIcon.style.color = 'white';
                    successIcon.style.borderRadius = '50%';
                    successIcon.style.fontSize = '2rem';
                    successIcon.style.margin = '0 auto 20px';
                }
            }, 1500);
        });
    }
    
    /* ================================================
       Scroll Animations (Intersection Observer)
       ================================================ */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate service cards
    document.querySelectorAll('.service-card').forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });
    
    // Animate why cards
    document.querySelectorAll('.why-card').forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 0.15) + 's';
        observer.observe(card);
    });
    
    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
        .service-card.animated,
        .why-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    /* ================================================
       Phone Number Formatting
       ================================================ */
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
                } else {
                    value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
                }
            }
            e.target.value = value;
        });
    });
    
    /* ================================================
       Active Navigation Link on Scroll
       ================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(function(section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    /* ================================================
       Lazy Load Images Placeholder
       ================================================ */
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        images.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    /* ================================================
       Back to Top Button
       ================================================ */
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (floatingBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
        });
        
        floatingBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /* ================================================
       Service Card Hover Effect
       ================================================ */
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1)';
        });
    });
    
    /* ================================================
       Current Year for Footer
       ================================================ */
    const copyrightYear = document.querySelector('.footer-copyright .year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    /* ================================================
       Console Welcome Message
       ================================================ */
    console.log('%c Red Power Electric ', 'background: #E53935; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
    console.log('%c Servicios Eléctricos Profesionales en Florida ', 'color: #757575;');
    console.log('%c Tel: 786-445-3017 ', 'color: #E53935; font-weight: bold;');
    console.log('%c Email: redpowerelectric2@gmail.com ', 'color: #757575;');
    
});

/* ================================================
   Additional Utility Functions
   ================================================ */

// Format phone number for display
function formatPhone(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to element smoothly
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}