// Change Background Operation
document.addEventListener('DOMContentLoaded', () => {
    const landing = document.getElementById("landing");
    const images = [
        'imgs/hero_bg_1.jpg',
        'imgs/hero_bg_2.jpg',
        'imgs/hero_bg_3.jpg'
    ];
    // Pre-load images
    const preloadedImages = images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });
    let index = 0; // Start from the first image
    // Initial setup for the landing background
    landing.style.position = 'relative';
    landing.style.overflow = 'hidden';
    landing.style.background = `
        linear-gradient(0deg, rgb(0 0 0 / 30%), rgb(0 0 0 / 30%)), 
        url(${images[index]})
    `;
    landing.style.backgroundPosition = 'center';
    landing.style.backgroundRepeat = 'no-repeat';
    landing.style.backgroundSize = 'cover';
    landing.style.backgroundClip = 'border-box';
    landing.style.transition = 'background-image 1s ease-in-out, background-color 1s ease-in-out';
    function changeImage() {
        // Calculate the next index
        const nextIndex = (index + 1) % images.length;
        const newImageUrl = images[nextIndex];
        // Apply the new background image with a fade effect
        landing.style.transition = 'none'; // Disable transition to avoid glitches
        landing.style.backgroundImage = `linear-gradient(0deg, rgb(0 0 0 / 30%), rgb(0 0 0 / 30%)), url(${newImageUrl})`;
        landing.style.backgroundPosition = 'center';
        landing.style.backgroundRepeat = 'no-repeat';
        landing.style.backgroundSize = 'cover';
        landing.style.backgroundClip = 'border-box';
        // Trigger a reflow to ensure the new background image is applied
        landing.offsetHeight;
        // Re-enable the transition for the fade effect
        landing.style.transition = 'background-image 1s ease-in-out, background-color 1s ease-in-out';
        // Update the index for the next cycle
        index = nextIndex;
    }
    // Start changing images after preloading is complete
    Promise.all(preloadedImages.map(img => new Promise(resolve => img.onload = resolve)))
        .then(() => {
            setInterval(changeImage, 5000); // Change image every 5 seconds
        });
});