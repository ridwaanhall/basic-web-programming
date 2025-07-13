// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    showSlide(currentSlide);
}

setInterval(() => {
    changeSlide(1);
}, 3000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Simple animation on scroll
window.addEventListener('scroll', function() {
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const rect = article.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.style.opacity = '0.7';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});
