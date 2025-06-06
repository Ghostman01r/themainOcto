document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('DOMContentLoaded', () => the native iOS permission pop-up.
    *   On an Android phone, it will just start listening for the event.
5.  **The Magic:** Once permission is granted, the `handleDeviceMotion` function listens to the `devicemotion` event, gets the phone's tilt data, and moves the image accordingly.

### **Crucial Next Step: Testing**

As mentioned, you cannot test this by opening the `index.html` file locally.

1.  **Deploy Your Site:** Upload your entire project folder to a free hosting service like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [GitHub Pages](https://pages.github.com/). All of these provide free `https://`.
2.  **Open on Your Phone:** Navigate to your new `https://your-site-name.netlify.app` URL on your smartphone.
3.  **Tap the Button:** On the homepage, tap the "Enable Motion" button.
4.  **Grant Permission:** If you're on an iPhone, a pop-up will appear. Tap "Allow."
5.  **Tilt Your Phone:** Gently tilt your phone left, right, forward, and back. You should see the center image and background letters move in response, creating that incredible immersive effect {

    // ... (Your existing parallax mouse effect code is here) ...

    // ==========================================================
    // --- NEW: Gyroscope Parallax Effect for Mobile Devices ---
    // ==========================================================

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // This function will handle the device orientation data
        const handleOrientation = (event) => {
            const profilePic = document.querySelector('.profile-pic');
            if (!profilePic) return;

            // event.beta is the front-to-back tilt (-180 to 180)
            // event.gamma is the side-to-side tilt (-90 to 90)
            const beta = event.beta;
            const gamma = event.gamma;

            // --- Control the intensity of the movement ---
            const moveIntensity = 15; 

            // Normalize the values to create a subtle movement
            // We use gamma for x-axis movement and beta for y-axis
            const x = (gamma / 45) * moveIntensity; // Max tilt of 45 degrees = max movement
            const y = (beta / 45) * moveIntensity;

            // Apply the transformation to the image
            profilePic.style.transform = `translate(${-x}px, ${-y}px)`;
        };

        // --- Logic to request permission and start listening ---
        const startGyroscope = () => {
            // Check for the modern, permission-based API (especially for iOS 13+)
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                        } else {
                            console.log('Permission to access device orientation was denied.');
                        }
                    })
                    .catch(console.error);
            } else {
                // Handle older browsers or non-iOS devices that don't need explicit permission
                window.addEventListener('deviceorientation', handleOrientation);
            }
        };

        // We can add a button for the user to click to activate this,
        // as some browsers require a user interaction to ask for permission.
        // For simplicity, let's try to activate it on the first touch.
        document.body.addEventListener('click', startGyroscope, { once: true });
    }

    // ... (Your other existing JS code for mobile nav, audio, etc. is here) ...
});

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
