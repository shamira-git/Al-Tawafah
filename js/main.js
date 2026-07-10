document.addEventListener('DOMContentLoaded', () => {
  // Pre-render social/brand icons to avoid Lucide core warnings
  const brandIcons = {
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`
  };

  Object.keys(brandIcons).forEach(iconName => {
    const elements = document.querySelectorAll(`[data-lucide="${iconName}"]`);
    elements.forEach(el => {
      const parent = el.parentElement;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = brandIcons[iconName];
      const svg = tempDiv.firstChild;
      
      // Copy over styles & classes
      if (el.className) svg.setAttribute('class', el.className + ' lucide lucide-' + iconName);
      if (el.getAttribute('style')) {
        svg.setAttribute('style', el.getAttribute('style'));
      }
      
      parent.replaceChild(svg, el);
    });
  });

  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // STICKY HEADER & BACK-TO-TOP BUTTON
  // ==========================================
  const header = document.querySelector('.header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Header Sticky styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // LIGHT / DARK THEME TOGGLER
  // ==========================================
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    // Check local storage for preference, default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ==========================================
  // MOBILE MENU DRAWER
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent scrolling behind drawer
    if (drawer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close drawer when link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ==========================================
  // INTERSECTION OBSERVER (SCROLL ANIMATIONS)
  // ==========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(faqHeader => {
    faqHeader.addEventListener('click', () => {
      const faqItem = faqHeader.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      
      // Close other open FAQ items (optional accordian behavior)
      const siblingItems = faqItem.parentElement.querySelectorAll('.faq-item');
      siblingItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      faqItem.classList.toggle('active');

      if (faqItem.classList.contains('active')) {
        faqBody.style.maxHeight = faqBody.scrollHeight + "px";
      } else {
        faqBody.style.maxHeight = null;
      }
    });
  });

  // ==========================================
  // TESTIMONIALS SLIDER
  // ==========================================
  const track = document.querySelector('.testimonial-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const nextButton = document.querySelector('.slider-btn-next');
  const prevButton = document.querySelector('.slider-btn-prev');
  const dotContainer = document.querySelector('.slider-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let autoPlayTimer;

    // Create Navigation Indicator Dots
    slides.forEach((slide, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(index));
      dotContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.slider-dot'));

    function updateDots(index) {
      dots.forEach((dot, dIdx) => {
        if (dIdx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function moveToSlide(index) {
      // Loop wrapping
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Update Slider active states and positioning
      slides.forEach((slide, sIdx) => {
        if (sIdx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots(index);
      resetAutoPlay();
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
      });
    }

    function startAutoPlay() {
      autoPlayTimer = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, 6000); // Rotate every 6 seconds
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    // Initialize slider position
    moveToSlide(0);
    startAutoPlay();
  }

  // ==========================================
  // GALLERY PORTFOLIO FILTERING
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle Active Class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.85)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ==========================================
  // CONTACT & CAREERS FORM VALIDATION
  // ==========================================
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;

      const inputs = form.querySelectorAll('[required]');
      
      inputs.forEach(input => {
        const errorMsg = input.nextElementSibling;
        const value = input.value.trim();

        // Check if value is empty
        if (!value) {
          setFieldInvalid(input, errorMsg, 'This field is required.');
          isFormValid = false;
        } else {
          // Additional field-specific validation
          if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              setFieldInvalid(input, errorMsg, 'Please enter a valid email address.');
              isFormValid = false;
            } else {
              setFieldValid(input, errorMsg);
            }
          } else if (input.type === 'tel') {
            const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
            if (!phoneRegex.test(value)) {
              setFieldInvalid(input, errorMsg, 'Please enter a valid phone number.');
              isFormValid = false;
            } else {
              setFieldValid(input, errorMsg);
            }
          } else {
            setFieldValid(input, errorMsg);
          }
        }
      });

      if (isFormValid) {
        // Success behavior
        const successBanner = form.querySelector('.submit-success');
        if (successBanner) {
          successBanner.style.display = 'block';
          form.reset();
          // Hide success message after 5 seconds
          setTimeout(() => {
            successBanner.style.display = 'none';
          }, 5000);
        } else {
          alert('Thank you! Your submission was successful.');
          form.reset();
        }
      }
    });

    // Real-time error removal on input focus or change
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('input', () => {
        const errorMsg = input.nextElementSibling;
        if (input.value.trim()) {
          setFieldValid(input, errorMsg);
        }
      });
    });
  });

  function setFieldInvalid(input, errorElement, message) {
    input.classList.add('invalid');
    if (errorElement && errorElement.classList.contains('validation-error')) {
      errorElement.innerText = message;
      errorElement.style.display = 'block';
    }
  }

  function setFieldValid(input, errorElement) {
    input.classList.remove('invalid');
    if (errorElement && errorElement.classList.contains('validation-error')) {
      errorElement.style.display = 'none';
    }
  }

  // ==========================================
  // WHATSAPP CHAT WIDGET
  // ==========================================
  const waFab     = document.getElementById('waFab');
  const waPopup   = document.getElementById('waPopup');
  const waClose   = document.getElementById('waCloseBtn');
  const waBadge   = document.getElementById('waBadge');

  function openWaPopup() {
    waPopup.classList.add('is-open');
    waFab.classList.add('is-open');
    waFab.setAttribute('aria-expanded', 'true');
    // Hide badge once opened
    if (waBadge) waBadge.classList.add('hidden');
  }

  function closeWaPopup() {
    waPopup.classList.remove('is-open');
    waFab.classList.remove('is-open');
    waFab.setAttribute('aria-expanded', 'false');
  }

  function toggleWaPopup() {
    if (waPopup.classList.contains('is-open')) {
      closeWaPopup();
    } else {
      openWaPopup();
    }
  }

  if (waFab) {
    waFab.addEventListener('click', toggleWaPopup);
  }

  if (waClose) {
    waClose.addEventListener('click', closeWaPopup);
  }

  // Auto-open popup after 4 seconds to draw attention (once per session)
  if (waFab && !sessionStorage.getItem('waAutoShown')) {
    setTimeout(() => {
      openWaPopup();
      sessionStorage.setItem('waAutoShown', '1');
    }, 4000);
  }
});
