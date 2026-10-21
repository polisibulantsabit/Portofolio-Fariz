/* ===================================
   PORTFOLIO - MAIN JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // PRELOADER
    // ===================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
            initAnimations();
        }, 1800);
    });

    // Fallback: hide preloader after 3s max
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = 'auto';
    }, 3000);

    // ===================================
    // NAVBAR
    // ===================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll behavior
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
        toggleBackToTop();
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Active nav on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===================================
    // TYPING EFFECT
    // ===================================
    const typedName = document.getElementById('typedName');
    const typedSubtitle = document.getElementById('typedSubtitle');

    const titles = [
        'Fariz Al Fachrezi',
        'Murid SMKAKNB',
        'anak PPLG',
        'CIHUYY'
    ];

    const subtitles = [
        'Anak mbun',
        'sekolah BAGUS tuh',
        'PPLG nih boss',
        'cihuyyyyy'
    ];

    function typeWriter(element, texts, delay = 100, pause = 2000) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 50 : delay;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pause;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 300;
            }

            setTimeout(type, speed);
        }

        type();
    }

    setTimeout(() => {
        typeWriter(typedName, titles, 80, 2500);
        typeWriter(typedSubtitle, subtitles, 60, 3000);
    }, 2000);

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ===================================
    // SCROLL REVEAL ANIMATION
    // ===================================
    function initAnimations() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-grid, .service-card, .portfolio-card, ' +
            '.process-step, .contact-grid'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal', 'visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Counter observer
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(statsSection);
                }
            }, { threshold: 0.5 });
            counterObserver.observe(statsSection);
        }
    }

    // ===================================
    // PORTFOLIO FILTER
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===================================
    // CONTACT FORM
    // ===================================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const service = formData.get('service');
        const budget = formData.get('budget');
        const message = formData.get('message');

        // Build WhatsApp message
        let waMessage = `Halo Sibujang! 👋\n\n`;
        waMessage += `Saya *${name}* ingin berkonsultasi.\n\n`;
        if (service) waMessage += `📋 *Layanan:* ${service}\n`;
        if (budget) waMessage += `💰 *Budget:* ${budget}\n`;
        if (subject) waMessage += `📝 *Subjek:* ${subject}\n`;
        waMessage += `\n💬 *Pesan:*\n${message}\n\n`;
        waMessage += `📧 Email: ${email}`;

        const waUrl = `https://wa.me/6289516245487?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');

        // Show success feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        btn.style.background = '#ffffff';
        btn.disabled = true;

        const finishFeedback = (label, background) => {
            btn.innerHTML = label;
            btn.style.background = background;
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        };

        const payload = { name, email, subject, service, budget, message };
        const save = typeof window.saveContact === 'function' ? window.saveContact(payload) : Promise.resolve('skipped');
        Promise.resolve(save).then((result) => {
            if (result === 'error') {
                finishFeedback('<i class="fas fa-exclamation-triangle"></i> Gagal simpan data!', '#e74c3c');
            } else {
                finishFeedback('<i class="fas fa-check"></i> Pesan Terkirim!', '#ffffff');
            }
        }).catch(() => {
            finishFeedback('<i class="fas fa-check"></i> Pesan Terkirim!', '#ffffff');
        });
    });

    // ===================================
    // BACK TO TOP
    // ===================================
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const position = target.offsetTop - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ===================================
    // PORTFOLIO MODAL
    // ===================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');

    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-btn')) return;

            const title = card.querySelector('.portfolio-title').textContent;
            const desc = card.querySelector('.portfolio-desc').textContent;
            const tags = card.querySelector('.portfolio-tags').innerHTML;
            const placeholder = card.querySelector('.portfolio-placeholder').innerHTML;

            modalContent.innerHTML = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="width: 100%; height: 200px; background: var(--gradient-placeholder); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 4rem; color: rgba(255,255,255,0.8);">
                        ${placeholder}
                    </div>
                </div>
                <div class="portfolio-tags" style="margin-bottom: 16px;">${tags}</div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px;">${title}</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">${desc}</p>
                <div style="display: flex; gap: 12px;">
                    <a href="#" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="#" class="btn btn-outline btn-sm"><i class="fab fa-github"></i> Source Code</a>
                </div>
            `;

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===================================
    // WHATSAPP FLOAT - SHOW ON SCROLL
    // ===================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    window.addEventListener('scroll', () => {
        whatsappFloat.style.display = window.scrollY > 300 ? 'flex' : 'flex';
    });

    // ===================================
    // PARALLAX EFFECT ON HERO
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // KEYBOARD NAVIGATION
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // ===================================
    // PERFORMANCE: Throttle scroll events
    // ===================================
    let scrollThrottle;
    window.addEventListener('scroll', () => {
        if (!scrollThrottle) {
            scrollThrottle = setTimeout(() => {
                scrollThrottle = null;
            }, 100);
        }
    }, { passive: true });

    // ===================================
    // INITIALIZE
    // ===================================
    console.log('%c🚀 Portfolio by Sibujang Ngoding', 'color: #ffffff; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #d6d6d6; font-size: 12px;');
});