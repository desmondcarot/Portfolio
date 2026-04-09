const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(category);
});

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


let ticking = false;
const hero = document.querySelector('.hero-content');

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2026', currentYear);
}

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

console.log('%c✨ Desmond Ong Khai Yang - Portfolio', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
console.log('%cSoftware Engineer | ASP.NET & Python Developer', 'color: #8b5cf6; font-size: 14px;');

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiMode() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: bounceIn 0.6s ease;
    `;
    message.innerHTML = '<i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><br>Easter Egg Found!<br><small style="font-size: 0.8rem; font-weight: normal;">Thanks for exploring</small>';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        opacity: 1;
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
    `;
    document.body.appendChild(confetti);
    
    let pos = -10;
    let drift = Math.random() * 200 - 100;
    const fallSpeed = Math.random() * 3 + 2;
    
    const fall = setInterval(() => {
        pos += fallSpeed;
        confetti.style.top = pos + 'px';
        confetti.style.left = `calc(${confetti.style.left} + ${drift / 100}px)`;
        confetti.style.opacity = 1 - (pos / window.innerHeight);
        
        if (pos > window.innerHeight) {
            clearInterval(fall);
            confetti.remove();
        }
    }, 20);
}

let logoClickCount = 0;
const navLogo = document.querySelector('.nav-logo');

navLogo.addEventListener('click', (e) => {
    e.preventDefault();
    logoClickCount++;
    
    if (logoClickCount === 1) {
        navLogo.style.animation = 'shake 0.5s ease';
        setTimeout(() => navLogo.style.animation = '', 500);
    }
    
    if (logoClickCount === 3) {
        const messages = [
            '<i class="fas fa-info-circle"></i> Portfolio by Desmond Ong',
            '<i class="fas fa-code"></i> Built with HTML, CSS, JavaScript',
            '<i class="fas fa-palette"></i> Custom Design',
            '<i class="fas fa-check"></i> Thanks for visiting',
            '<i class="fas fa-star"></i> Achievement: Explorer'
        ];
        
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: #3b82f6;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 600;
            animation: bounceIn 0.5s ease;
        `;
        bubble.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            bubble.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => bubble.remove(), 500);
        }, 2000);
        logoClickCount = 0;
    }
});

const statusMessages = [
    '<i class="fas fa-map-marker-alt icon-pulse"></i> Based in Petaling Jaya, Kuala Lumpur',
    '<i class="fas fa-code icon-pulse"></i> Backend Development',
    '<i class="fas fa-server icon-pulse"></i> API Design & Integration',
    '<i class="fas fa-robot icon-pulse"></i> AI/ML Solutions',
    '<i class="fas fa-database icon-pulse"></i> Database Architecture',
    '<i class="fas fa-cloud icon-pulse"></i> Cloud Deployment'
];

setInterval(() => {
    const funFact = document.querySelector('.hero-fun-fact');
    if (funFact && Math.random() > 0.7) {
        const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
        funFact.style.opacity = '0';
        setTimeout(() => {
            funFact.innerHTML = randomMessage;
            funFact.style.opacity = '1';
        }, 300);
    }
}, 10000);

const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
