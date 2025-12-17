// ============================================
// IRON MAN - Interactive JavaScript Features
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. ANIMACIÓN DEL HEADER ==========
    const header = document.getElementById('header');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        header.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);

    
    // ========== 2. EFECTO PARALLAX EN SCROLL ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
        header.style.opacity = 1 - (scrolled / 500);
    });

    
    // ========== 3. CONTADOR DE PALABRAS EN CADA SECCIÓN ==========
    const sections = document.querySelectorAll('.flex-container > div');
    sections.forEach((section, index) => {
        const text = section.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        
        // Crear badge con contador
        const badge = document.createElement('span');
        badge.className = 'word-counter';
        badge.textContent = `${wordCount} palabras`;
        badge.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 215, 0, 0.2);
            color: #FFD700;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 215, 0, 0.3);
        `;
        section.style.position = 'relative';
        section.appendChild(badge);
    });

    
    // ========== 4. MODO OSCURO / CLARO ==========
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '🌙';
    toggleButton.className = 'theme-toggle';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #FFD700, #FF4500);
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: transform 0.3s ease;
    `;
    
    toggleButton.addEventListener('mouseenter', () => {
        toggleButton.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    toggleButton.addEventListener('mouseleave', () => {
        toggleButton.style.transform = 'scale(1) rotate(0deg)';
    });
    
    let isDark = true;
    toggleButton.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
            toggleButton.innerHTML = '🌙';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
            document.body.style.color = '#333';
            toggleButton.innerHTML = '☀️';
        }
    });
    
    document.body.appendChild(toggleButton);

    
    // ========== 5. ANIMACIÓN DE APARICIÓN AL HACER SCROLL ==========
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-50px)';
        observer.observe(section);
    });
    
    // Agregar keyframes para slideIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    
    // ========== 6. EFECTO DE PARTÍCULAS EN EL CURSOR ==========
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: particleFade 1s ease forwards;
                z-index: 9999;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    });
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFade {
            to {
                opacity: 0;
                transform: translateY(-50px) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    
    // ========== 7. BOTÓN "VOLVER ARRIBA" ==========
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #8B0000, #FF4500);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
    `;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'all';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollTopBtn);

    
    // ========== 8. EFECTO DE BRILLO EN CARDS AL HOVER ==========
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = `
                0 15px 40px rgba(255, 69, 0, 0.6),
                0 0 30px rgba(255, 215, 0, 0.5)
            `;
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
        });
    });

    
    // ========== 9. RESALTAR ENLACES ACTIVOS EN NAVBAR ==========
    const navLinks = document.querySelectorAll('.navBar a');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('webLayout') && link.textContent === 'Pagina 1')) {
            link.style.background = 'rgba(255, 69, 0, 0.8)';
            link.style.borderColor = '#FFD700';
        }
    });

    
    // ========== 10. MENSAJE DE BIENVENIDA ==========
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #FFD700;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            z-index: 10000;
            border: 2px solid #FFD700;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            animation: fadeInOut 3s ease forwards;
        `;
        welcome.innerHTML = '¡Bienvenido al mundo de IRON MAN! 🦾';
        
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
        `;
        document.head.appendChild(fadeStyle);
        document.body.appendChild(welcome);
        
        setTimeout(() => welcome.remove(), 3000);
    }, 500);

    
    // ========== 11. EFECTO DE LECTURA PROGRESIVA ==========
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #FFD700, #FF4500);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    
    console.log('🦾 Iron Man JavaScript loaded successfully!');
});







