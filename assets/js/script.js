document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.getElementById('rocket');
    const planet = document.querySelector('.planet');
    const heroSection = document.querySelector('.hero-background');
    
    let angle = 0;
    let radius = 150;
    let isOrbiting = true;
    let mouseX = 0;
    let mouseY = 0;

    // Get planet center position
    const planetRect = planet.getBoundingClientRect();
    let centerX = planetRect.left + planetRect.width / 2;
    let centerY = planetRect.top + planetRect.height / 2;

    // Mouse move handler
    heroSection.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isOrbiting) {
            const dx = mouseX - rocket.offsetLeft - rocket.width / 2;
            const dy = mouseY - rocket.offsetTop - rocket.height / 2;
            const rotation = (Math.atan2(dy, dx) * 180 / Math.PI);
            rocket.style.transform = `rotate(${rotation}deg)`;
        }
    });

    // Click handler to toggle orbit/follow mode
    heroSection.addEventListener('click', () => {
        isOrbiting = !isOrbiting;
        rocket.classList.toggle('boost');
    });

    // Animation loop
    function animate() {
        if (isOrbiting) {
            const planetRect = planet.getBoundingClientRect();
            let centerX = planetRect.left + planetRect.width / 2;
            let centerY = planetRect.top + planetRect.height / 2;

            // Orbital movement
            angle += 0.02;
            const x = centerX + Math.cos(angle) * radius - rocket.width / 2;
            const y = centerY + Math.sin(angle) * radius - rocket.height / 2;
            
            rocket.style.left = `${x}px`;
            rocket.style.top = `${y}px`;
            rocket.style.transform = `rotate(${angle * 180 / Math.PI + 90}deg)`;

        } else {
            // Follow mouse with smooth movement
            const currentX = rocket.offsetLeft;
            const currentY = rocket.offsetTop;
            const dx = mouseX - currentX - rocket.width / 2;
            const dy = mouseY - currentY - rocket.height / 2;
            
            rocket.style.left = `${currentX + dx * 0.02}px`;
            rocket.style.top = `${currentY + dy * 0.02}px`;
        }
        
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});