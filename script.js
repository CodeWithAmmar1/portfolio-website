// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize neon background
    initNeonBackground();

    // Initialize typing effect
    initTypingEffect();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize project filtering
    initProjectFilter();

    // Initialize contact form
    initContactForm();

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize header scroll effect
    initHeaderScroll();
});

// Neon Background Animation
function initNeonBackground() {
    const canvas = document.getElementById('neonBackground');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    const setCanvasDimensions = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 6;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Create grid points
    const gridSize = 30;
    const points = [];

    const colors = ['#0ff', '#f0f', '#0f0', '#ff0'];

    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            if (Math.random() > 0.8) {
                points.push({
                    x,
                    y,
                    vx: Math.random() * 0.2 - 0.1,
                    vy: Math.random() * 0.2 - 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }
    }

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update points
        points.forEach(point => {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 3);
            gradient.addColorStop(0, point.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Update position
            point.x += point.vx;
            point.y += point.vy;

            // Bounce off edges
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        });

        requestAnimationFrame(animate);
    };

    animate();
}

// Typing Effect
function initTypingEffect() {
    const element = document.getElementById('typed-text');
    if (!element) return;

    const fullText = 'Muhammad Ali Ammar Naseer';
    let index = 0;

    function typeNextCharacter() {
        if (index < fullText.length) {
            element.textContent += fullText.charAt(index);
            index++;
            setTimeout(typeNextCharacter, 100);
        }
    }

    typeNextCharacter();
}

// Scroll Animations
function initScrollAnimations() {
    const animateItems = document.querySelectorAll('.animate-item, .animate-left, .animate-scale');

    const checkScroll = () => {
        animateItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight * 0.8) {
                item.classList.add('animate');
            }
        });
    };

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

    if (!menuBtn || !mobileNav) return;

    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileNav.classList.add('active');
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileNav.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileNav.classList.remove('active');
        });
    });
}

// Project Filtering
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thanks for your message! I\'ll get back to you soon.');

        // Reset form
        form.reset();
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.sticky-header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}