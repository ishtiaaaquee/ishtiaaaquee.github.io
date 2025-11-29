/**
 * AnimationController - Manages all visual animations and effects
 * Card tilts, profile image effects, scroll animations
 */
class AnimationController {
    constructor() {
        this.profileContainer = document.querySelector('.profile-image-container');
        this.cards = document.querySelectorAll('.education-card, .cert-card, .timeline-content');
        this.sections = document.querySelectorAll('section');
        
        this.init();
    }
    
    init() {
        this.setupProfileTilt();
        this.setupCardTilts();
        this.setupSectionFadeIn();
        this.setupScrollToTop();
    }
    
    setupProfileTilt() {
        if (!this.profileContainer) return;
        
        this.profileContainer.addEventListener('mousemove', (e) => {
            const rect = this.profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        this.profileContainer.addEventListener('mouseleave', () => {
            this.profileContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    setupCardTilts() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    setupSectionFadeIn() {
        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        const fadeInOnScroll = () => {
            this.sections.forEach(section => {
                const sectionPosition = section.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (sectionPosition < screenPosition) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        };
        
        window.addEventListener('scroll', fadeInOnScroll);
        window.addEventListener('load', fadeInOnScroll);
    }
    
    setupScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ff0000;
            color: #000000;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 999;
            font-size: 1.2rem;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            scrollBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'scale(1.1)';
            scrollBtn.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'scale(1)';
            scrollBtn.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        });
    }
}

export default AnimationController;
