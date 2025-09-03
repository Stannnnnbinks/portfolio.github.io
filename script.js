// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillProgresses = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');
const cvDownloadBtn = document.getElementById('cv-download-btn');
const particlesContainer = document.getElementById('particles');

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// CV Download
function handleCVDownload(e) {
    e.preventDefault();
    
    // Simuler le téléchargement du CV
    const button = e.target;
    const originalText = button.textContent;
    const originalIcon = button.querySelector('.download-icon').innerHTML;
    
    button.innerHTML = `
        <svg class="download-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,4V2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
        </svg>
        Téléchargement...
    `;
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = `
            <svg class="download-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            CV téléchargé !
        `;
        
        setTimeout(() => {
            button.innerHTML = `
                <svg class="download-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                ${originalText.replace(/.*>/, '')}
            `;
            button.disabled = false;
        }, 2000);
    }, 1500);
    
    // Télécharger le fichier CV depuis GitHub
    const link = document.createElement('a');
    link.href = 'cv.pdf'; // Chemin relatif vers le fichier CV
    link.download = 'cv.pdf'; // Le fichier sera téléchargé sous ce nom
    link.click();
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.nav');
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
}

// Smooth reveal animations for project cards
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        if (isElementPartiallyInViewport(card)) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and effects
    createParticles();
    initializeProjectCards();
    showLoadingAnimation();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
        animateSkills();
        animateStats();
        animateProjectCards();
        parallaxEffect();
        enhancedScrollEffects();
    }, { passive: true });
    
    // Add CV download handler
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', handleCVDownload);
    }
    
    // Add resize event listener
    window.addEventListener('resize', () => {
        // Update any size-dependent calculations
        updateActiveNavLink();
    });
    
    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Add classes for animations
    document.querySelectorAll('.about-content > *').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in');
    });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        category.classList.add('fade-in');
    });
    
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.add('slide-in-left');
    });
    
    document.querySelector('.cv-download-section')?.classList.add('slide-in-right');
});
