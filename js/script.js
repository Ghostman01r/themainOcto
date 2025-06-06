document.addEventListener('DOMContentLoaded', () => {

    // --- Gyroscope-based Parallax for Mobile Devices ---
    function handleDeviceMotion(event) {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return; // Only run on homepage

        const profilePic = document.querySelector('.profile-pic');
        const bgTexts = document.querySelectorAll('.bg-text');

        // accelerationIncludingGravity gives us the orientation in x, y, z
        const { x, y } = event.accelerationIncludingGravity;

        // Normalize the values. A phone lying flat is ~9.8 on y. Tilted is less.
        // We'll map a tilt of +/- 5 to our -0.5 to 0.5 range.
        const moveX = -(y / 9.8) * 0.5; // Invert y-axis for natural movement
        const moveY = (x / 9.8) * 0.5;

        const imageMoveIntensity = 40; // Increased intensity for a better mobile effect

        if (profilePic) {
            profilePic.style.transform = `translate(${moveX * imageMoveIntensity}px, ${moveY * imageMoveIntensity}px)`;
        }

        bgTexts.forEach((text, index) => {
            const speed = (index + 1) * 10;
            text.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    }

    // --- Function to Request Permission (Needed for iOS 13+) ---
    function requestDeviceMotionPermission() {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleDeviceMotion);
                    }
                })
                .catch(console.error);
        } else {
            // For non-iOS 13+ devices like Android
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
    }

    // --- Main Parallax Logic ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Detect if it's a touch device (a good proxy for mobile)
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (isTouchDevice) {
            // On mobile, we use the gyroscope. Add a button to request permission.
            const permissionButton = document.createElement('button');
            permissionButton.id = 'motion-permission-btn';
            permissionButton.innerHTML = '<i class="fas fa-arrows-alt"></i> Enable Motion';
            document.body.appendChild(permissionButton);

            permissionButton.addEventListener('click', () => {
                requestDeviceMotionPermission();
                permissionButton.style.display = 'none'; // Hide button after click
            });
            
        } else {
            // On desktop, use the existing mousemove parallax
            document.addEventListener('mousemove', (e) => {
                const profilePic = document.querySelector('.profile-pic');
                const bgTexts = document.querySelectorAll('.bg-text');
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth) - 0.5;
                const y = (clientY / window.innerHeight) - 0.5;
                const imageMoveIntensity = 20;

                if (profilePic) {
                    profilePic.style.transform = `translate(${-x * imageMoveIntensity}px, ${-y * imageMoveIntensity}px)`;
                }
                bgTexts.forEach((text, index) => {
                    const speed = (index + 1) * 5;
                    text.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
            });
        }
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

    // --- Background Music Controls ---
    const music = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    if (music && musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                music.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
            }
        });
    }

    // This fade-in will run on every page
    document.body.style.opacity = '1';
});
