/**
 * CertificationAnimations - Dynamic animations for certification cards
 * Features: 3D flip reveal, staggered entrance, parallax float, interactive glow
 */
class CertificationAnimations {
    constructor() {
        this.certCards = document.querySelectorAll('.cert-card');
        this.certSection = document.querySelector('#certifications');
        this.isAnimated = false;
        this.particles = [];
        
        this.init();
    }
    
    init() {
        if (this.certCards.length === 0) return;
        
        this.setupInitialState();
        this.setupScrollTrigger();
        this.setupInteractiveEffects();
        this.setupParallaxFloat();
        this.createFloatingParticles();
    }
    
    setupInitialState() {
        this.certCards.forEach((card, index) => {
            // Set initial state for flip animation
            card.style.transformStyle = 'preserve-3d';
            card.style.backfaceVisibility = 'hidden';
            card.style.opacity = '0';
            card.style.transform = 'perspective(1000px) rotateY(-90deg) translateZ(-100px)';
            
            // Add data attribute for stagger effect
            card.dataset.index = index;
        });
    }
    
    setupScrollTrigger() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.triggerEntranceAnimation();
                    this.isAnimated = true;
                }
            });
        }, observerOptions);
        
        if (this.certSection) {
            observer.observe(this.certSection);
        }
    }
    
    triggerEntranceAnimation() {
        this.certCards.forEach((card, index) => {
            // Staggered flip and fade-in animation
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0)';
                
                // Add bounce effect at the end
                setTimeout(() => {
                    card.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0) scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(0) scale(1)';
                    }, 150);
                }, 800);
                
            }, index * 300); // Stagger delay
        });
    }
    
    setupInteractiveEffects() {
        this.certCards.forEach((card) => {
            // Add glow layer
            const glowLayer = document.createElement('div');
            glowLayer.className = 'cert-glow-layer';
            card.appendChild(glowLayer);
            
            // 3D tilt on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px) 
                    scale(1.05)
                `;
                
                // Move glow layer
                glowLayer.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(255, 0, 0, 0.4),
                        transparent 60%
                    )
                `;
                glowLayer.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
                glowLayer.style.opacity = '0';
            });
            
            // Pulse animation on click
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on link
                if (e.target.closest('.cert-link')) return;
                
                this.createRippleEffect(card, e);
            });
        });
    }
    
    setupParallaxFloat() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateParallax() {
        if (!this.certSection) return;
        
        const sectionRect = this.certSection.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = sectionCenter - viewportCenter;
        
        this.certCards.forEach((card, index) => {
            const offset = (distance * 0.05) * (index % 2 === 0 ? 1 : -1);
            
            // Only apply parallax if not hovering
            if (!card.matches(':hover')) {
                const currentTransform = card.style.transform;
                if (!currentTransform.includes('rotateX')) {
                    card.style.transform = `translateY(${offset}px)`;
                }
            }
        });
    }
    
    createFloatingParticles() {
        if (!this.certSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'cert-particle-container';
        this.certSection.appendChild(particleContainer);
        
        // Create floating geometric shapes
        const shapes = ['circle', 'triangle', 'square', 'hexagon'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = `cert-particle cert-particle-${shapes[Math.floor(Math.random() * shapes.length)]}`;
            
            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = 10 + Math.random() * 20;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    createRippleEffect(card, event) {
        const ripple = document.createElement('div');
        ripple.className = 'cert-ripple';
        
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

export default CertificationAnimations;
