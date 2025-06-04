document.addEventListener('DOMContentLoaded', function() {
    // Get all section links
    const sectionLinks = document.querySelectorAll('.section-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('aside');
    
    // Font size and theme controls
    let currentFontSize = 1;
    const minFontSize = 1;
    const maxFontSize = 3;
    const fontStep = 0.5;
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    });
    
    // Add click event to each link
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            sectionLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to clicked link and target section
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Hide menu on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.style.display = 'none';
            }
            
            // Scroll to top of content on mobile
            window.scrollTo(0, 0);
        });
    });
    
    // Initial setup for mobile devices
    function setupForMobile() {
        if (window.innerWidth <= 768) {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'block';
        }
    }
    
    // Run setup on load and window resize
    setupForMobile();
    window.addEventListener('resize', setupForMobile);
    
    // Mobile header hide/show on scroll
    let lastScrollY = 0;
    const header = document.querySelector('header');
    
    function handleScroll() {
        if (window.innerWidth <= 768) {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                header.classList.add('hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                // Scrolling up or near top - show header
                header.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Font size controls
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    
    // Load saved font size
    const savedFontSize = localStorage.getItem('fontSizeMultiplier');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        updateFontSize();
    }
    
    function updateFontSize() {
        document.documentElement.style.setProperty('--paragraph-font-size-multiplier', currentFontSize);
        localStorage.setItem('fontSizeMultiplier', currentFontSize.toString());
    }
    
    fontIncreaseBtn.addEventListener('click', function() {
        if (currentFontSize < maxFontSize) {
            currentFontSize = Math.round((currentFontSize + fontStep) * 10) / 10;
            updateFontSize();
        }
    });
    
    fontDecreaseBtn.addEventListener('click', function() {
        if (currentFontSize > minFontSize) {
            currentFontSize = Math.round((currentFontSize - fontStep) * 10) / 10;
            updateFontSize();
        }
    });
    
    // Theme controls
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update active theme button
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
    });
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            
            // Remove active class from all theme buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply theme to body
            document.body.setAttribute('data-theme', selectedTheme);
            
            // Save theme preference
            localStorage.setItem('selectedTheme', selectedTheme);
        });
    });
});
