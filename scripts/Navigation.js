/**
 * Navigation - Handles all navigation-related functionality
 * Mobile menu, active link highlighting, scroll effects
 */
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.sections = document.querySelectorAll('section');
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollEffects();
        this.setupActiveLinks();
    }
    
    setupMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
            });
        });
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollEffects() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
            } else {
                this.navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
            }
        });
    }
    
    setupActiveLinks() {
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

export default Navigation;
