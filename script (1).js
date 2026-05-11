// ===== GLOBAL VARIABLES =====
const config = {
    particles: 50,
    animationSpeed: 0.02
};

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent * 100}%`;
        }
    });
}

// ===== INTERSECTION OBSERVER (FADE IN) =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .team-card, .process-step, .feature-card, .tech-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== PARTICLE SYSTEM =====
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < config.particles; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
    
    // Remove when animation ends
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}

// ===== TEAM CARDS INTERACTION =====
function initTeamCards() {
    document.querySelectorAll('.team-card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = `translateY(-25px) rotateX(${index % 2 ? '5deg' : '-5deg'})`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-20px)';
        });
        
        // Click to show details
        card.addEventListener('click', () => {
            showToast(`Detail: ${card.dataset.name}`, 'info');
        });
    });
}

// ===== PROGRESS BAR DEMO =====
function initProgressDemo() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const stages = [
        { width: '25%', text: '📸 Photo Verification' },
        { width: '50%', text: '🧼 Washing' },
        { width: '75%', text: '☀️ Drying' },
        { width: '100%', text: '📦 Packing Complete!' }
    ];
    
    let stageIndex = 0;
    
    setInterval(() => {
        if (stageIndex < stages.length) {
            const progressBar = progressBars[0];
            const statusText = progressBar.nextElementSibling;
            
            progressBar.style.width = stages[stageIndex].width;
            if (statusText) {
                statusText.textContent = stages[stageIndex].text;
            }
            
            stageIndex++;
        }
    }, 3000);
}

// ===== NOTIFICATION TOAST =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type] || icons.success}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ===== BUTTON INTERACTIONS =====
function initButtons() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Action based on button
            if (btn.textContent.includes('Download')) {
                showToast('Proposal PDF berhasil diunduh! 📥', 'success');
                // window.print(); // Uncomment untuk print
            } else if (btn.textContent.includes('Source Code')) {
                showToast('Redirect ke GitHub...', 'info');
                window.open('https://github.com/yourusername/StepClean', '_blank');
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax');
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.prepend(scrollIndicator);
    
    // Initialize all features
    initScrollIndicator();
    initScrollAnimations();
    initParticles();
    initTeamCards();
    initProgressDemo();
    initButtons();
    initParallax();
    animateCounters();
    
    // Welcome toast
    setTimeout(() => {
        showToast('Selamat datang di Proposal StepClean+! 🚀', 'success');
    }, 1000);
    
    // Preload images for smooth animations
    const images = [
        'data:image/svg+xml;base64,...' // Add your images
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Recalculate particles on resize
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        initParticles();
    }
});

// ===== PWA SERVICE WORKER (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        // Already handled by scroll animations
    }
    
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animate-duration', '0.01ms');
    }
}

optimizePerformance();