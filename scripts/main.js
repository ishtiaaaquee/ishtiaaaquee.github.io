// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Interactive Particle Network Animation with Mouse Response
const particlesCanvas = document.getElementById('particles-canvas');
const pCtx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let mouseInCanvas = false;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

particlesCanvas.addEventListener('mouseenter', () => {
    mouseInCanvas = true;
});

particlesCanvas.addEventListener('mouseleave', () => {
    mouseInCanvas = false;
});

class NetworkParticle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
    }
    
    update() {
        // Mouse interaction - particles move away from cursor
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
                // Gradually return to base speed
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
            }
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }
    
    draw() {
        pCtx.fillStyle = '#ff0000';
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fill();
    }
}

const particlesArray = [];
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new NetworkParticle());
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                pCtx.strokeStyle = `rgba(255, 0, 0, ${(1 - distance / 120) * 0.5})`;
                pCtx.lineWidth = 1;
                pCtx.beginPath();
                pCtx.moveTo(particlesArray[i].x, particlesArray[i].y);
                pCtx.lineTo(particlesArray[j].x, particlesArray[j].y);
                pCtx.stroke();
            }
        }
    }
    
    // Draw connection to mouse if in canvas
    if (mouseInCanvas && mouseY < particlesCanvas.height) {
        particlesArray.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                pCtx.strokeStyle = `rgba(255, 0, 0, ${(1 - distance / 100) * 0.8})`;
                pCtx.lineWidth = 2;
                pCtx.beginPath();
                pCtx.moveTo(particle.x, particle.y);
                pCtx.lineTo(mouseX, mouseY);
                pCtx.stroke();
            }
        });
        
        // Draw mouse cursor point
        pCtx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        pCtx.beginPath();
        pCtx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        pCtx.fill();
    }
}

function animateParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Mouse tilt effect on profile image
const profileContainer = document.querySelector('.profile-image-container');
if (profileContainer) {
    profileContainer.addEventListener('mousemove', (e) => {
        const rect = profileContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileContainer.addEventListener('mouseleave', () => {
        profileContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Card tilt effects
const cards = document.querySelectorAll('.education-card, .cert-card, .timeline-content');
cards.forEach(card => {
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

// Resize canvas on window resize
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = '#1a252f';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
    }
});

// Skill bars animation on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
    
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Initial check for skill bars
window.addEventListener('load', animateSkillBars);

// Check on scroll
let skillsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${data.name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add fade-in animation to sections on scroll
const fadeInOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (sectionPosition < screenPosition) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize sections with fade-in styles
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
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

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 500);
}

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
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

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
});

console.log('Professional cybersecurity portfolio loaded with interactive animations!');
