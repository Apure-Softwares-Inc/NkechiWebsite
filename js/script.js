// Harmburger Menu
function toggleMenu() {
    const navbarCollapse = document.getElementById("navbarNav");
    navbarCollapse.classList.toggle("open");
}



// Hero Section Animation
// Animation Configuration
const animationConfigs = {
    home: {
        element: document.querySelector("#welcome-section .animated-text"),
        cursor: document.querySelector("#welcome-section .cursor"),
        texts: [
            "a senior product designer",
            "a software engineer",
            "a tech startup co-founder",
            "a user researcher",
            "a lead scientist",
            "an assistant professor",
            "a Ph.D. nerd",
            "an anime fan",
            "a senior product designer"
        ],
        // Track animation state
        state: {
            index: 0,
            charIndex: 0,
            isDeleting: false,
            isCompleted: false, // Track if the animation is done
            timeoutId: null
        }
    },
    services: {
        element: document.querySelector("#serv-section .animated-text"),
        cursor: document.querySelector("#serv-section .cursor"),
        texts: [
            'I turn "what if?" into "what\'s next."',
            'I design for humans, not screens.',
            'I bridge the gap between dreams and downloads.',
            'I obsess over details so your users don\'t have to.',
            'I speak both gamer and geek.',
            'I code with one hand and sketch with the other.'
        ],
        // Track animation state
        state: {
            index: 0,
            charIndex: 0,
            isDeleting: false,
            isCompleted: false,
            timeoutId: null
        }
    }
};

function createTypeEffect(config) {
    // Clear any existing timeout to prevent multiple animations running
    if (config.state.timeoutId) {
        clearTimeout(config.state.timeoutId);
    }

    function type() {
        const currentText = config.texts[config.state.index];

        if (config.state.isDeleting) {
            config.state.charIndex--;
        } else {
            config.state.charIndex++;
        }

        config.element.innerText = currentText.substring(0, config.state.charIndex);

        if (!config.state.isDeleting && config.state.charIndex === currentText.length) {
            config.state.timeoutId = setTimeout(() => {
                config.state.isDeleting = true;
                type();
            }, 1000); // Pause before deleting
            return;
        } else if (config.state.isDeleting && config.state.charIndex === 0) {
            config.state.isDeleting = false;
            config.state.index++;

            if (config.state.index === config.texts.length) {
                config.state.isCompleted = true;
                config.element.innerText = config.texts[config.texts.length - 1];
                if (config.cursor) config.cursor.style.display = "none";
                return;
            }
        }

        config.state.timeoutId = setTimeout(type, config.state.isDeleting ? 50 : 100);
    }

    // Reset animation state
    config.state.index = 0;
    config.state.charIndex = 0;
    config.state.isDeleting = false;
    config.state.isCompleted = false;
    if (config.cursor) config.cursor.style.display = "inline";
    
    // Start new animation
    type();
}

// Initialize animations for all configured sections
function initAnimations() {
    Object.values(animationConfigs).forEach(config => {
        if (config.element) {
            createTypeEffect(config);
        }
    });
}

// Start animations when page loads
window.onload = initAnimations;

// Restart animations when scrolling to top
let lastScrollPosition = window.scrollY;
const scrollThreshold = 50; // How far down before considering it a "scroll down"

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;
    
    // If we've scrolled back up near the top after scrolling down
    if (currentScrollPosition < 50 && lastScrollPosition > scrollThreshold) {
        initAnimations(); // Restart all animations
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Optional: Also restart when page becomes visible again
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        initAnimations();
    }
});



// Project button Animation

// Function to handle tab switching

function openTab(tabName) {
    // Hide all tab content
    const tabContents = document.querySelectorAll(".tabcontent");
    tabContents.forEach((tab) => (tab.style.display = "none"));

    // Remove the "active" class from all buttons
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach((button) => button.classList.remove("active"));
  
    // Show the selected tab content
    document.getElementById(tabName).style.display = "block";

    // Add the "active" class to the clicked button
    const activeButton = document.querySelector(`[onclick="openTab('${tabName}')"]`);
    activeButton.classList.add("active");
}
  
// Show the first tab by default
document.addEventListener("DOMContentLoaded", () => {
    openTab("tab1");
});



// Apure Cube Animation
document.addEventListener('DOMContentLoaded', function() {
    // Fade in the cube elements
    const luxuryBg = document.querySelector('.luxury-bg');
    const cubeContainer = document.querySelector('.cube-container');
    const cube = document.querySelector('.cube');
    
    luxuryBg.style.opacity = '1';
    cubeContainer.style.opacity = '1';

    let currentStep = 0;
    const rotationValues = [
        'rotateY(360deg)',   // Horizontal clockwise
        'rotateY(0deg)',     // Horizontal anti-clockwise
        'rotateX(360deg)',   // Vertical down
        'rotateX(0deg)'      // Vertical up
    ];

    function applyRotation() {
        cube.style.transform = rotationValues[currentStep % 4];
        currentStep++;
    }

    cube.addEventListener('transitionend', function(event) {
        if (event.propertyName === 'transform') {
            applyRotation();
        }
    });

    // Start the rotation sequence
    setTimeout(applyRotation, 100);
});