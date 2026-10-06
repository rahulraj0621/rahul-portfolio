// =========================================
// SCROLL PROGRESS BAR
// =========================================
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// =========================================
// NAVBAR: Glassmorphism on scroll
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// HAMBURGER MOBILE MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// =========================================
// TYPEWRITER EFFECT (Hero Section)
// =========================================
const phrases = [
    'clear decisions.',
    'real impact.',
    'business intelligence.',
    'powerful dashboards.',
    'ML predictions.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
        typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeWriter, isDeleting ? 60 : 90);
}
typeWriter();

// =========================================
// PARTICLE CANVAS (Hero Background)
// =========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 70;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 90, 73, ${this.alpha})`;
        ctx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(196, 90, 73, ${0.12 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// =========================================
// SCROLL REVEAL (Sections)
// =========================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// =========================================
// ANIMATED SKILL BARS (Trigger on scroll)
// =========================================
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute('data-width');
            entry.target.style.width = targetWidth + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// =========================================
// STATS COUNTER ANIMATION
// =========================================
function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const update = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current >= 1000 ? current.toLocaleString() : current;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// =========================================
// ACTIVE NAV LINK ON SCROLL
// =========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + current) {
            a.style.color = '#c45a49';
        }
    });
});
