/**
 * ScrollEffects - Handles scroll-based animations and effects
 * Skill bar animations, section reveals, parallax effects
 */
class ScrollEffects {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress, .language-progress');
        this.skillsAnimated = false;
        
        this.init();
    }
    
    init() {
        this.setupSkillBarAnimation();
        window.addEventListener('load', () => this.animateSkillBars());
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    setupSkillBarAnimation() {
        this.skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.dataset.targetWidth = targetWidth;
            bar.style.width = '0';
        });
    }
    
    animateSkillBars() {
        this.skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition && bar.style.width === '0px') {
                const targetWidth = bar.dataset.targetWidth;
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }
        });
    }
    
    handleScroll() {
        if (!this.skillsAnimated) {
            this.animateSkillBars();
            
            // Check if all skills are visible
            const allVisible = Array.from(this.skillBars).every(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                return barPosition < screenPosition;
            });
            
            if (allVisible) {
                this.skillsAnimated = true;
            }
        }
    }
}

export default ScrollEffects;
