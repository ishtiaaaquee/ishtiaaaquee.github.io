// Modern Portfolio JavaScript
// Clean, efficient, smooth interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== NAVIGATION =====
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Scroll spy for navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        // Update active nav link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach((fill, index) => {
                        setTimeout(() => {
                            fill.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                // Animate stat numbers
                if (entry.target.classList.contains('stat')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    animateNumber(statNumber);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-category, .cert-card, .about-card, .edu-card, .timeline-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== ANIMATE NUMBERS =====
    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, duration / steps);
    }
    
    // ===== CERTIFICATE CARD INTERACTIONS =====
    document.querySelectorAll('.cert-card').forEach(card => {
        const img = card.querySelector('.cert-img');
        
        if (img) {
            card.addEventListener('click', () => {
                // Could open modal or lightbox here
                console.log('Certificate clicked');
            });
        }
    });
    
    // ===== PARALLAX EFFECT ON HERO =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // ===== FLOATING BADGES RANDOM ANIMATION =====
    const floatingBadges = document.querySelectorAll('.floating-badge');
    floatingBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.75}s`;
        badge.style.animationDuration = `${3 + (index * 0.5)}s`;
    });
    
    // ===== SMOOTH PAGE LOAD =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 50);
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            const rippleContainer = this.querySelector('.ripple');
            if (rippleContainer) {
                rippleContainer.remove();
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== GRADIENT ORB MOUSE FOLLOW =====
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const orb3 = document.querySelector('.orb-3');
    if (orb3) {
        function animateOrb() {
            const currentX = parseInt(orb3.style.left) || 50;
            const currentY = parseInt(orb3.style.top) || 40;
            const targetX = (mouseX / window.innerWidth) * 100;
            const targetY = (mouseY / window.innerHeight) * 100;
            
            const newX = currentX + (targetX - currentX) * 0.05;
            const newY = currentY + (targetY - currentY) * 0.05;
            
            orb3.style.left = `${newX}%`;
            orb3.style.top = `${newY}%`;
            
            requestAnimationFrame(animateOrb);
        }
        animateOrb();
    }
    
    // ===== COPY EMAIL ON CLICK =====
    document.querySelectorAll('.contact-card a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = link.textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Show feedback
                const originalText = link.textContent;
                link.textContent = 'Copied!';
                link.style.color = 'var(--secondary)';
                
                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            } catch (err) {
                console.log('Failed to copy');
            }
        });
    });
    
    // ===== CONSOLE LOG =====
    console.log('%c🔒 Portfolio Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Modern Cybersecurity Theme Active', 'color: #10b981; font-size: 14px;');
});
