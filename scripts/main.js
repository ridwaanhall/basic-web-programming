// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const portfolioSlider = document.getElementById('portfolio-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const sliderDots = document.getElementById('slider-dots');
const contactForm = document.getElementById('contact-form');
const codeAnimation = document.getElementById('code-animation');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Portfolio Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.portfolio-item');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Slider event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animated counters for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('quick-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content, .quick-stats').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .portfolio-item,
    .about-content,
    .contact-content,
    .quick-stats {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in,
    .portfolio-item.animate-in,
    .about-content.animate-in,
    .contact-content.animate-in,
    .quick-stats.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Dynamic code animation in hero section
function createCodeLines() {
    const codeLines = [
        'const developer = "passionate";',
        'function createWebsite() {',
        '  return "amazing";',
        '}',
        'HTML + CSS + JavaScript = ✨'
    ];
    
    let currentLine = 0;
    
    setInterval(() => {
        const lines = codeAnimation.querySelectorAll('.code-line');
        lines.forEach((line, index) => {
            if (index === currentLine) {
                line.style.opacity = '1';
                line.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
                line.textContent = codeLines[currentLine] || '';
                line.style.fontSize = '10px';
                line.style.color = 'white';
                line.style.display = 'flex';
                line.style.alignItems = 'center';
                line.style.paddingLeft = '10px';
                line.style.fontFamily = 'monospace';
            } else {
                line.style.opacity = '0.3';
            }
        });
        
        currentLine = (currentLine + 1) % codeLines.length;
    }, 2000);
}

// Skills hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
    });
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        this.style.color = 'white';
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
        this.style.color = '';
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading effect for profile image
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // If image fails to load, create a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QUo8L3RleHQ+Cjwvc3ZnPgo=';
        });
    }
});

// Keyboard navigation for slider
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize animations when page loads
window.addEventListener('load', function() {
    createCodeLines();
    
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update navigation active states
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, 16);

window.addEventListener('scroll', handleScroll);

console.log('🚀 Portfolio website loaded successfully!');
console.log('📱 Responsive design with Flexbox ✅');
console.log('🎨 Semantic HTML structure ✅');
console.log('⚡ Interactive JavaScript features ✅');
