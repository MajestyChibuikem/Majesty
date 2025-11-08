// Portfolio JavaScript - Minimal and Purposeful
// Following the principle of "sophisticated simplicity"

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Smooth scrolling for navigation links
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                closeMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    // Throttled scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer for subtle animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for subtle entrance animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Set initial state for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && e.target === document.body) {
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Add focus management for better accessibility
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add subtle hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .timeline-content, .expertise-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalGitHubLink = document.getElementById('modalGitHubLink');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectSlider = document.getElementById('projectSlider');
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderIndicators = document.getElementById('sliderIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    // Check if modal elements exist
    if (!modal || !modalClose || !modalOverlay) {
        console.error('Modal elements not found');
    }

    // Check if slider elements exist
    if (!projectSlider || !sliderTrack || !sliderIndicators || !prevBtn || !nextBtn) {
        console.error('Slider elements not found');
        console.log('projectSlider:', projectSlider);
        console.log('sliderTrack:', sliderTrack);
        console.log('sliderIndicators:', sliderIndicators);
        console.log('prevBtn:', prevBtn);
        console.log('nextBtn:', nextBtn);
    }
    
    // Project data
    const projectData = {
        'token-launchpad': {
            title: 'Token Launch Pad',
            image: 'img/web3/TokenlaunchPad/Screenshot 2025-09-07 at 12.44.01.png',
            description: 'Comprehensive Web3 platform for token launches with integrated DeFi features. Built with React, Solidity, and advanced smart contract architecture. Features include no-code token creation, tokenomics calculator, vesting schedules, and multi-chain deployment support.',
            tech: ['React', 'Solidity', 'Web3', 'Ethers.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Hardhat'],
            github: 'https://github.com/MajestyChibuikem/TokenLaunchpad'
        },
        'buytree': {
            title: 'BuyTree E-commerce Platform',
            image: 'img/buytree/HomePage.png',
            images: [
                {
                    src: 'img/buytree/HomePage.png',
                    alt: 'BuyTree - Home Page',
                    title: 'Home Page'
                },
                {
                    src: 'img/buytree/user-productSpecs.png',
                    alt: 'Product Details and Specifications',
                    title: 'Product Details'
                },
                {
                    src: 'img/buytree/user-checkout.png',
                    alt: 'Checkout Process',
                    title: 'Checkout'
                },
                {
                    src: 'img/buytree/user-deliveryDetails.png',
                    alt: 'Delivery Details Form',
                    title: 'Delivery Information'
                },
                {
                    src: 'img/buytree/user-paid.png',
                    alt: 'Payment Confirmation',
                    title: 'Payment Confirmation'
                },
                {
                    src: 'img/buytree/user-orders.png',
                    alt: 'Order Tracking',
                    title: 'Order Tracking'
                },
                {
                    src: 'img/buytree/Seller-dashboard.png',
                    alt: 'Seller Dashboard Overview',
                    title: 'Seller Dashboard'
                },
                {
                    src: 'img/buytree/seller-orders.png',
                    alt: 'Seller Order Management',
                    title: 'Order Management'
                },
                {
                    src: 'img/buytree/Analytics.png',
                    alt: 'Analytics Dashboard',
                    title: 'Analytics Overview'
                },
                {
                    src: 'img/buytree/Analytics-revenue.png',
                    alt: 'Revenue Analytics',
                    title: 'Revenue Tracking'
                },
                {
                    src: 'img/buytree/Analytics-topProducts.png',
                    alt: 'Top Products Analytics',
                    title: 'Top Products'
                },
                {
                    src: 'img/buytree/analytics-recentOrders.png',
                    alt: 'Recent Orders Summary',
                    title: 'Recent Orders'
                }
            ],
            description: 'Complete full-stack e-commerce platform enabling both consumer shopping and seller management capabilities. Features comprehensive product browsing with detailed specifications, secure checkout process with multiple payment options, order tracking system for customers, dedicated seller dashboard for inventory management, comprehensive analytics including revenue tracking, top products analysis, and recent orders monitoring. Built with Node.js backend, MongoDB database, and modern JavaScript frontend. Includes RESTful API architecture, secure authentication, and real-time data updates.',
            tech: ['Node.js', 'JavaScript', 'MongoDB', 'Express', 'E-commerce', 'REST API', 'Payment Integration', 'Analytics Dashboard'],
            github: 'https://github.com/MajestyChibuikem/buyTree'
        },
        'nft-marketplace': {
            title: 'NFT Marketplace',
            image: 'img/web3/nftAfia/Screenshot 2025-09-07 at 12.42.09.png',
            description: 'Full-featured NFT marketplace with minting, trading, and auction capabilities. Built with modern Web3 stack and optimized for gas efficiency. Includes IPFS integration for decentralized storage and RainbowKit for seamless wallet connections.',
            tech: ['React', 'RainbowKit', 'IPFS', 'Hardhat', 'Solidity', 'Web3', 'TypeScript'],
            github: 'https://github.com/MajestyChibuikem/nft-marketplace'
        },
        'gohub': {
            title: 'GoHub Mobile App',
            image: 'img/gohub/Screenshot_1755545838.png',
            images: [
                {
                    src: 'img/gohub/Screenshot_1755545838.png',
                    alt: 'GoHub Light Mode - Home Screen',
                    title: 'Light Mode'
                },
                {
                    src: 'img/gohub/Screenshot_1756793501.png',
                    alt: 'GoHub Dark Mode - Home Screen',
                    title: 'Dark Mode'
                },
                {
                    src: 'img/gohub/IMG_6659.png',
                    alt: 'GoHub App Screenshot',
                    title: 'App View 1'
                },
                {
                    src: 'img/gohub/IMG_6660.png',
                    alt: 'GoHub App Screenshot',
                    title: 'App View 2'
                },
                {
                    src: 'img/gohub/IMG_6661.png',
                    alt: 'GoHub App Screenshot',
                    title: 'App View 3'
                },
                {
                    src: 'img/gohub/IMG_6662.png',
                    alt: 'GoHub App Screenshot',
                    title: 'App View 4'
                }
            ],
            description: 'Cross-platform mobile application built with React Native. Features real-time data synchronization and offline capabilities for enhanced user experience. Optimized for both iOS and Android platforms with native performance. The app provides a seamless mobile experience with intuitive navigation, responsive design, and both light and dark mode themes.',
            tech: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'JavaScript', 'Mobile Development', 'Cross-platform', 'Real-time Sync', 'Theme Support'],
            github: 'https://github.com/MajestyChibuikem/Gohub'
        },
        'luxury-villa': {
            title: 'Luxury Villa Nigeria',
            image: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=1200&q=90',
            description: 'Premium hospitality marketing website for a high-end short-stay residence in Lagos, Nigeria. The site features a sophisticated, minimalist design with professional photography, trust signals, and clear call-to-action elements. Includes property showcase, amenities listing, guest reviews, and integrated booking system. Built with responsive design principles to ensure optimal viewing across all devices.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Design', 'SEO Optimization'],
            github: 'https://github.com/MajestyChibuikem/airbnb'
        },
        'ats': {
            title: 'Smart Student Analytics System (SSAS)',
            image: 'img/ats/Dashboard.png',
            images: [
                {
                    src: 'img/ats/Dashboard.png',
                    alt: 'Dashboard Overview - Real-time Analytics',
                    title: 'Dashboard Overview'
                },
                {
                    src: 'img/ats/Students.png',
                    alt: 'Students Management Interface',
                    title: 'Student Management'
                },
                {
                    src: 'img/ats/Teachers.png',
                    alt: 'Teachers Dashboard',
                    title: 'Teacher Dashboard'
                }
            ],
            description: 'Production-ready AI-powered educational analytics platform processing 20,000+ student records. Built with Django 5.1 and scikit-learn, featuring 4 ML models: Career Recommendation Engine (66.5ms), Peer Analysis System (91.8ms with 128x optimization), Anomaly Detection (17.0ms), and Performance Prediction (39.1ms). Includes 12 RESTful API endpoints with Knox authentication, custom rate limiting, multi-layer caching (75%+ hit rate), and supports 100+ concurrent users. Privacy-preserving analytics with GDPR compliance, differential privacy (ε=1.0), k-anonymity (k=10), and comprehensive audit trails. 100% test success rate with detailed API documentation and scaling guides for schools of all sizes.',
            tech: ['Django 5.1', 'Python', 'PostgreSQL', 'scikit-learn', 'Redis', 'Django REST Framework', 'Machine Learning', 'Celery', 'Privacy Engineering', 'RESTful API'],
            github: 'https://github.com/MajestyChibuikem/ATS'
        },
        'dio': {
            title: 'Dio - Developer Collaboration Platform',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=90',
            description: 'AI-powered microservices platform designed to streamline developer collaboration and code understanding. Built with Next.js frontend and Python AI backend, containerized with Docker. Integrates Weaviate vector database for context-aware codebase search. Features automatic code documentation generation, intelligent search capabilities across entire codebases, AI-powered commit summaries from repository changes, real-time meeting transcription with key topic extraction, and contextual search through past discussions. The microservice architecture enables efficient development through containerized deployment, providing teams with unified documentation and codebase insights. Licensed under MIT with active development and comprehensive setup scripts for local, Docker, and Weaviate configurations.',
            tech: ['Next.js', 'TypeScript', 'Python', 'Weaviate', 'Docker', 'Microservices', 'Vector Database', 'AI/ML', 'GitHub Integration'],
            github: 'https://github.com/MajestyChibuikem/dio'
        }
    };
    
    // Slider functionality
    let currentSlideIndex = 0;
    let totalSlides = 0;
    
    function createSlider(images) {
        // Clear existing content
        sliderTrack.innerHTML = '';
        sliderIndicators.innerHTML = '';

        totalSlides = images.length;
        currentSlideIndex = 0;

        console.log('Creating slider with images:', images.map(img => img.src));

        // Create slides immediately without waiting for preload
        // This allows images to load progressively
        images.forEach((imageData, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-slide';

            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt;
            img.loading = 'eager';

            // Add loading indicator
            img.style.backgroundColor = '#f0f0f0';
            img.style.minHeight = '300px';

            // Log when images load or fail
            img.onload = () => {
                console.log(`Image ${index + 1} loaded:`, imageData.src);
            };
            img.onerror = () => {
                console.error(`Image ${index + 1} failed to load:`, imageData.src);
                img.alt = `Failed to load: ${imageData.title}`;
            };

            slide.appendChild(img);
            sliderTrack.appendChild(slide);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = 'slider-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            sliderIndicators.appendChild(indicator);
        });

        // Update counter
        totalSlidesSpan.textContent = totalSlides;
        updateSlider();
        console.log('Slider created successfully');
    }
    
    function updateSlider() {
        const translateX = -currentSlideIndex * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = sliderIndicators.querySelectorAll('.slider-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlideIndex);
        });
        
        // Update counter
        currentSlideSpan.textContent = currentSlideIndex + 1;
        
        // Update button states
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlideIndex = index;
            updateSlider();
        }
    }
    
    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlider();
        }
    }
    
    // Open modal function
    function openModal(projectId) {
        console.log('Opening modal for project:', projectId);
        const project = projectData[projectId];
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        console.log('Project data:', project);
        console.log('Has images array:', !!project.images);
        console.log('Images array length:', project.images ? project.images.length : 0);

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalGitHubLink.href = project.github;

        // Check if project has multiple images
        if (project.images && project.images.length > 1) {
            console.log('Showing slider with', project.images.length, 'images');
            // Show slider for projects with multiple images
            modalImage.style.display = 'none';
            projectSlider.style.display = 'block';
            
            // Show loading state
            sliderTrack.innerHTML = '<div class="slider-loading">Loading images...</div>';
            sliderIndicators.innerHTML = '';
            totalSlidesSpan.textContent = '0';
            currentSlideSpan.textContent = '0';
            
            createSlider(project.images);
        } else {
            // Show single image for projects with one image
            modalImage.style.display = 'block';
            projectSlider.style.display = 'none';
            
            // Show loading state for single image
            modalImage.src = '';
            modalImage.alt = 'Loading...';
            modalImage.style.opacity = '0.5';
            
            // Preload the single image to prevent loading issues
            const img = new Image();
            img.onload = function() {
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalImage.style.opacity = '1';
            };
            img.onerror = function() {
                console.error('Failed to load project image:', project.image);
                modalImage.src = project.image; // Still try to set it
                modalImage.alt = project.title;
                modalImage.style.opacity = '1';
            };
            img.src = project.image;
        }
        
        // Clear and populate tech badges
        modalTech.innerHTML = '';
        project.tech.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'tech-badge';
            badge.textContent = tech;
            modalTech.appendChild(badge);
        });
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus management for accessibility
        modalClose.focus();
        console.log('Modal opened successfully');
    }
    
    // Close modal function
    function closeModal() {
        console.log('Closing modal');
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset modal display states
        modalImage.style.display = 'block';
        projectSlider.style.display = 'none';
        
        // Return focus to the button that opened the modal
        const activeButton = document.querySelector('.view-project-btn:focus');
        if (activeButton) {
            activeButton.focus();
        }
        console.log('Modal closed successfully');
    }
    
    // Event listeners for modal
    document.addEventListener('click', function(e) {
        // Open modal when clicking "View Project" buttons
        if (e.target.classList.contains('view-project-btn')) {
            e.preventDefault();
            const projectId = e.target.getAttribute('data-project');
            openModal(projectId);
        }
        
        // Close modal when clicking close button or overlay
        if (e.target === modalClose || e.target === modalOverlay) {
            closeModal();
        }
        
        // Slider navigation - check if click is on or within the buttons
        // Check if the clicked element or any parent is the next/prev button
        const nextButton = e.target.closest('.next-btn');
        const prevButton = e.target.closest('.prev-btn');

        if (nextButton) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            nextSlide();
            return;
        }

        if (prevButton) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button clicked');
            prevSlide();
            return;
        }
    });
    
    // Direct event listener for close button
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    // Direct event listener for overlay
    modalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    // Direct event listeners for slider buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button clicked directly');
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked directly');
            nextSlide();
        });
    }
    
    // Close modal with Escape key and keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
        
        // Slider keyboard navigation
        if (modal.classList.contains('active') && projectSlider.style.display !== 'none') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Prevent modal from closing when clicking inside modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Console message for developers
    console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cThis portfolio was built with attention to detail and performance in mind.', 'color: #6c757d; font-size: 12px;');
    console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #6c757d; font-size: 12px;');
    
    // Initialize random flash animation for tech logos
    initializeRandomFlash();
    
    // Initialize counter animation for stats
    initializeCounterAnimation();
});

