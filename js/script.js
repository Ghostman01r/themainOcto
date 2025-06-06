document.addEventListener('DOMContentLoaded', () => {

    // This function will be called when the phone moves
    function handleDeviceMotion(event) {
        const profilePic = document.querySelector('.profile-pic');
        const bgTexts = document.querySelectorAll('.bg-text');

        // accelerationIncludingGravity gives the force of gravity on each axis.
        // When the phone is tilted, gravity is distributed across the x and y axes.
        const { x, y } = event.accelerationIncludingGravity;

        // We normalize the values. A phone lying flat has a y-value of ~9.8.
        // We'll map a tilt to a range of -0.5 to 0.5 for our movement calculation.
        const moveX = -(y / 9.8) * 0.5; // Invert y-axis for natural "window" effect
        const moveY =  (x / 9.8) * 0.5;

        const imageMoveIntensity = 80; // Increased intensity for a better mobile effect

        if (profilePic) {
            profilePic.style.transform = `translate(${moveX * imageMoveIntensity}px, ${moveY * imageMoveIntensity}px)`;
        }

        bgTexts.forEach((text, index) => {
            const speed = (index + 1) * 10;
            text.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    }

    // This function asks for permission, which is required on iOS 13+
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
            // For other devices like Android
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
    }

    // --- Main Parallax Logic ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (isTouchDevice) {
            // MOBILE: Create and show a button to ask for permission
            const permissionButton = document.createElement('button');
            permissionButton.id = 'motion-permission-btn';
            permissionButton.innerHTML = '<i class="fas fa-mobile-alt"></i> Enable Motion';
            document.body.appendChild(permissionButton);

            permissionButton.addEventListener('click', () => {
                requestDeviceMotionPermission();
                permissionButton.style.display = 'none'; // Hide button after it's clicked
            });

        } else {
            // DESKTOP: Use the existing mouse-move parallax
            document.addEventListener('mousemove', (e) => {
                const profilePic = document.querySelector('.profile-pic');
                const bgTexts = document.querySelectorAll('.bg-text');
                if (!profilePic || !bgTexts) return;

                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth) - 0.5;
                const y = (clientY / window.innerHeight) - 0.5;
                const imageMoveIntensity = 20;

                profilePic.style.transform = `translate(${-x * imageMoveIntensity}px, ${-y * imageMoveIntensity}px)`;
                bgTexts.forEach((text, index) => {
                    const speed = (index + 1) * 5;
                    text.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
            });
        }
    }

    // --- Other existing code ---

    const contentPage = document.querySelector('.content-page');
    if (contentPage) {
        document.body.classList.add('scrollable');
    }

    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

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

    document.body.style.opacity = '1';
});
