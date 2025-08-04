document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('aside');
    const nav = document.querySelector('.sidebar-nav');
    const main = document.getElementById('main-content');

    // Font size and theme controls
    let currentFontSize = 1;
    const minFontSize = 1;
    const maxFontSize = 3;
    const fontStep = 0.5;

    // Mobile menu toggle
    menuToggle.addEventListener('click', function () {
        sidebar.style.display = (sidebar.style.display === 'none' || sidebar.style.display === '') ? 'block' : 'none';
    });

    // Initial setup for mobile devices
    function setupForMobile() {
        sidebar.style.display = window.innerWidth <= 768 ? 'none' : 'block';
    }
    setupForMobile();
    window.addEventListener('resize', setupForMobile);

    // Mobile header hide/show on scroll
    let lastScrollY = 0;
    const header = document.querySelector('header');
    function handleScroll() {
        if (window.innerWidth <= 768) {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                header.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;
        }
    }
    window.addEventListener('scroll', handleScroll);

    // Font size controls
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');

    const savedFontSize = localStorage.getItem('fontSizeMultiplier');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        updateFontSize();
    }

    function updateFontSize() {
        document.documentElement.style.setProperty('--paragraph-font-size-multiplier', currentFontSize);
        localStorage.setItem('fontSizeMultiplier', currentFontSize.toString());
    }

    fontIncreaseBtn.addEventListener('click', function () {
        if (currentFontSize < maxFontSize) {
            currentFontSize = Math.round((currentFontSize + fontStep) * 10) / 10;
            updateFontSize();
        }
    });

    fontDecreaseBtn.addEventListener('click', function () {
        if (currentFontSize > minFontSize) {
            currentFontSize = Math.round((currentFontSize - fontStep) * 10) / 10;
            updateFontSize();
        }
    });

    // Theme controls
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
    });
    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedTheme = this.getAttribute('data-theme');
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            document.body.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('selectedTheme', selectedTheme);
        });
    });

            // 🔽 Load posts dynamically from posts.json
            fetch('posts-index.json')
             .then(res => res.json())
               .then(posts => {
            posts.forEach((post, index) => {
            // Sidebar
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${post.id}" class="section-link ${index === 0 ? 'active' : ''}">${post.title}</a>`;
            nav.appendChild(li);

            // Create placeholder section
            const section = document.createElement('section');
            section.id = post.id;
            section.className = 'content-section' + (index === 0 ? ' active' : '');
            main.appendChild(section);

            // Load and render markdown
            fetch(post.file)
                .then(res => res.text())
                .then(md => {
                section.innerHTML = marked.parse(md);
                });
            });

            // Navigation logic (same as before)
            const sectionLinks = document.querySelectorAll('.section-link');
            sectionLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                sectionLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
                if (window.innerWidth <= 768) sidebar.style.display = 'none';
                window.scrollTo(0, 0);
            });
            });
        })
        .catch(error => {
            main.innerHTML = `<p style="color:red">خطأ في تحميل المحتوى: ${error.message}</p>`;
        });
});
