// ===== Terminal Typing Animation =====
const commands = [
    { cmd: 'whoami', output: '→ Backend Developer @ Zoho Corporation' },
    { cmd: 'cat skills.txt', output: '→ Java | PostgreSQL | Docker | Linux' },
    { cmd: 'echo $PASSION', output: '→ Building scalable systems that matter' }
];

let cmdIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeCommand() {
    const cmdElement = document.getElementById('typed-command');
    const outputElement = document.getElementById('terminal-output');

    if (!cmdElement) return;

    const current = commands[cmdIndex];

    if (isTyping) {
        if (charIndex < current.cmd.length) {
            cmdElement.textContent += current.cmd[charIndex];
            charIndex++;
            setTimeout(typeCommand, 80 + Math.random() * 40);
        } else {
            isTyping = false;
            setTimeout(() => {
                outputElement.textContent = current.output;
                setTimeout(typeCommand, 2500);
            }, 500);
        }
    } else {
        cmdElement.textContent = '';
        outputElement.textContent = '';
        charIndex = 0;
        cmdIndex = (cmdIndex + 1) % commands.length;
        isTyping = true;
        setTimeout(typeCommand, 300);
    }
}

setTimeout(typeCommand, 1000);

// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// ===== Floating Code Particles =====
const codeSnippets = ['{ }', '< />', '( )', '[ ]', '=>', '++', '==', '!=', '&&', '||', 'fn', '::'];
const particleContainer = document.getElementById('code-particles');

function createParticle() {
    if (!particleContainer) return;

    const particle = document.createElement('div');
    particle.className = 'code-particle';
    particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particleContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 25000);
}

// Create particles periodically
for (let i = 0; i < 8; i++) {
    setTimeout(() => createParticle(), i * 2000);
}
setInterval(createParticle, 3000);

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('stat-years'), 3);
            animateCounter(document.getElementById('stat-tests'), 70);
            animateCounter(document.getElementById('stat-engineers'), 350);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById('nav-menu')?.classList.remove('active');
    });
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Scroll Animations =====
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section, .timeline-item, .skill-category, .code-window').forEach(el => {
    el.classList.add('animate-ready');
    animateObserver.observe(el);
});

// Inject animation styles
const animStyles = document.createElement('style');
animStyles.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .navbar.scrolled {
        background: rgba(10, 10, 15, 0.95);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(animStyles);

// ===== Konami Code Easter Egg =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    document.body.classList.add('matrix-mode');

    // Create matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(drawMatrix, 33);

    // Stop after 5 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.remove();
        document.body.classList.remove('matrix-mode');
    }, 5000);

    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #0F0; font-size: 20px; font-weight: bold;');
}

// ===== Easter Egg Hint =====
let scrollCount = 0;
window.addEventListener('scroll', () => {
    scrollCount++;
    if (scrollCount === 5) {
        const hint = document.getElementById('easter-egg-hint');
        if (hint) {
            hint.classList.add('show');
            setTimeout(() => hint.classList.remove('show'), 4000);
        }
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c📧 Feel free to reach out: shashank@example.com', 'color: #22c55e; font-size: 12px;');
console.log('%c🎮 Psst... try the Konami code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️', 'color: #f97316; font-size: 11px;');
console.log('%c' + `
   _____ _               _                 _    
  / ____| |             | |               | |   
 | (___ | |__   __ _ ___| |__   __ _ _ __ | | __
  \\___ \\| '_ \\ / _\` / __| '_ \\ / _\` | '_ \\| |/ /
  ____) | | | | (_| \\__ \\ | | | (_| | | | |   < 
 |_____/|_| |_|\\__,_|___/_| |_|\\__,_|_| |_|_|\\_\\
`, 'color: #8b5cf6; font-size: 10px;');

// ===== Skill Chip Hover Sound (optional visual feedback) =====
document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
        chip.style.transform = 'scale(1.05) rotate(' + (Math.random() * 4 - 2) + 'deg)';
    });
    chip.addEventListener('mouseleave', () => {
        chip.style.transform = '';
    });
});

console.log('🚀 Portfolio loaded successfully!');
