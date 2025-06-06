document.addEventListener('DOMContentLoaded', () => {

    // --- Parallax Mouse Move Effect (for homepage only) ---
    // This effect is applied only if the hero-content element exists.
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const profilePic = document.querySelector('.profile-pic');
        const bgTexts = document.querySelectorAll('.bg-text');

        document.addEventListener('mousemove', (e) => {
            // Get cursor position from the center of the screen (-0.5 to 0.5)
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) - 0.5;
            const y = (clientY / window.innerHeight) - 0.5;

            // --- THIS IS THE PART THAT MOVES THE IMAGE ---
            // The number (e.g., 20) controls the intensity of the movement.
            const imageMoveIntensity = 20; 
            if (profilePic) {
                profilePic.style.transform = `translate(${-x * imageMoveIntensity}px, ${-y * imageMoveIntensity}px)`;
            }
            
            // This part moves the background letters for a depth effect.
            bgTexts.forEach((text, index) => {
                const speed = (index + 1) * 5; // Different speeds for each letter
                // We combine the parallax movement with the existing float animation transform
                const floatTransform = getComputedStyle(text).transform;
                text.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // --- Add scroll class for content pages ---
    const contentPage = document.querySelector('.content-page');
    if (contentPage) {
        document.body.classList.add('scrollable');
    }

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // This fade-in will run on every page for a consistent entry animation.
    document.body.style.opacity = '1';
});
