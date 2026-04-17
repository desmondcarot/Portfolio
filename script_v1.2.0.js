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
    bottom: 35px;
    right: 35px;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: linear-gradient(135deg, #5AB3C6, #4A90E2);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: 0 8px 20px rgba(90, 179, 198, 0.3);
    font-size: 1.2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
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
    this.style.transform = 'translateY(-8px) rotate(-5deg) scale(1.05)';
    this.style.boxShadow = '0 12px 30px rgba(90, 179, 198, 0.45)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotate(0) scale(1)';
    this.style.boxShadow = '0 8px 20px rgba(90, 179, 198, 0.3)';
});

console.log('%c✨ Desmond Ong Khai Yang - Portfolio', 'color: #5AB3C6; font-size: 20px; font-weight: bold;');
console.log('%cSoftware Engineer | ASP.NET & Python Developer', 'color: #FF9F4A; font-size: 14px; font-weight: 600;');
console.log('%c🍬 Designed with 90s Apple vibes + modern minimalism', 'color: #A4D65E; font-size: 12px;');

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
    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #FF6B9D; font-size: 24px; font-weight: bold;');
    
    // Add rainbow candy effect to all sections
    const body = document.body;
    body.style.animation = 'candyRainbow 3s ease-in-out';
    
    // Create candy rain
    for (let i = 0; i < 50; i++) {
        const candy = document.createElement('div');
        const candyColors = ['#5AB3C6', '#FF9F4A', '#A4D65E', '#FF6B9D', '#9B59B6'];
        const symbols = ['🍬', '🍭', '🎨', '✨', '💫', '🌈'];
        
        candy.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        candy.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: ${Math.random() * 30 + 20}px;
            z-index: 9999;
            pointer-events: none;
            animation: candyFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(candy);
        
        setTimeout(() => candy.remove(), 5000);
    }
    
    // Add CSS animation for candy fall
    const style = document.createElement('style');
    style.textContent = `
        @keyframes candyFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
        @keyframes candyRainbow {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
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
            '<i class="fas fa-palette"></i> 90s Apple + Modern Design',
            '<i class="fas fa-check"></i> Thanks for visiting',
            '<i class="fas fa-star"></i> Achievement: Explorer'
        ];
        
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: fixed;
            top: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(90, 179, 198, 0.95), rgba(74, 144, 226, 0.95));
            backdrop-filter: blur(10px);
            color: white;
            padding: 1.25rem 2rem;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(90, 179, 198, 0.4);
            z-index: 10000;
            font-weight: 600;
            animation: bounceIn 0.5s ease;
        `;
        bubble.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            bubble.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => bubble.remove(), 500);
        }, 2500);
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
