document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BOOT SEQUENCE (Bios Style Loader)
    const logContainer = document.getElementById('boot-log');
    const bootScreen = document.querySelector('.boot-screen');
    const bootBar = document.querySelector('.boot-bar');
    
    const logs = [
        { msg: "BIOS CHECK ................. OK", type: "log-success" },
        { msg: "LOADING KERNEL MODULES ..... OK", type: "log-success" },
        { msg: "BYPASSING SECURITY ......... OK", type: "log-warn" },
        { msg: "CONNECTING TO CLOUD ........ OK", type: "log-success" },
        { msg: "INITIALIZING RINO GUI ......", type: "log-success" }
    ];

    let delay = 0;
    logs.forEach((log, index) => {
        delay += Math.random() * 300 + 200;
        setTimeout(() => {
            const p = document.createElement('p');
            p.innerText = log.msg;
            p.classList.add(log.type);
            logContainer.prepend(p);
            
            // Progress Bar
            let percent = ((index + 1) / logs.length) * 100;
            bootBar.style.width = `${percent}%`;

            if(index === logs.length - 1) {
                setTimeout(() => {
                    bootScreen.style.opacity = '0';
                    setTimeout(() => bootScreen.remove(), 500);
                }, 800);
            }
        }, delay);
    });

    // 2. CURSOR SYSTEM
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;
        cursorCircle.style.left = `${x}px`;
        cursorCircle.style.top = `${y}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .cw-toggle, .p-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // 3. MATRIX RAIN EFFECT
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(2, 2, 2, 0.05)"; // Fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ff003c"; // Red Text
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }
    drawMatrix();

    // 4. INTERACTIVE CHEAT MENU
    const tabs = document.querySelectorAll('.cw-tab');
    const contents = document.querySelectorAll('.cw-content');
    const toggles = document.querySelectorAll('.cw-toggle');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('checked');
        });
    });

    // 5. NUMBER COUNTERS (Scroll Triggered)
    const stats = document.querySelectorAll('.counter');
    const observerOptions = { threshold: 0.5 };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const updateCount = () => {
                    const count = +entry.target.innerText;
                    const inc = target / 100;
                    if(count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Live User Fluctuation
    const liveCount = document.getElementById('live-users');
    setInterval(() => {
        let current = parseInt(liveCount.innerText);
        let change = Math.floor(Math.random() * 7) - 3;
        liveCount.innerText = current + change;
    }, 3000);

    // 6. FAKE SALES NOTIFICATION
    const salesPopup = document.getElementById('sales-notification');
    const salesUser = salesPopup.querySelector('.sales-user');
    const salesPlan = salesPopup.querySelector('.sales-plan');
    
    const fakeNames = Array.from({ length: 50 }, () => `Anonym${Math.floor(Math.random() * 900) + 100}`);
    const plans = ["Day Pass", "Month Key", "Lifetime Key"];

    function triggerSale() {
        const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        const plan = plans[Math.floor(Math.random() * plans.length)];
        
        salesUser.innerText = name;
        salesPlan.innerText = plan;
        
        salesPopup.classList.remove('hidden');
        
        setTimeout(() => {
            salesPopup.classList.add('hidden');
        }, 4000); // Show for 4s

        // Schedule next popup (random 10-20s)
        setTimeout(triggerSale, Math.random() * 10000 + 10000);
    }
    // Start after 5s
    setTimeout(triggerSale, 5000);

    // 7. PRICING SWITCHER
    const billingSwitch = document.getElementById('billing-switch');
    const amounts = document.querySelectorAll('.amount');
    const durations = document.querySelectorAll('.duration');

    billingSwitch.addEventListener('change', () => {
        const isLifetime = billingSwitch.checked;
        amounts.forEach(el => {
            el.innerText = isLifetime ? el.dataset.lifetime : el.dataset.monthly;
        });
        durations.forEach(el => {
            el.innerText = isLifetime ? el.dataset.lifetime : el.dataset.monthly;
        });
    });

    // 8. SCROLL REVEAL
    const revealElements = document.querySelectorAll('.scroll-reveal');
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    });

    // 9. NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 10. MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        // Add more logic here for proper mobile menu animation if desired
    });
});