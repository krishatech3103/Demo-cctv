document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const themeButton = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const menuButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('securevision-theme', theme);
    const isDark = theme === 'dark';
    themeButton?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    const icon = themeButton?.querySelector('i');
    if (icon) icon.className = isDark ? 'ri-sun-line' : 'ri-moon-clear-line';
    if (themeMeta) themeMeta.content = isDark ? '#071426' : '#ffffff';
  };

  const savedTheme = localStorage.getItem('securevision-theme');
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.querySelector('i').className = 'ri-menu-3-line';
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', willOpen);
    mobileMenu.setAttribute('aria-hidden', String(!willOpen));
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    menuButton.querySelector('i').className = willOpen ? 'ri-close-line' : 'ri-menu-3-line';
    document.body.classList.toggle('menu-open', willOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-30% 0px -60%', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const heroTime = document.getElementById('hero-time');
  const demoTime = document.getElementById('demo-time');
  const updateClocks = () => {
    const now = new Date();
    if (heroTime) heroTime.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    if (demoTime) {
      const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
      demoTime.textContent = `${date} · ${now.toLocaleTimeString('en-GB')}`;
      demoTime.dateTime = now.toISOString();
    }
  };
  updateClocks();
  window.setInterval(updateClocks, 1000);

  const feeds = {
    home: { name: 'HOME GATE', src: 'images/cctv-residential.png', alt: 'Live CCTV preview of home gate' },
    shop: { name: 'SHOP & COUNTER', src: 'images/cctv-apartment.png', alt: 'Live CCTV preview of shop and counter area' },
    warehouse: { name: 'WAREHOUSE', src: 'images/cctv-industrial.png', alt: 'Live CCTV preview of warehouse area' }
  };
  const demoScreen = document.getElementById('demo-screen');
  const demoImage = document.getElementById('demo-image');
  const cameraName = document.getElementById('camera-name');

  document.querySelectorAll('.camera-tab').forEach((button) => {
    button.addEventListener('click', () => {
      const feed = feeds[button.dataset.feed];
      if (!feed || !demoImage) return;
      document.querySelectorAll('.camera-tab').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      demoScreen?.classList.add('changing');
      window.setTimeout(() => {
        demoImage.src = feed.src;
        demoImage.alt = feed.alt;
        if (cameraName) cameraName.textContent = feed.name;
        demoScreen?.classList.remove('changing');
      }, reduceMotion ? 0 : 180);
    });
  });

  document.querySelectorAll('.view-mode').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.view-mode').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      demoScreen?.classList.toggle('night', button.dataset.mode === 'night');
    });
  });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((faq) => {
        faq.classList.remove('active');
        faq.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const serviceSelect = document.getElementById('service');
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!serviceSelect) return;
      const requested = link.dataset.service;
      const option = [...serviceSelect.options].find((item) => item.value === requested);
      if (option) serviceSelect.value = requested;
    });
  });

  document.getElementById('contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      'Hello SecureVision, I would like a free CCTV site visit.',
      '',
      `Name: ${data.get('name')}`,
      `Mobile: ${data.get('phone')}`,
      `Property: ${data.get('property')}`,
      `Requirement: ${data.get('service')}`,
      `Details: ${data.get('message') || 'Please guide me based on my site.'}`
    ].join('\n');
    window.open(`https://wa.me/917083330914?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
});
