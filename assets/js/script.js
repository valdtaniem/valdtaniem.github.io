document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navUl = document.querySelector('nav ul');

  if (toggle && navUl) {
    toggle.addEventListener('click', () => {
      const isOpen = navUl.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const rocket = document.getElementById('rocket');
  const planet = document.querySelector('.planet');
  if (!rocket || !planet) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let angle = 0;
  let isOrbiting = true;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function getPlanetCenter() {
    const planetRect = planet.getBoundingClientRect();
    return {
      centerX: planetRect.left + planetRect.width / 2,
      centerY: planetRect.top + planetRect.height / 2,
      radius: planetRect.width * 0.9,
    };
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('click', () => {
    if (!isOrbiting) {
      const { centerX, centerY } = getPlanetCenter();
      const rect = rocket.getBoundingClientRect();
      const currentX = rect.left + rect.width / 2;
      const currentY = rect.top + rect.height / 2;
      angle = Math.atan2(currentY - centerY, currentX - centerX);
    }
    isOrbiting = !isOrbiting;
  });

  function animate() {
    if (isOrbiting) {
      const { centerX, centerY, radius } = getPlanetCenter();
      angle += 0.02;
      const x = centerX + Math.cos(angle) * radius - rocket.offsetWidth / 2;
      const y = centerY + Math.sin(angle) * radius - rocket.offsetHeight / 2;
      rocket.style.left = `${x}px`;
      rocket.style.top = `${y}px`;
      rocket.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
    } else {
      const rect = rocket.getBoundingClientRect();
      const currentX = rect.left + rect.width / 2;
      const currentY = rect.top + rect.height / 2;

      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      const rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
      rocket.style.transform = `rotate(${rotation}deg)`;

      rocket.style.left = `${parseFloat(rocket.style.left || rect.left) + dx * 0.05}px`;
      rocket.style.top = `${parseFloat(rocket.style.top || rect.top) + dy * 0.05}px`;
    }
    requestAnimationFrame(animate);
  }

  if (prefersReducedMotion) {
    const { centerX, centerY, radius } = getPlanetCenter();
    rocket.style.left = `${centerX + radius - rocket.offsetWidth / 2}px`;
    rocket.style.top = `${centerY - rocket.offsetHeight / 2}px`;
  } else {
    animate();
  }
});