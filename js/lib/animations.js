// Advanced animations and interactions
// This file contains additional animations and interactions for the AI website

// Parallax effect for hero section
const heroImage = document.querySelector('.hero-image');
const heroSection = document.querySelector('.hero');

function parallax() {
  if (!heroImage) return;
  
  const scrollPosition = window.pageYOffset;
  
  // Only apply parallax if hero section is visible
  if (scrollPosition < heroSection.offsetHeight) {
    const parallaxValue = scrollPosition * 0.4;
    heroImage.style.transform = `translateY(${parallaxValue}px)`;
  }
}

// Intersection Observer for section animations
const setupIntersectionObserver = () => {
  const options = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of element is visible
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Special animations for specific sections
        if (entry.target.id === 'introduction') {
          const cards = entry.target.querySelectorAll('.card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('card-visible');
            }, index * 150);
          });
        }
        
        if (entry.target.id === 'applications') {
          const appCards = entry.target.querySelectorAll('.application-card');
          appCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('app-card-visible');
            }, index * 100);
          });
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
};

// Enhance hover effects
const enhanceInteractions = () => {
  // Add hover effects for cards
  document.querySelectorAll('.card, .application-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'var(--shadow-light)';
    });
  });
  
  // Add animation classes
  const style = document.createElement('style');
  style.textContent = `
    .section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.in-view {
      opacity: 1;
      transform: translateY(0);
    }
    
    .card {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .application-card {
      opacity: 0;
      transform: translateX(-20px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .app-card-visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes rotateIn {
      from {
        transform: rotate(-10deg) scale(0.9);
        opacity: 0;
      }
      to {
        transform: rotate(0) scale(1);
        opacity: 1;
      }
    }
    
    .cta-button {
      position: relative;
      overflow: hidden;
    }
    
    .cta-button:hover {
      animation: pulse 1.5s infinite;
    }
    
    .cta-button::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(-50%, -50%) rotate(35deg);
      transition: transform 0.5s;
    }
    
    .cta-button:hover::after {
      transform: translate(-50%, -50%) rotate(35deg) translateX(50%);
    }
    
    .hero-image {
      animation: float 6s ease-in-out infinite;
    }
    
    .section-header h2 {
      animation: slideIn 0.8s ease-out forwards;
    }
    
    .section-divider {
      animation: rotateIn 0.8s ease-out forwards;
    }
    
    .message {
      transform-origin: bottom;
      animation: messagePopIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }
    
    @keyframes messagePopIn {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .chatbot-toggle {
      animation: float 3s ease-in-out infinite;
    }
    
    .application-icon {
      transition: transform 0.3s ease;
    }
    
    .application-card:hover .application-icon {
      transform: scale(1.2) rotate(5deg);
    }
  `;
  document.head.appendChild(style);
};

// Typing effect for the hero headline
const setupTypingEffect = () => {
  const headline = document.querySelector('.hero h1');
  if (!headline) return;
  
  const originalText = headline.innerHTML;
  const highlightWord = document.querySelector('.highlight').textContent;
  
  // Replace the highlight word in the original text
  const textWithoutHighlight = originalText.replace(`<span class="highlight">${highlightWord}</span>`, '___HIGHLIGHT___');
  
  // Split into words
  const words = textWithoutHighlight.split(' ');
  
  // Clear the headline
  headline.innerHTML = '';
  
  // Display words one by one
  let wordIndex = 0;
  const interval = setInterval(() => {
    if (wordIndex < words.length) {
      let word = words[wordIndex];
      
      // Check if it's the highlight word
      if (word === '___HIGHLIGHT___') {
        word = `<span class="highlight">${highlightWord}</span>`;
      }
      
      // Add a space after each word except the last one
      if (wordIndex < words.length - 1) {
        word += ' ';
      }
      
      headline.innerHTML += word;
      wordIndex++;
    } else {
      clearInterval(interval);
    }
  }, 200);
};

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize parallax effect
  window.addEventListener('scroll', parallax);
  
  // Initialize intersection observer for animations
  setupIntersectionObserver();
  
  // Enhance interactions
  enhanceInteractions();
  
  // Setup typing effect
  setupTypingEffect();
});

// Export functions
export { setupTypingEffect };