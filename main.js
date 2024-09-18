// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  
  skillBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    
    gsap.fromTo(bar, 
      { width: 0 }, 
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

// Function to initialize typing animation
function initTypingAnimation() {
  new Typed(".pro-text", {
    strings: [
      "Hacker",
      "Developer",
      "Programmer",
      "Linux User",
      "Student"
    ],
    typeSpeed: 100,
    backSpeed: 300,
    backDelay: 600,
    loop: true
  });
}

// Function to initialize all animations
function initAnimations() {
  animateSkillBars();
  initTypingAnimation();
}

// Run animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Optionally, you can add more animations or functionality here