// Utility function for smooth scrolling (used by navigation)
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Random flash animation for tech logos
function initializeRandomFlash() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        const logoOverlay = tag.querySelector('.tech-logo-overlay');
        
        if (logoOverlay) {
            // Random delay between 0.5-3 seconds for each logo
            const randomDelay = Math.random() * 2500 + 500;
            
            // Start the random flash cycle
            setTimeout(() => {
                startRandomFlash(logoOverlay);
            }, randomDelay + (index * 200)); // Stagger initial start times
        }
    });
}

function startRandomFlash(logoOverlay) {
    // Add flash class to trigger animation
    logoOverlay.classList.add('flash');
    
    // Remove flash class after animation completes
    setTimeout(() => {
        logoOverlay.classList.remove('flash');
    }, 1500);
    
    // Schedule next flash with random interval (3-8 seconds)
    const nextFlashDelay = Math.random() * 5000 + 3000;
    setTimeout(() => {
        startRandomFlash(logoOverlay);
    }, nextFlashDelay);
}

// Counter animation for stats
function initializeCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            hasAnimated = true;
            
            statNumbers.forEach((statNumber, index) => {
                const target = parseInt(statNumber.getAttribute('data-target'));
                const suffix = statNumber.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                // Stagger the start of each counter
                setTimeout(() => {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(current) + suffix;
                    }, 16);
                }, index * 200); // 200ms delay between each counter
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateCounters);
    
    // Check on page load in case section is already visible
    animateCounters();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scrollToSection };
}
