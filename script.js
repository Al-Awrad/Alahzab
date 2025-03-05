document.addEventListener('DOMContentLoaded', function() {
    // Get all section links
    const sectionLinks = document.querySelectorAll('.section-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('aside');
    
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
});