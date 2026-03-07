// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link on Scroll =====
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

// ===== Navbar Shadow on Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Anchor Links =====
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

// ===== Intersection Observer for Animations =====
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

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(category);
});

// Observe contact cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Hero Title Animation (Removed typing effect to avoid HTML tag issues) =====
// The hero section now uses CSS animation (fadeInUp) for a smooth entrance

// ===== Smooth Parallax Effect for Hero Section =====
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

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2026', currentYear);
}

// ===== Skill Item Hover Effect =====
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== Scroll to Top Button (Optional) =====
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

// ===== Console Message =====
console.log('%c✨ Desmond Ong Khai Yang - Portfolio', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
console.log('%cSoftware Engineer | ASP.NET & Python Developer', 'color: #8b5cf6; font-size: 14px;');

// ===== Easter Egg: Konami Code =====
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
    // Create confetti effect
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    
    // Show message
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

// ===== Fun Click Counter Easter Egg =====
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

// ===== Dynamic Status Messages =====
const statusMessages = [
    '<i class="fas fa-map-marker-alt icon-pulse"></i> Based in Petaling Jaya, Kuala Lumpur',
    '<i class="fas fa-code icon-pulse"></i> Backend Development',
    '<i class="fas fa-server icon-pulse"></i> API Design & Integration',
    '<i class="fas fa-robot icon-pulse"></i> AI/ML Solutions',
    '<i class="fas fa-database icon-pulse"></i> Database Architecture',
    '<i class="fas fa-cloud icon-pulse"></i> Cloud Deployment'
];

// Randomly update fun fact message
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

// Add required CSS animations
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

// ===== Chat Functionality =====
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const baseUrl = 'https://api.dokyhub.com';
let chatId = null;

// Cookie management functions
function setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial bot greeting
    addMessage('Hello! I\'m Desmond\'s portfolio assistant. How can I assist you today?');

    // Check if chat_code exists in cookie
    const existingChatId = getCookie('portfolio_chat_code');
    
    if (existingChatId) {
        // Use existing chat session
        chatId = existingChatId;
        console.log('Resuming chat session:', chatId);
    } else {
        // Create new chat session
        $.ajax({
            type: "POST",
            url: `${baseUrl}/chat/new`,
            dataType: "json",
            success: function (response) {
                chatId = response.chat_code;
                // Store chat_code in cookie (expires in 30 days)
                setCookie('portfolio_chat_code', chatId, 30);
                console.log('New chat session initialized:', chatId);
            },
            error: function (xhr, status, error) {
                console.error('Failed to initialize chat:', error);
                addMessage('Sorry, I\'m having trouble connecting. Please try again later.', false);
            }
        });
    }
});

let isBotResponding = false;

// Function to add a message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = `<i class="fas fa-${isUser ? 'user' : 'robot'}"></i>`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    const p = document.createElement('p');
    
    // Escape HTML to prevent XSS
    let escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    
    // Parse markdown links: [text](url)
    escapedText = escapedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
        const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
        return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    });
    
    // Parse inline code: `code`
    escapedText = escapedText.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Parse bold: **text** or __text__
    escapedText = escapedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    escapedText = escapedText.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Parse italic: *text* or _text_ (but not in URLs or already processed)
    escapedText = escapedText.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
    escapedText = escapedText.replace(/(?<!_)_(?!_)([^_]+)_(?!_)/g, '<em>$1</em>');
    
    // Replace newlines with <br> tags
    const formattedText = escapedText.replace(/\n/g, '<br>');
    
    p.innerHTML = formattedText;
    contentDiv.appendChild(p);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}


function chatDisabled(isDisabled) {
    chatInput.disabled = isDisabled;
    chatSendBtn.disabled = isDisabled;
    isBotResponding = isDisabled;

    if(!isDisabled) {
        chatInput.focus();
    }
}



// Function to send message
function sendMessage() {
    const messageText = chatInput.value.trim();
    
    // Validate message
    if (messageText === '' || isBotResponding) {
        return;
    }
    
    // Check if chat session is initialized
    if (!chatId) {
        addMessage('Please wait, connecting to chat service...', false);
        return;
    }
    
    // Add user message to chat
    addMessage(messageText, true);
    
    // Clear input and disable chat
    chatInput.value = '';
    chatDisabled(true);
    showTypingIndicator();
    
    $.ajax({
        type: "POST",
        url: `${baseUrl}/chat/message`,
        data: JSON.stringify({
            chat_code: chatId,
            message: messageText
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            hideTypingIndicator();
            addMessage(response.response, false);
            chatDisabled(false);
        },
        error: function (xhr, status, error) {
            hideTypingIndicator();
            console.error('Chat error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', false);
            chatDisabled(false);
        }
    });
}

// Event listeners for chat
chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isBotResponding) {
        sendMessage();
    }
});

// Observe chat section
const chatSection = document.querySelector('.chat-section');
if (chatSection) {
    chatSection.style.opacity = '0';
    chatSection.style.transform = 'translateY(20px)';
    chatSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(chatSection);
}

// ===== Floating Chat Button Functionality =====
const floatingChatBtn = document.getElementById('floating-chat-btn');

// Show/hide floating button based on scroll position
window.addEventListener('scroll', () => {
    if (floatingChatBtn) {
        // Hide button when user is already in the chat section
        const chatSectionTop = chatSection?.offsetTop || 0;
        const chatSectionBottom = chatSectionTop + (chatSection?.offsetHeight || 0);
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (window.pageYOffset > 300 && 
            (window.pageYOffset < chatSectionTop - 100 || scrollPosition > chatSectionBottom + 100)) {
            floatingChatBtn.style.opacity = '1';
            floatingChatBtn.style.visibility = 'visible';
            floatingChatBtn.style.pointerEvents = 'auto';
        } else {
            floatingChatBtn.style.opacity = '0';
            floatingChatBtn.style.visibility = 'hidden';
            floatingChatBtn.style.pointerEvents = 'none';
        }
    }
});

// Remove "New!" badge after first click (stored in localStorage)
if (floatingChatBtn) {
    const chatBadge = floatingChatBtn.querySelector('.chat-badge');
    const hasClickedChat = localStorage.getItem('chat_clicked');
    
    // Hide badge if user has clicked before
    if (hasClickedChat && chatBadge) {
        chatBadge.style.display = 'none';
    }
    
    // Remove badge on click
    floatingChatBtn.addEventListener('click', () => {
        if (chatBadge) {
            chatBadge.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                chatBadge.style.display = 'none';
            }, 300);
            localStorage.setItem('chat_clicked', 'true');
        }
    });
    
    // Initial state
    floatingChatBtn.style.opacity = '0';
    floatingChatBtn.style.visibility = 'hidden';
    floatingChatBtn.style.pointerEvents = 'none';
}
