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

// Scroll Animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
}

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(el => {
        if (isElementPartiallyInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Animate skill bars
function animateSkills() {
    const skillsSection = document.querySelector('#skills');
    
    if (isElementPartiallyInViewport(skillsSection)) {
        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });
    }
}

// Animate stat numbers
function animateStats() {
    const aboutSection = document.querySelector('#about');
    
    if (isElementPartiallyInViewport(aboutSection)) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            
            if (current < target) {
                const increment = Math.ceil(target / 50);
                const newValue = Math.min(current + increment, target);
                stat.textContent = newValue;
                
                if (newValue < target) {
                    setTimeout(() => animateStats(), 50);
                }
            }
        });
    }
}

// Create floating particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// CV Download
function handleCVDownload(e) {
    e.preventDefault();
    
    // Simulate CV download
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
    
    // Lien vers le fichier RAW GitHub
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/Stannnnnbinks/portfolio.github.io/main/cv.pdf';  // Lien vers le fichier RAW
    link.download = 'cv.pdf';  // Le fichier sera téléchargé sous ce nom
    link.style.display = 'none';  // Lien invisible
    document.body.appendChild(link);  // Ajoute le lien à la page
    link.click();  // Simule un clic sur le lien pour lancer le téléchargement
    document.body.removeChild(link);  // Retire le lien une fois le téléchargement lancé
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

// Initialize project cards with hidden state
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Enhanced scroll effects
function enhancedScrollEffects() {
    const scrollTop = window.pageYOffset;
    
    // Parallax for hero elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrollTop * 0.1}px)`;
        heroImage.style.transform
