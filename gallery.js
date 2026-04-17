// Portfolio mock data
const portfolioItems = [
    {
        id: 1,
        title: 'Urban Exploration',
        description: 'A captivating journey through the city\'s hidden architectural gems and street culture.',
        category: 'video',
        tags: ['Documentary', 'Urban', 'Commercial'],
        thumbnail: 'assets/IMG_4084.MP4',
        type: 'video',
        featured: true
    },
    {
        id: 2,
        title: 'Nature\'s Symphony',
        description: 'Cinematic showcase of wildlife and natural landscapes in their purest form.',
        category: 'video',
        tags: ['Nature', 'Documentary', 'Cinematic'],
        thumbnail: 'assets/IMG_4085.MP4',
        type: 'video',
        featured: true
    },
    {
        id: 3,
        title: 'Product Showcase',
        description: 'High-end commercial video for luxury brand featuring dynamic camera work.',
        category: 'commercial',
        tags: ['Commercial', 'Product', 'Advertising'],
        thumbnail: 'assets/IMG_4086.MP4',
        type: 'video',
        featured: false
    },
    {
        id: 4,
        title: 'Coastal Dreams',
        description: 'Serene footage capturing the essence of coastal life and ocean beauty.',
        category: 'video',
        tags: ['Travel', 'Nature', 'Cinematic'],
        thumbnail: 'assets/IMG_4087.MP4',
        type: 'video',
        featured: true
    },
    {
        id: 5,
        title: 'Creative Portrait Series',
        description: 'Artistic portrait photography exploring light, shadow, and emotion.',
        category: 'photo',
        tags: ['Portrait', 'Studio', 'Editorial'],
        thumbnail: 'assets/IMG_4088.MP4',
        type: 'video',
        featured: false
    },
    {
        id: 6,
        title: 'Food & Lifestyle',
        description: 'Mouthwatering culinary content for restaurant and food brand campaigns.',
        category: 'commercial',
        tags: ['Food', 'Commercial', 'Lifestyle'],
        thumbnail: 'assets/IMG_4089.MP4',
        type: 'video',
        featured: true
    },
    {
        id: 7,
        title: 'Adventure Chronicles',
        description: 'Adrenaline-pumping adventure sports footage from mountain to ocean.',
        category: 'video',
        tags: ['Sports', 'Adventure', 'Action'],
        thumbnail: 'assets/IMG_3940.MOV',
        type: 'video',
        featured: false
    },
    {
        id: 8,
        title: 'Brand Story',
        description: 'Compelling brand narrative showcasing company values and mission.',
        category: 'commercial',
        tags: ['Commercial', 'Corporate', 'Brand'],
        thumbnail: 'assets/IMG_4083.MOV',
        type: 'video',
        featured: true
    }
];

let currentIndex = 0;
let filteredItems = [...portfolioItems];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadGallery();
    setupModalControls();
    setupFilters();
    setupContactForm();
});

// Setup navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Load gallery items
function loadGallery(filter = 'all') {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    filteredItems = filter === 'all' 
        ? [...portfolioItems]
        : portfolioItems.filter(item => item.category === filter || item.tags.some(tag => tag.toLowerCase() === filter));
    
    if (filteredItems.length === 0) {
        gallery.innerHTML = '<div class="empty-gallery">No items found for this filter.</div>';
        return;
    }
    
    filteredItems.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        gallery.appendChild(galleryItem);
    });
}

// Create gallery item element
function createGalleryItem(item, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', item.category);
    div.onclick = () => openModal(index);
    
    const isVideo = item.type === 'video';
    
    div.innerHTML = `
        ${isVideo ? `
            <video preload="metadata">
                <source src="${item.thumbnail}#t=0.5" type="video/${item.thumbnail.split('.').pop().toLowerCase()}">
            </video>
            <div class="media-overlay">
                <span class="play-icon">▶</span>
            </div>
        ` : `
            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
            <div class="media-overlay"></div>
        `}
        <div class="item-info">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
            <div class="item-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return div;
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            loadGallery(filter);
        });
    });
}

// Setup modal controls
function setupModalControls() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!modal) return;
    
    // Close modal
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    // Close modal when clicking outside content
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            navigateMedia(-1);
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            navigateMedia(1);
        };
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateMedia(-1);
            if (e.key === 'ArrowRight') navigateMedia(1);
        }
    });
}

// Open modal with media
function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    if (!modal || !modalContent) return;
    
    const item = filteredItems[index];
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    if (item.type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.src = item.thumbnail;
        modalContent.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.thumbnail;
        img.alt = item.title;
        modalContent.appendChild(img);
    }
    
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalDescription) modalDescription.textContent = item.description;
    if (modalTags) {
        modalTags.innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;
    
    // Stop any playing video
    const video = modalContent.querySelector('video');
    if (video) {
        video.pause();
        video.src = '';
    }
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate between media items
function navigateMedia(direction) {
    currentIndex += direction;
    
    // Loop around
    if (currentIndex < 0) {
        currentIndex = filteredItems.length - 1;
    } else if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
    }
    
    openModal(currentIndex);
}

// Setup contact form
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}
