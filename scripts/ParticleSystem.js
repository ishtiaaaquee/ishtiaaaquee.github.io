/**
 * ParticleSystem - Object-Oriented Particle Network Animation
 * Handles particle creation, movement, and mouse interaction
 */
class NetworkParticle {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
    }
    
    update(mouseX, mouseY, mouseInCanvas) {
        if (mouseInCanvas) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                this.speedX = this.baseSpeedX + (dx / distance) * force * 2;
                this.speedY = this.baseSpeedY + (dy / distance) * force * 2;
            } else {
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
            }
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor(canvasId, particleCount = 60) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${canvasId}" not found`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particleCount = particleCount;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseInCanvas = false;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new NetworkParticle(this.canvas.width, this.canvas.height));
        }
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.canvas.addEventListener('mouseenter', () => {
            this.mouseInCanvas = true;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouseInCanvas = false;
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - distance / 120) * 0.5})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        if (this.mouseInCanvas && this.mouseY < this.canvas.height) {
            this.particles.forEach(particle => {
                const dx = particle.x - this.mouseX;
                const dy = particle.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - distance / 100) * 0.8})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouseX, this.mouseY);
                    this.ctx.stroke();
                }
            });
            
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.mouseX, this.mouseY, this.mouseInCanvas);
            particle.draw(this.ctx);
        });
        
        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }
}

export default ParticleSystem;
