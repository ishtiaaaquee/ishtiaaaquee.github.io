/**
 * App - Main Application Controller
 * Initializes and coordinates all modules
 */
import ParticleSystem from './ParticleSystem.js';
import Navigation from './Navigation.js';
import AnimationController from './AnimationController.js';
import FormHandler from './FormHandler.js';
import ScrollEffects from './ScrollEffects.js';

class PortfolioApp {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        // Initialize all modules when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }
    
    initializeModules() {
        console.log('Initializing Portfolio Application...');
        
        // Initialize Particle System
        this.modules.particleSystem = new ParticleSystem('particles-canvas', 60);
        
        // Initialize Navigation
        this.modules.navigation = new Navigation();
        
        // Initialize Animation Controller
        this.modules.animationController = new AnimationController();
        
        // Initialize Form Handler
        this.modules.formHandler = new FormHandler('contactForm');
        
        // Initialize Scroll Effects
        this.modules.scrollEffects = new ScrollEffects();
        
        console.log('✓ All modules initialized successfully');
        console.log('Professional cybersecurity portfolio loaded with OOP architecture!');
    }
    
    getModule(moduleName) {
        return this.modules[moduleName];
    }
}

// Initialize the application
const app = new PortfolioApp();

// Make app globally accessible for debugging
window.portfolioApp = app;

export default PortfolioApp;
