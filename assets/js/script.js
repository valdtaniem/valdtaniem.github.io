document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.getElementById('rocket');
    const planet = document.querySelector('.planet');

    let angle = 0;
    let radius = 150;
    let isOrbiting = true;
    let mouseX = 0;
    let mouseY = 0;

    function getPlanetCenter() {
        const planetRect = planet.getBoundingClientRect();
        const centerX = planetRect.left + planetRect.width / 2;
        const centerY = planetRect.top + planetRect.height / 2;
        return { centerX, centerY };
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isOrbiting) {
            const rocketRect = rocket.getBoundingClientRect();
            const rocketCenterX = rocketRect.left + rocketRect.width / 2 + window.scrollX;
            const rocketCenterY = rocketRect.top + rocketRect.height / 2 + window.scrollY;
            const dx = mouseX - rocketCenterX;
            const dy = mouseY - rocketCenterY;
            const rotation = Math.atan2(dy, dx) * 180 / Math.PI;
            rocket.style.transform = `rotate(${rotation}deg)`;
        }
    });

    document.addEventListener('click', () => {
        isOrbiting = !isOrbiting;
        rocket.classList.toggle('boost');
    });

    function animate() {
        if (isOrbiting) {
            const { centerX, centerY } = getPlanetCenter();
            angle += 0.02;
            const x = centerX + Math.cos(angle) * radius - rocket.offsetWidth / 2;
            const y = centerY + Math.sin(angle) * radius - rocket.offsetHeight / 2;
            rocket.style.left = `${x}px`;
            rocket.style.top = `${y}px`;
            rocket.style.transform = `rotate(${angle * 180 / Math.PI + 90}deg)`;
        } else {
            const rect = rocket.getBoundingClientRect();
            const currentX = rect.left + rect.width / 2;
            const currentY = rect.top + rect.height / 2;

            const dx = mouseX - currentX;
            const dy = mouseY - currentY;

            const rotation = Math.atan2(dy, dx) * 180 / Math.PI;
            rocket.style.transform = `rotate(${rotation}deg)`;

            rocket.style.left = `${parseFloat(rocket.style.left || rect.left) + dx * 0.05}px`;
            rocket.style.top = `${parseFloat(rocket.style.top || rect.top) + dy * 0.05}px`;
        }
        requestAnimationFrame(animate);
    }

    animate();
});
