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
    
    // In a real implementation, you would trigger the actual file download here
    // For demo purposes, we're just simulating the download process
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
        heroImage.style.transform = `translateY(${scrollTop * 0.15}px)`;
    }
    
    // Fade effect for sections
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollTop > sectionTop - windowHeight && scrollTop < sectionTop + sectionHeight) {
            const opacity = 1 - Math.abs(scrollTop - sectionTop) / windowHeight;
            section.style.opacity = Math.max(0.3, opacity);
        }
    });
}

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
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

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-trigger animations when page becomes visible
        animateOnScroll();
        animateSkills();
    }
});

// Smooth scroll polyfill for older browsers
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    function smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Replace smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
    // Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un événement de clic sur le bouton pour télécharger le CV
    document.getElementById('cv-download-btn').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'chemin/vers/cv.pdf'; // Remplace avec le chemin réel vers ton fichier
        link.download = 'cv.pdf'; // Nom du fichier lors du téléchargement
        link.click(); // Déclenche le téléchargement
    });
});
}
