// Portfolio JavaScript - Minimal and Purposeful
// Following the principle of "sophisticated simplicity"

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
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
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
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
        return;
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
        'dao-governance': {
            title: 'DAO Governance System',
            image: 'img/web3/DaoGovernance/Screenshot 2025-09-07 at 12.39.44.png',
            description: 'Decentralized governance platform enabling community-driven decision making. Features voting mechanisms, proposal management, and transparent execution. Built with modern Web3 stack for secure and efficient governance processes.',
            tech: ['Next.js', 'Wagmi', 'OpenZeppelin', 'TypeScript', 'React', 'Web3', 'Solidity'],
            github: 'https://github.com/MajestyChibuikem/DAOGovernanceTool'
        },
        'nft-marketplace': {
            title: 'NFT Marketplace',
            image: 'img/web3/nftAfia/Screenshot 2025-09-07 at 12.42.09.png',
            description: 'Full-featured NFT marketplace with minting, trading, and auction capabilities. Built with modern Web3 stack and optimized for gas efficiency. Includes IPFS integration for decentralized storage and RainbowKit for seamless wallet connections.',
            tech: ['React', 'RainbowKit', 'IPFS', 'Hardhat', 'Solidity', 'Web3', 'TypeScript'],
            github: '#'
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
                }
            ],
            description: 'Cross-platform mobile application built with React Native. Features real-time data synchronization and offline capabilities for enhanced user experience. Optimized for both iOS and Android platforms with native performance. The app provides a seamless mobile experience with intuitive navigation, responsive design, and both light and dark mode themes.',
            tech: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'JavaScript', 'Mobile Development', 'Cross-platform', 'Real-time Sync', 'Theme Support'],
            github: 'https://github.com/MajestyChibuikem/Gohub'
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
        
        // Preload images to prevent flickering
        const imagePromises = images.map(imageData => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load image: ${imageData.src}`));
                img.src = imageData.src;
            });
        });
        
        // Wait for all images to load before creating slider
        Promise.all(imagePromises)
            .then(() => {
                // Create slides after images are loaded
                images.forEach((imageData, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'slider-slide';
                    
                    const img = document.createElement('img');
                    img.src = imageData.src;
                    img.alt = imageData.alt;
                    img.loading = 'eager'; // Change to eager for better loading
                    
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
            })
            .catch(error => {
                console.error('Error loading slider images:', error);
                // Fallback: create slider even if some images fail to load
                createSliderFallback(images);
            });
    }
    
    function createSliderFallback(images) {
        // Fallback method that doesn't wait for image loading
        images.forEach((imageData, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-slide';
            
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt;
            img.loading = 'eager';
            
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
        
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalGitHubLink.href = project.github;
        
        // Check if project has multiple images
        if (project.images && project.images.length > 1) {
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
        
        // Slider navigation
        if (e.target === nextBtn || e.target.closest('.next-btn')) {
            e.preventDefault();
            nextSlide();
        }
        
        if (e.target === prevBtn || e.target.closest('.prev-btn')) {
            e.preventDefault();
            prevSlide();
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
