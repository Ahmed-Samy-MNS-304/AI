// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
  body.classList.add('dark-theme');
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  if (mobileMenuBtn.classList.contains('active')) {
    // Create the mobile menu
    const mobileNav = document.createElement('div');
    mobileNav.classList.add('mobile-nav');
    
    // Clone the navigation links
    const links = navLinks.cloneNode(true);
    
    // Append to body
    mobileNav.appendChild(links);
    body.appendChild(mobileNav);
    
    // Add animation class
    setTimeout(() => {
      mobileNav.classList.add('active');
    }, 10);
    
    // Prevent scrolling
    body.style.overflow = 'hidden';
  } else {
    // Remove mobile menu
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      mobileNav.classList.remove('active');
      
      // Wait for animation to complete before removing
      setTimeout(() => {
        body.removeChild(mobileNav);
      }, 300);
      
      // Re-enable scrolling
      body.style.overflow = '';
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      
      setTimeout(() => {
        body.removeChild(mobileNav);
        body.style.overflow = '';
      }, 300);
    }
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section, .card, .application-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
};

// Add visible class for CSS animations
document.addEventListener('DOMContentLoaded', () => {
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .section, .card, .application-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .section.visible, .card.visible, .application-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Initial check for elements in viewport
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
});

// Sticky navigation on scroll
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  if (currentScrollY > lastScrollY) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
});

// Add CSS for sticky navigation
const navStyle = document.createElement('style');
navStyle.textContent = `
  nav.scrolled {
    background-color: var(--background-light);
    box-shadow: var(--shadow-light);
  }
  
  .dark-theme nav.scrolled {
    background-color: var(--background-dark);
    box-shadow: var(--shadow-dark);
  }
  
  nav.hidden {
    transform: translateY(-100%);
  }
  
  nav {
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-light);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .dark-theme .mobile-nav {
    background-color: var(--background-dark);
  }
  
  .mobile-nav.active {
    transform: translateX(0);
  }
  
  .mobile-nav .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    text-align: center;
  }
  
  .mobile-nav .nav-links a {
    font-size: var(--font-size-xl);
  }
`;
document.head.appendChild(navStyle);