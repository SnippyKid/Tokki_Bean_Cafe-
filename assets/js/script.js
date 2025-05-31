document.addEventListener('DOMContentLoaded', function() {
    // Hero section animations
    animateHeroSection();
    
    // Showcase animations
    animateCoffeeShowcase();
    
    // Gallery animations
    animateGallery();
    
    // Visit section animations
    animateVisitSection();
    
    // Footer animations
    animateFooter();
    
    // Coffee builder elements
    const options = document.querySelectorAll('.option');
    const cupLiquid = document.querySelector('.cup-liquid');
    const cupFoam = document.querySelector('.cup-foam');
    const coffeeName = document.querySelector('.coffee-name');
    const orderBtn = document.querySelector('.order-btn');
    const steamContainer = document.querySelector('.steam-container');
    const cup = document.querySelector('.cup');
    const notificationToast = document.getElementById('notification-toast');
    
    // Coffee options and color mapping
    const coffeeOptions = {
        base: {
            espresso: { color: '#3A2618', name: 'Espresso' },
            americano: { color: '#6F4E37', name: 'Americano' },
            latte: { color: '#B58D67', name: 'Latte' }
        },
        milk: {
            none: { color: 'transparent', name: 'No Milk' },
            whole: { color: '#F5E7D3', name: 'Whole Milk', lightenFactor: 0.5 },
            oat: { color: '#EDE0C8', name: 'Oat Milk', lightenFactor: 0.3 }
        }
    };
    
    // Store current selections
    const currentSelection = {
        base: null,
        milk: null
    };
    
    // Initialize GSAP animations
    initializeAnimations();
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const value = this.getAttribute('data-value');
            
            // Remove previous selection
            document.querySelectorAll(`.option[data-type="${type}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class
            this.classList.add('selected');
            
            // Store selection
            currentSelection[type] = value;
            
            // Update coffee visualization with a ripple effect
            createRippleEffect(this);
            updateCoffeeVisualization();
        });
    });
    
    // Animate coffee showcase section
    function animateCoffeeShowcase() {
        if (!window.gsap) return;
        
        // Animate feature coffee
        gsap.from('.feature-coffee', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.feature-coffee',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate coffee cards
        gsap.utils.toArray('.coffee-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 0.8,
                delay: 0.2 + (i * 0.15),
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=80',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate quote box
        gsap.from('.coffee-quote', {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.coffee-quote',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate feature badge
        gsap.from('.feature-badge', {
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'back.out',
            scrollTrigger: {
                trigger: '.feature-coffee',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate coffee traits
        gsap.from('.trait', {
            opacity: 0,
            x: -20,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.coffee-traits',
                start: 'top bottom-=80',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate heading
        gsap.from('.showcase-heading h2', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.showcase-heading',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.showcase-heading p', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.showcase-heading',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Show toast notification
    function showToast(message, type = 'success') {
        // Clear any existing timeout
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        // Set content and class
        notificationToast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        notificationToast.className = 'notification-toast ' + type;
        
        // Show the toast
        setTimeout(() => {
            notificationToast.classList.add('show');
        }, 100);
        
        // Auto hide after 3 seconds
        window.toastTimeout = setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 3000);
    }
    
    // Animate hero section
    function animateHeroSection() {
        if (!window.gsap) return;
        
        // Create timeline for hero animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // Background circles animation
        gsap.from('.coffee-circle', {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "elastic.out(0.8, 0.4)",
        });
        
        // Coffee cup icon animation
        gsap.from('.coffee-cup-icon', {
            y: 50,
            opacity: 0,
            scale: 0.5,
            rotation: -15,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: 0.5
        });
        
        // Text elements animation
        tl.from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8 })
          .from('.hero-title', { opacity: 0, y: 30, duration: 1 }, "-=0.6")
          .from('.hero-title span', { opacity: 0, x: -20, duration: 0.7 }, "-=0.7")
          .from('.hero-description', { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
          .from('.hero-buttons', { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, "-=0.6");
        
        // Continuous steam animation
        gsap.to('.steam', {
            opacity: 0.8,
            yoyo: true,
            repeat: -1,
            duration: 2,
            stagger: 0.5,
            ease: "sine.inOut"
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Create ripple effect when selecting options
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.borderRadius = '50%';
        
        // Position the ripple at click location
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ripple.style.left = `${x - 10}px`;
        ripple.style.top = `${y - 10}px`;
        
        // Add to element
        element.appendChild(ripple);
        
        // Animate with GSAP
        gsap.to(ripple, {
            scale: 15,
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
            onComplete: function() {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        });
    }
    
    // Initialize animations
    function initializeAnimations() {
        gsap.set(cupLiquid, { opacity: 0, height: '0%' });
        gsap.set(cupFoam, { opacity: 0, y: -10 });
        
        // Initial cup animation
        gsap.from(cup, {
            y: 50,
            rotateX: '15deg',
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
            delay: 0.5
        });
        
        // Subtle floating animation for the cup
        gsap.to(cup, {
            y: '-=5',
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }
    
    // Update coffee visualization based on selections
    function updateCoffeeVisualization() {
        // Update base (liquid)
        if (currentSelection.base) {
            const baseOption = coffeeOptions.base[currentSelection.base];
            let liquidColor = baseOption.color;
            
            // Lighten the coffee if milk is selected
            if (currentSelection.milk && currentSelection.milk !== 'none') {
                const milkOption = coffeeOptions.milk[currentSelection.milk];
                liquidColor = lightenColor(baseOption.color, milkOption.lightenFactor);
            }
            
            gsap.to(cupLiquid, {
                backgroundColor: liquidColor,
                height: '80%',
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            // Start steam animation
            startSteam();
        } else {
            gsap.to(cupLiquid, {
                opacity: 0,
                height: '0%',
                duration: 0.5
            });
        }
        
        // Update milk (foam)
        if (currentSelection.milk && currentSelection.milk !== 'none') {
            const milkOption = coffeeOptions.milk[currentSelection.milk];
            gsap.to(cupFoam, {
                backgroundColor: milkOption.color,
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3,
                ease: 'power2.out'
            });
            
            // Add a little animation to the foam
            gsap.to(cupFoam, {
                y: '-=3',
                yoyo: true,
                repeat: -1,
                duration: 2,
                ease: 'sine.inOut'
            });
        } else {
            gsap.to(cupFoam, {
                opacity: 0,
                y: -10,
                duration: 0.3
            });
        }
        
        // Update coffee name
        updateCoffeeName();
        
        // Add 3D cup interaction 
        animateCupInteraction();
    }
    
    // Animate cup for more interactivity
    function animateCupInteraction() {
        // Return cup to original position first
        gsap.to(cup, {
            rotateY: '-15deg',
            rotateX: '5deg',
            duration: 0.5
        });
        
        // Then apply a new animation
        gsap.to(cup, {
            rotateY: '-5deg',
            rotateX: '10deg',
            duration: 0.8,
            ease: 'back.out(1.7)',
            onComplete: function() {
                gsap.to(cup, {
                    rotateY: '-15deg',
                    rotateX: '5deg',
                    duration: 1.2,
                    ease: 'power1.inOut'
                });
            }
        });
    }
    
    // Function to create steam particles
    function createSteamParticle() {
        if (!currentSelection.base) return;
        
        const steam = document.createElement('div');
        steam.className = 'steam-particle';
        steam.style.position = 'absolute';
        steam.style.width = `${10 + Math.random() * 15}px`;
        steam.style.height = `${10 + Math.random() * 15}px`;
        steam.style.borderRadius = '50%';
        steam.style.background = 'rgba(255, 255, 255, 0.7)';
        steam.style.filter = 'blur(5px)';
        steam.style.left = `${Math.random() * 80}px`;
        steam.style.bottom = '0';
        steam.style.opacity = '0';
        
        steamContainer.appendChild(steam);
        
        // Animate the steam particle
        gsap.to(steam, {
            y: -80 - Math.random() * 40,
            x: Math.random() * 30 - 15,
            opacity: 0.7,
            scale: 2 + Math.random(),
            duration: 1.5 + Math.random(),
            ease: 'power1.out',
            onComplete: function() {
                gsap.to(steam, {
                    opacity: 0,
                    duration: 1,
                    onComplete: function() {
                        if (steam.parentNode) {
                            steam.parentNode.removeChild(steam);
                        }
                    }
                });
            }
        });
    }
    
    // Start steam effect
    function startSteam() {
        // Clear any existing steam interval
        if (window.steamInterval) {
            clearInterval(window.steamInterval);
        }
        
        // Create initial steam particles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createSteamParticle(), i * 200);
        }
        
        // Set interval for ongoing steam effect
        window.steamInterval = setInterval(function() {
            if (currentSelection.base) {
                createSteamParticle();
            } else {
                clearInterval(window.steamInterval);
            }
        }, 800);
    }
    
    // Update coffee name based on selections
    function updateCoffeeName() {
        if (!currentSelection.base) {
            gsap.to(coffeeName, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: function() {
                    coffeeName.textContent = 'Select options to start';
                    gsap.to(coffeeName, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5
                    });
                }
            });
            return;
        }
        
        let name = coffeeOptions.base[currentSelection.base].name;
        
        // Add milk type if selected
        if (currentSelection.milk && currentSelection.milk !== 'none') {
            if (currentSelection.base === 'espresso') {
                name = 'Cappuccino';
            } else if (currentSelection.base === 'americano') {
                name = 'White Americano';
            } else {
                name = 'Latte'; // Default for latte
            }
        }
        
        // Animate name change
        gsap.to(coffeeName, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: function() {
                coffeeName.textContent = name;
                gsap.to(coffeeName, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'back.out'
                });
            }
        });
    }
    
    // Add order button animation and functionality
    orderBtn.addEventListener('click', function() {
        if (!currentSelection.base) {
            gsap.to(this, { 
                x: [-5, 5, -5, 5, 0], 
                duration: 0.4,
                onComplete: function() {
                    showToast('Please select a coffee base first!', 'error');
                }
            });
            return;
        }
        
        // Animation feedback for button
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            onComplete: function() {
                gsap.to(orderBtn, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(2)'
                });
            }
        });
        
        // Get the coffee name
        let orderName = coffeeName.textContent;
        
        // Celebratory cup animation
        gsap.to(cup, {
            rotation: 360,
            scale: 1.1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            onComplete: function() {
                gsap.to(cup, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.5
                });
                
                // Show success message
                showToast(`✨ Your ${orderName} is waiting for you at our counter! ✨`);
                
                // Reset selections
                resetSelections();
            }
        });
    });
    
    // Reset all selections
    function resetSelections() {
        // Clear selected classes
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Reset stored selections
        currentSelection.base = null;
        currentSelection.milk = null;
        
        // Animate reset of cup
        gsap.to(cupLiquid, {
            opacity: 0,
            height: '0%',
            duration: 0.5
        });
        
        gsap.to(cupFoam, {
            opacity: 0,
            y: -10,
            duration: 0.3
        });
        
        // Update coffee name
        gsap.to(coffeeName, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: function() {
                coffeeName.textContent = 'Select options to start';
                gsap.to(coffeeName, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
            }
        });
        
        // Stop steam
        if (window.steamInterval) {
            clearInterval(window.steamInterval);
        }
    }
    
    // Utility function to lighten colors
    function lightenColor(hex, factor) {
        // Convert hex to RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        
        // Lighten
        r = Math.min(255, r + Math.round((255 - r) * factor));
        g = Math.min(255, g + Math.round((255 - g) * factor));
        b = Math.min(255, b + Math.round((255 - b) * factor));
        
        // Convert back to hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    // Animate gallery section
    function animateGallery() {
        if (!window.gsap) return;
        
        // Animate gallery heading
        gsap.from('.gallery-heading h2', {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: '.gallery-heading',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.gallery-heading p', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
                trigger: '.gallery-heading',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate each story section
        gsap.utils.toArray('.story-row').forEach((row, i) => {
            // Animate image
            gsap.from(row.querySelector('.story-image'), {
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 1,
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            });
            
            // Animate text content
            gsap.from(row.querySelector('.story-text h3'), {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            });
            
            gsap.from(row.querySelectorAll('.story-text p'), {
                opacity: 0,
                y: 20,
                stagger: 0.2,
                duration: 0.8,
                delay: 0.4,
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            });
            
            gsap.from(row.querySelector('.story-highlight'), {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                delay: 0.6,
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Animate visit section
    function animateVisitSection() {
        if (!window.gsap) return;
        
        // Animate heading
        gsap.from('.visit-heading', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.visit-section',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.visit-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.visit-section',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate cafe image
        gsap.from('.cafe-image-container', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
                trigger: '.cafe-image-container',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate cafe tag
        gsap.from('.cafe-tag', {
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            delay: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.cafe-image-container',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate cafe info items
        gsap.utils.toArray('.cafe-info-item').forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                x: 30,
                duration: 0.8,
                delay: 0.3 + (i * 0.15),
                scrollTrigger: {
                    trigger: '.cafe-details',
                    start: 'top bottom-=50',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate button
        gsap.from('.btn-visit', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.8,
            scrollTrigger: {
                trigger: '.cafe-details',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate footer
    function animateFooter() {
        if (!window.gsap) return;
        
        // Animate footer brand
        gsap.from('.footer-brand', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.footer-section',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate footer about text
        gsap.from('.footer-about', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.footer-section',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate social icons
        gsap.from('.social-icon', {
            opacity: 0,
            scale: 0.5,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.footer-section',
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate footer headings
        gsap.utils.toArray('.footer-heading').forEach((heading, i) => {
            gsap.from(heading, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2 + (i * 0.1),
                scrollTrigger: {
                    trigger: '.footer-section',
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate footer links
        gsap.from('.footer-links li', {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.5,
            scrollTrigger: {
                trigger: '.footer-links',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate footer contact items
        gsap.from('.footer-contact li', {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.5,
            scrollTrigger: {
                trigger: '.footer-contact',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate newsletter form
        gsap.from('.footer-newsletter', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: {
                trigger: '.footer-newsletter',
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate footer bottom
        gsap.from('.footer-bottom', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.8,
            scrollTrigger: {
                trigger: '.footer-bottom',
                start: 'top bottom-=20',
                toggleActions: 'play none none none'
            }
        });
    }
});
