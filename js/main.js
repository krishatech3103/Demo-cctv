/* ==========================================================================
   SECUREVISION CCTV & SECURITY SOLUTIONS - INTERACTIVE SALES DEMO ENGINE
   Operated & Developed by Krisha Tech (krishatech.in)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. PRELOADER & SYSTEM INITIALIZATION
  // ------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.querySelector('.preloader-bar');
  const preloaderStatus = document.querySelector('.preloader-status');

  const statusLogs = [
    'Initializing Security Core...',
    'Scanning Camera Network...',
    'Connecting AI Analytics Engine...',
    'Verifying Encryption Protocols...',
    'System Ready. Launching...'
  ];

  let progress = 0;
  let logIndex = 0;

  const preloaderInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 12;
    if (progress > 100) progress = 100;

    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    
    if (logIndex < statusLogs.length && progress >= (logIndex + 1) * 20) {
      if (preloaderStatus) preloaderStatus.textContent = statusLogs[logIndex];
      logIndex++;
    }

    if (progress === 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
      }, 400);
    }
  }, 100);

  // ------------------------------------------------------------------------
  // 2. THEME TOGGLER (DEFAULT LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('smartview-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = savedTheme === 'light' ? 'ri-moon-clear-line' : 'ri-sun-line';
    }

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('smartview-theme', newTheme);
      
      if (icon) {
        icon.className = newTheme === 'light' ? 'ri-moon-clear-line' : 'ri-sun-line';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. STICKY HEADER & MOBILE DRAWER MENU
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  const topDemoBar = document.querySelector('.top-demo-bar');

  function handleHeaderScroll() {
    const topBarHeight = topDemoBar ? topDemoBar.offsetHeight : 35;
    if (window.scrollY > topBarHeight) {
      header.classList.add('scrolled', 'header-fixed');
    } else {
      header.classList.remove('scrolled', 'header-fixed');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  window.addEventListener('resize', handleHeaderScroll);
  handleHeaderScroll();

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mobileDrawer.classList.contains('active') ? 'ri-close-line' : 'ri-menu-3-line';
      }
    });

    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-3-line';
      });
    });
  }

  // Active Navigation Link Highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. 3D TILT EFFECT FOR CARDS (DISABLED ON TOUCH/MOBILE)
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.service-card, .stat-card, .hero-card-frame');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ------------------------------------------------------------------------
  // 5. LIVE CCTV SIMULATOR ENGINE
  // ------------------------------------------------------------------------
  const simViewport = document.getElementById('sim-viewport');
  const simFeedBtns = document.querySelectorAll('.sim-feed-btn');
  const simModeBtns = document.querySelectorAll('.mode-btn');
  const simTimestamp = document.getElementById('sim-timestamp');
  const simCamName = document.getElementById('sim-cam-name');
  const simAiBox = document.getElementById('sim-ai-box');

  const feeds = {
    cam1: {
      name: 'CAM 01 - MAIN ENTRANCE [4K UHD]',
      bg: 'url("https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop")',
      aiTop: '35%', aiLeft: '45%', label: 'TARGET: HUMAN [99.8%]'
    },
    cam2: {
      name: 'CAM 02 - WAREHOUSE VAULT [1080P]',
      bg: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop")',
      aiTop: '40%', aiLeft: '25%', label: 'TARGET: VEHICLE [98.4%]'
    },
    cam3: {
      name: 'CAM 03 - CASH COUNTER AI [4K HUD]',
      bg: 'url("https://images.unsplash.com/photo-1556742049-0a67daf4095a?q=80&w=1200&auto=format&fit=crop")',
      aiTop: '50%', aiLeft: '60%', label: 'TARGET: CASH DISPENSER'
    },
    cam4: {
      name: 'CAM 04 - PERIMETER FENCE [NIGHT VISION]',
      bg: 'url("https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=1200&auto=format&fit=crop")',
      aiTop: '20%', aiLeft: '30%', label: 'TARGET: MOTION DETECTED'
    }
  };

  // Live HUD Clock Updater
  function updateSimClock() {
    if (!simTimestamp) return;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    simTimestamp.textContent = `${dateStr} ${timeStr}`;
  }
  setInterval(updateSimClock, 1000);
  updateSimClock();

  // Feed Switcher
  simFeedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simFeedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const feedKey = btn.dataset.feed;
      const feedData = feeds[feedKey];

      if (feedData && simViewport) {
        const screenContent = simViewport.querySelector('.sim-screen-content');
        if (screenContent) screenContent.style.backgroundImage = feedData.bg;
        if (simCamName) simCamName.textContent = feedData.name;
        if (simAiBox) {
          simAiBox.style.top = feedData.aiTop;
          simAiBox.style.left = feedData.aiLeft;
          const labelEl = simAiBox.querySelector('.sim-ai-label');
          if (labelEl) labelEl.textContent = feedData.label;
        }
      }
    });
  });

  // Mode Switcher (Normal, Night Vision, Thermal)
  simModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.mode;
      if (simViewport) {
        simViewport.className = 'sim-viewport-frame';
        if (mode !== 'normal') {
          simViewport.classList.add(`mode-${mode}`);
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. INTERACTIVE PACKAGE & PRICE ESTIMATOR CALCULATOR
  // ------------------------------------------------------------------------
  const propertyCards = document.querySelectorAll('.opt-property');
  const resolutionCards = document.querySelectorAll('.opt-res');
  const cameraSlider = document.getElementById('camera-range');
  const cameraValDisplay = document.getElementById('camera-count-val');
  const storageSlider = document.getElementById('storage-range');
  const storageValDisplay = document.getElementById('storage-val');
  const addonCheckboxes = document.querySelectorAll('.addon-check');

  // Summary Elements
  const summaryProp = document.getElementById('sum-property');
  const summaryCam = document.getElementById('sum-cameras');
  const summaryRes = document.getElementById('sum-res');
  const summaryStorage = document.getElementById('sum-storage');
  const summaryAddons = document.getElementById('sum-addons');
  const totalPriceVal = document.getElementById('total-price-val');
  const whatsappEstimateBtn = document.getElementById('whatsapp-estimate-btn');

  let estimatorState = {
    property: 'Shop / Retail',
    cameras: 4,
    cameraPricePerUnit: 1400,
    resolution: '4K Ultra HD',
    resPriceMultiplier: 1.25,
    storageDays: 15,
    storagePrice: 1800,
    addons: []
  };

  // Property Selection
  propertyCards.forEach(card => {
    card.addEventListener('click', () => {
      propertyCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      estimatorState.property = card.dataset.propName;
      updateEstimate();
    });
  });

  // Resolution Selection
  resolutionCards.forEach(card => {
    card.addEventListener('click', () => {
      resolutionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      estimatorState.resolution = card.dataset.resName;
      estimatorState.resPriceMultiplier = parseFloat(card.dataset.multiplier) || 1;
      updateEstimate();
    });
  });

  // Camera Slider
  if (cameraSlider) {
    cameraSlider.addEventListener('input', (e) => {
      estimatorState.cameras = parseInt(e.target.value);
      if (cameraValDisplay) cameraValDisplay.textContent = `${estimatorState.cameras} Cameras`;
      updateEstimate();
    });
  }

  // Storage Slider
  if (storageSlider) {
    storageSlider.addEventListener('input', (e) => {
      estimatorState.storageDays = parseInt(e.target.value);
      if (storageValDisplay) storageValDisplay.textContent = `${estimatorState.storageDays} Days HDD`;
      estimatorState.storagePrice = estimatorState.storageDays === 7 ? 1200 : estimatorState.storageDays === 15 ? 1800 : 3200;
      updateEstimate();
    });
  }

  // Addons Checkbox
  addonCheckboxes.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('selected');
      const name = item.dataset.addonName;
      const price = parseInt(item.dataset.addonPrice);

      if (item.classList.contains('selected')) {
        estimatorState.addons.push({ name, price });
      } else {
        estimatorState.addons = estimatorState.addons.filter(a => a.name !== name);
      }
      updateEstimate();
    });
  });

  function animateNumberCount(targetVal) {
    if (!totalPriceVal) return;
    const currentVal = parseInt(totalPriceVal.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (targetVal - currentVal) / steps;
    let current = currentVal;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= targetVal) || (increment < 0 && current <= targetVal)) {
        totalPriceVal.textContent = `₹${targetVal.toLocaleString('en-IN')}`;
        clearInterval(timer);
      } else {
        totalPriceVal.textContent = `₹${Math.round(current).toLocaleString('en-IN')}`;
      }
    }, stepTime);
  }

  function updateEstimate() {
    const baseHardwarePrice = 3500;
    const cameraTotal = estimatorState.cameras * 1400 * estimatorState.resPriceMultiplier;
    const addonsTotal = estimatorState.addons.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = Math.round(baseHardwarePrice + cameraTotal + estimatorState.storagePrice + addonsTotal);

    if (summaryProp) summaryProp.textContent = estimatorState.property;
    if (summaryCam) summaryCam.textContent = `${estimatorState.cameras} Channels`;
    if (summaryRes) summaryRes.textContent = estimatorState.resolution;
    if (summaryStorage) summaryStorage.textContent = `${estimatorState.storageDays} Days Storage`;
    if (summaryAddons) {
      summaryAddons.textContent = estimatorState.addons.length > 0 
        ? estimatorState.addons.map(a => a.name).join(', ') 
        : 'None';
    }

    animateNumberCount(grandTotal);

    const addonListStr = estimatorState.addons.length > 0 
      ? estimatorState.addons.map(a => a.name).join(', ') 
      : 'None';

    const waMsg = `Hello SecureVision CCTV (Krisha Tech)! 👋%0A%0AI configured a custom CCTV quotation on your website:%0A` +
      `• Property Type: ${estimatorState.property}%0A` +
      `• Camera Quantity: ${estimatorState.cameras} Cameras%0A` +
      `• Optics / Res: ${estimatorState.resolution}%0A` +
      `• HDD Backup: ${estimatorState.storageDays} Days%0A` +
      `• Add-on Equipment: ${addonListStr}%0A` +
      `• Estimated Price: ₹${grandTotal.toLocaleString('en-IN')}%0A%0A` +
      `Please provide final formal quotation & installation availability.`;

    if (whatsappEstimateBtn) {
      whatsappEstimateBtn.href = `https://wa.me/917083330914?text=${waMsg}`;
    }
  }
  updateEstimate();

  // ------------------------------------------------------------------------
  // 7. CATALOG SHOWCASE CATEGORY FILTER
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;
      serviceCards.forEach(card => {
        if (filterVal === 'all' || card.dataset.category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 8. ANIMATED NUMBERS COUNTER (HIGH TECH NUMERALS)
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function runCounters() {
    statNumbers.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + (counter.dataset.suffix || '');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        runCounters();
        counted = true;
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // ------------------------------------------------------------------------
  // 9. FAQ ACCORDION LOGIC
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ------------------------------------------------------------------------
  // 10. CONTACT FORM & DIRECT WHATSAPP DISPATCH
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('cctv-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }

      const waMsg = `Hello SecureVision CCTV (Krisha Tech)! 👋%0A%0A` +
        `*New Inquiry from Website:*%0A` +
        `• *Name:* ${name}%0A` +
        `• *Phone:* ${phone}%0A` +
        `• *Email:* ${email || 'N/A'}%0A` +
        `• *Service Required:* ${service}%0A` +
        `• *Message:* ${message || 'No additional details.'}%0A%0A` +
        `Please call me back or send details.`;

      window.open(`https://wa.me/917083330914?text=${waMsg}`, '_blank');
      contactForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 11. SCROLL-TO-BOTTOM SALES LEAD DEMO MODAL POPUP
  // ------------------------------------------------------------------------
  const demoModal = document.getElementById('demo-lead-modal');
  const closeDemoModalBtn = document.getElementById('close-demo-modal');
  let modalShown = false;

  function checkScrollForModal() {
    if (modalShown) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 380; // Triggers when scrolling near bottom

    if (scrollPosition >= threshold) {
      if (demoModal) {
        demoModal.classList.add('active');
        modalShown = true;
      }
    }
  }

  window.addEventListener('scroll', checkScrollForModal);

  if (closeDemoModalBtn && demoModal) {
    closeDemoModalBtn.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });

    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
      }
    });
  }
});
