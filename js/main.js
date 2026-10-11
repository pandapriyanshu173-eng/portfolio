/**
 * ===========================================================
 * PORTFOLIO - Main JavaScript
 * Phase 1: Foundation + Design System + Navbar + Hero
 * ===========================================================
 * Sections:
 * 1. Theme Manager (dark/light, localStorage, system preference)
 * 2. Mobile Navigation (hamburger + overlay + focus trap)
 * 3. Typing Effect (cycles through roles)
 * 4. Active Link Highlight (Intersection Observer + scroll)
 * 5. Cursor Spotlight (follows mouse, disabled on touch)
 * 6. Scroll Reveal (Intersection Observer for future sections)
 * 7. Smooth Scroll Enhancements
 * 8. Reduced Motion Respect
 * ===========================================================
 */

(() => {
  'use strict';

  // Mark JS enabled early — CSS uses .js-enabled to hide cards until observer says visible
  document.documentElement.classList.add('js-enabled');

  // Check for reduced motion preference once
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  /* =====================================================
     PHASE 3 DATA — EDIT ONLY THIS ARRAY TO ADD/REMOVE PROJECTS
     =====================================================
     - category must be one of: web, java, python, database (matches filter buttons)
     - featured: true makes the card span full width with side-by-side layout
     - image: path under assets/images/projects/ — gradient fallback shows if missing
     - tags: pill badges, demo/github: placeholder links (replace with real URLs)
  */
  const projectsData = [
    {
      id: 1,
      title: 'Hostel Leave Management System',
      shortDesc: '[SHORT DESC — e.g., Web portal for hostel students to apply and track leave requests with warden approval workflow.]',
      fullDesc: '[FULL DESC — e.g., A complete leave management solution built for hostel administration. Students apply online, wardens review, and status updates are notified. Includes role-based login, leave history, and printable reports.]',
      tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      category: 'web',
      image: 'assets/images/projects/project1.jpg',
      demo: 'https://[YOUR-DEMO-LINK-1]',
      github: 'https://github.com/[YOUR-USERNAME]/hostel-leave-system',
      featured: true,
      features: [
        'Student & warden role-based login',
        'Apply, view and track leave status in real time',
        'Warden approval/rejection with remarks',
        'MySQL-backed leave history and reports',
        '[YOUR FEATURE 5 HERE]'
      ]
    },
    {
      id: 2,
      title: 'Library Management System',
      shortDesc: '[SHORT DESC — e.g., Java-based system to manage books, members and issue/return with MySQL backend.]',
      fullDesc: '[FULL DESC — e.g., Desktop/web hybrid library system with admin and librarian roles. Manages book inventory, member records, issue/return, overdue fines and search.]',
      tags: ['Java', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      category: 'java',
      image: 'assets/images/projects/project2.jpg',
      demo: 'https://[YOUR-DEMO-LINK-2]',
      github: 'https://github.com/[YOUR-USERNAME]/library-management-system',
      featured: false,
      features: [
        'Book inventory with search and categories',
        'Member registration and management',
        'Issue/return with due-date and fine calculation',
        'Admin dashboard with reports',
        '[YOUR FEATURE 5 HERE]'
      ]
    },
    {
      id: 3,
      title: '[PROJECT 3 NAME]',
      shortDesc: '[SHORT DESC — e.g., Replace with a 2-line summary of your third project.]',
      fullDesc: '[FULL DESC — e.g., Detailed description for modal: problem solved, tech choices, and impact. Write 3-4 sentences.]',
      tags: ['Python', 'Flask', 'SQLite'],
      category: 'python',
      image: 'assets/images/projects/project3.jpg',
      demo: 'https://[YOUR-DEMO-LINK-3]',
      github: 'https://github.com/[YOUR-USERNAME]/[PROJECT-3-REPO]',
      featured: false,
      features: [
        '[FEATURE 1 — e.g., Key capability one]',
        '[FEATURE 2 — e.g., Key capability two]',
        '[FEATURE 3 — e.g., Key capability three]',
        '[FEATURE 4 HERE]'
      ]
    },
    {
      id: 4,
      title: '[PROJECT 4 NAME]',
      shortDesc: '[SHORT DESC — e.g., Replace with a 2-line summary of your fourth project.]',
      fullDesc: '[FULL DESC — e.g., Detailed description for modal: what it does and why it matters.]',
      tags: ['MySQL', 'Database', 'JavaScript'],
      category: 'database',
      image: 'assets/images/projects/project4.jpg',
      demo: 'https://[YOUR-DEMO-LINK-4]',
      github: 'https://github.com/[YOUR-USERNAME]/[PROJECT-4-REPO]',
      featured: false,
      features: [
        '[FEATURE 1 HERE]',
        '[FEATURE 2 HERE]',
        '[FEATURE 3 HERE]',
        '[FEATURE 4 HERE]'
      ]
    }
  ];

  /* =====================================================
     PHASE 3 DATA — JOURNEY (EDUCATION & EXPERIENCE)
     =====================================================
     - Edit dates, titles, orgs, bullets. Set current:true to glow the dot.
     - Bullets: 2-3 points per item.
  */
  const educationData = [
    {
      date: '2024 — Present',
      title: 'Master of Computer Applications (MCA)',
      org: '[YOUR COLLEGE NAME]',
      bullets: [
        'CGPA: [YOUR CGPA] — [YOUR DEPARTMENT]',
        'Relevant: Data Structures, DBMS, Operating Systems, Networks',
        '[YOUR NOTE — e.g., Active in coding club / hackathons]'
      ],
      current: true
    },
    {
      date: '2021 — 2024',
      title: 'Bachelor of [YOUR DEGREE]',
      org: '[YOUR UNIVERSITY]',
      bullets: [
        'Percentage/CGPA: [YOUR SCORE]',
        '[YOUR MAJOR / HIGHLIGHT — e.g., Graduated with distinction]'
      ],
      current: false
    },
    {
      date: '2019 — 2021',
      title: 'Higher Secondary (12th)',
      org: '[YOUR SCHOOL NAME]',
      bullets: [
        'Percentage: [YOUR SCORE]',
        '[STREAM — e.g., Science with Computer Science]'
      ],
      current: false
    }
  ];

  const experienceData = [
    {
      date: 'Jun 2025 — Aug 2025',
      title: '[INTERNSHIP ROLE — e.g., Software Developer Intern]',
      org: '[COMPANY NAME]',
      bullets: [
        '[BULLET 1 — e.g., Built REST APIs with Java Servlets & MySQL]',
        '[BULLET 2 — e.g., Collaborated with team using Git/GitHub and Agile]',
        '[BULLET 3 — e.g., Improved page load by X%]'
      ],
      current: true
    },
    {
      date: 'Jan 2025 — Mar 2025',
      title: '[TRAINING / FREELANCE — e.g., Web Development Training]',
      org: '[ORGANIZATION]',
      bullets: [
        '[BULLET 1 — e.g., Developed responsive web apps with HTML/CSS/JS]',
        '[BULLET 2 — e.g., Learned backend basics and database design]'
      ],
      current: false
    },
    {
      date: '2024',
      title: '[OPEN SOURCE / COMMUNITY — e.g., Open Source Contributor]',
      org: '[COMMUNITY / PLATFORM]',
      bullets: [
        '[BULLET 1 — e.g., Contributed to documentation and bug fixes]',
        '[BULLET 2 — e.g., Participated in hackathons and coding contests]'
      ],
      current: false
    }
  ];

  /* =====================================================
     PHASE 4 DATA — CERTIFICATES (EDIT ONLY THIS TO ADD NEW)
     =====================================================
     HOW TO ADD A NEW CERTIFICATE (3 steps):
     1. Copy your certificate image (JPG/PNG, 800x600 recommended) into:
        assets/images/certificates/  -> e.g., cert5.jpg
     2. Add ONE object to the certificatesData array below:
        {
          id: 5,                                      // unique number
          title: '[YOUR CERTIFICATE TITLE]',         // visible title
          issuer: '[ISSUER — e.g., Coursera / NPTEL]', // organization
          date: '[DATE — e.g., May 2025]',           // display date
          category: 'course',                          // must be: course, hackathon, award, workshop
          image: 'assets/images/certificates/cert5.jpg', // path you copied in step 1
          verify: 'https://[YOUR-VERIFY-LINK]'       // optional — leave "" or omit to hide Verify button
        }
     3. Save js/main.js and reload. Counters + gallery + lightbox update automatically.
     - category controls filter button + badge colour.
     - If image file is missing, a gradient placeholder with initials shows automatically.
     - Sample 4 entries below show each category once.
  */
  const certificatesData = [
    {
      id: 1,
      title: '[CERTIFICATE 1 TITLE — e.g., NPTEL Data Structures & Algorithms]',
      issuer: '[ISSUER — e.g., NPTEL / IIT Madras]',
      date: 'Apr 2025',
      category: 'course',
      image: 'assets/images/certificates/cert1.jpg',
      verify: 'https://[YOUR-VERIFY-LINK-1]'
    },
    {
      id: 2,
      title: '[CERTIFICATE 2 TITLE — e.g., Smart India Hackathon Participation]',
      issuer: '[ISSUER — e.g., Smart India Hackathon]',
      date: 'Mar 2025',
      category: 'hackathon',
      image: 'assets/images/certificates/cert2.jpg',
      verify: 'https://[YOUR-VERIFY-LINK-2]'
    },
    {
      id: 3,
      title: '[CERTIFICATE 3 TITLE — e.g., Best Student Award]',
      issuer: '[ISSUER — e.g., Your College / University]',
      date: 'Jan 2025',
      category: 'award',
      image: 'assets/images/certificates/cert3.jpg',
      verify: '' // leave empty to hide Verify button
    },
    {
      id: 4,
      title: '[CERTIFICATE 4 TITLE — e.g., Cloud Workshop Completion]',
      issuer: '[ISSUER — e.g., AWS / Google / College Workshop]',
      date: 'Dec 2024',
      category: 'workshop',
      image: 'assets/images/certificates/cert4.jpg',
      verify: 'https://[YOUR-VERIFY-LINK-4]'
    }
  ];

  /* =====================================================
     PHASE 4 DATA — OTHER ACHIEVEMENTS (no certificate needed)
     =====================================================
     - For rankings, leadership, recognitions without a certificate.
     - Each item appears as a glowing mini-timeline row.
     - Add/remove objects freely; no image needed.
  */
  const otherAchievementsData = [
    {
      title: '[OTHER ACHIEVEMENT 1 — e.g., Top 10 in College Hackathon 2025]',
      desc: '[DESC — e.g., Led a team of 4 to build a hostel management prototype in 36 hours.]',
      meta: '[META — e.g., College · Mar 2025]'
    },
    {
      title: '[OTHER ACHIEVEMENT 2 — e.g., Coding Club Coordinator]',
      desc: '[DESC — e.g., Organized weekly DSA sessions and mentored juniors.]',
      meta: '[META — e.g., College Coding Club · 2024 — Present]'
    },
    {
      title: '[OTHER ACHIEVEMENT 3 — e.g., Merit Rank — MCA Semester 1]',
      desc: '[DESC — e.g., Secured rank 3 with CGPA 8.9.]',
      meta: '[META — e.g., University · 2024]'
    }
  ];

  /* =====================================================
     PHASE 5 — CONTACT FORM ENDPOINT (EDIT THIS ONE LINE)
     =====================================================
     Your form works WITHOUT a backend via Formspree or Web3Forms (free).

     OPTION A — Formspree (recommended):
       1. Go to https://formspree.io and create a free account
       2. Create a new form → copy its endpoint, e.g.:
          https://formspree.io/f/xqakopwr
       3. Paste it below as FORM_ENDPOINT

     OPTION B — Web3Forms:
       1. Go to https://web3forms.com and create a free access key
       2. Use endpoint https://api.web3forms.com/submit
          and also set the access key in the hidden form field (already added)
       3. Paste the same endpoint below

     If you leave the placeholder, the form will show an inline error
     telling you to set the endpoint — no request is sent.

     Example:
       const FORM_ENDPOINT = "https://formspree.io/f/xqakopwr";
       const FORM_ENDPOINT = "https://api.web3forms.com/submit";
  */
  const FORM_ENDPOINT = "[YOUR ENDPOINT HERE]";
  const FORM_HONEYPOT_FIELD = "website"; // hidden field name to catch bots

  /* =====================
     1. THEME MANAGER
     ===================== */
  const THEME_KEY = 'portfolio-theme';
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  /**
   * Get system preference
   * @returns {'dark'|'light'}
   */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /**
   * Get saved theme or system fallback
   */
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return getSystemTheme();
  }

  /**
   * Apply theme to document
   * @param {'dark'|'light'} theme
   */
  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme'); // dark is default (no attribute)
    }
    // Update toggle aria-label for accessibility
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme (currently ${theme})`);
    }
    // Smooth transition: add class then remove after transition
    htmlEl.style.transition = 'color 0.3s ease, background-color 0.3s ease';
  }

  // Initialize theme on load (before paint if possible)
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Listen for system changes only if user hasn't manually chosen
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    const saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // Toggle button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* =====================
     2. MOBILE NAVIGATION
     ===================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    navMenu.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    navOverlay.classList.add('is-visible');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMenu() {
    isMenuOpen = false;
    navMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navOverlay.classList.remove('is-visible');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (isMenuOpen) closeMenu();
    else openMenu();
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);

    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    // Close on nav link click (and smooth scroll handled elsewhere)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (isMenuOpen) closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close if viewport resizes to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && isMenuOpen) {
        closeMenu();
      }
    });
  }

  /* =====================
     3. TYPING EFFECT
     ===================== */
  const typedEl = document.getElementById('typedText');
  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Problem Solver'
  ];

  if (typedEl && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const typeSpeed = 110;      // ms per char when typing
    const deleteSpeed = 65;     // ms per char when deleting
    const pauseAfterType = 1700; // pause when word complete
    const pauseAfterDelete = 400; // pause before typing next

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        // Delete char
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Type char
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      // Word fully typed
      if (!isDeleting && charIndex === currentRole.length) {
        delay = pauseAfterType;
        isDeleting = true;
      }
      // Word fully deleted
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = pauseAfterDelete;
      }

      typingTimeout = setTimeout(typeLoop, delay);
    }

    // Start after initial load delay
    setTimeout(typeLoop, 900);

    // Clean up on page hide/unload
    window.addEventListener('beforeunload', () => clearTimeout(typingTimeout));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(typingTimeout);
    });
  } else if (typedEl && prefersReducedMotion) {
    // Reduced motion: just show first role statically
    typedEl.textContent = roles[0];
  }

  /* =====================
     4. ACTIVE LINK HIGHLIGHT
        - Uses Intersection Observer for accuracy
        - Falls back to scroll listener
     ===================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinkMap = {};
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) navLinkMap[id] = link;
  });

  function setActiveLink(id) {
    navLinks.forEach((link) => link.classList.remove('active'));
    if (navLinkMap[id]) {
      navLinkMap[id].classList.add('active');
    }
  }

  // Intersection Observer for scroll spy
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // trigger when section is in middle 50%
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveLink(id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  } else {
    // Fallback: scroll listener with throttle
    let ticking = false;
    function onScrollFallback() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY + window.innerHeight * 0.4;
        let currentId = 'home';
        sections.forEach((sec) => {
          if (sec.offsetTop <= scrollPos) {
            currentId = sec.getAttribute('id');
          }
        });
        setActiveLink(currentId);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScrollFallback, { passive: true });
    onScrollFallback();
  }

  /* =====================
     5. CURSOR SPOTLIGHT
        - Soft radial glow that follows mouse
        - Disabled on touch / coarse pointer / reduced motion
     ===================== */
  const spotlight = document.getElementById('cursorSpotlight');

  if (spotlight && !isTouchDevice && !prefersReducedMotion) {
    let mouseX = 0;
    let mouseY = 0;
    let spotlightX = 0;
    let spotlightY = 0;
    let isHovering = false;
    let rafId = null;

    // Use transform for performance: lerp towards mouse
    function animateSpotlight() {
      // Simple lerp for smooth follow
      spotlightX += (mouseX - spotlightX) * 0.08;
      spotlightY += (mouseY - spotlightY) * 0.08;
      spotlight.style.left = spotlightX + 'px';
      spotlight.style.top = spotlightY + 'px';
      rafId = requestAnimationFrame(animateSpotlight);
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isHovering) {
        isHovering = true;
        spotlight.style.opacity = '1';
        if (!rafId) animateSpotlight();
      }
    });

    document.addEventListener('mouseleave', () => {
      isHovering = false;
      spotlight.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      spotlight.style.opacity = '1';
    });

    // Hide on mouse out of window
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        spotlight.style.opacity = '0';
      }
    });
  } else if (spotlight) {
    // Ensure hidden on touch / reduced motion
    spotlight.style.display = 'none';
  }

  /* =====================
     6. SCROLL REVEAL (for future sections)
        - Observes .reveal elements and adds .is-visible
        - Ready for Phase 2+ sections
     ===================== */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Unobserve after reveal to save resources
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }

    // Also observe placeholder sections if they later get content with .reveal
    // This MutationObserver will auto-observe new .reveal nodes (useful for later phases)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList && node.classList.contains('reveal')) {
            revealObserver.observe(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
          }
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  /* =====================
     7. SMOOTH SCROLL ENHANCEMENTS
        - Native CSS scroll-behavior handles most,
        - This adds offset correction and focus management
     ===================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return; // ignore href="#"
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 64;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Accessibility: move focus to target
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* =====================
     8. NAVBAR SHADOW ON SCROLL (subtle)
     ===================== */
  const header = document.querySelector('.site-header');
  if (header && !prefersReducedMotion) {
    let lastScrollY = window.scrollY;
    window.addEventListener(
      'scroll',
      () => {
        const currentY = window.scrollY;
        if (currentY > 10) {
          header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
        } else {
          header.style.boxShadow = '';
        }
        lastScrollY = currentY;
      },
      { passive: true }
    );
  }

  /* =====================
     9. ABOUT PHOTO: FALLBACK + TILT EFFECT
     ===================== */
  const profileImg = document.getElementById('profileImg');
  const photoFallback = document.getElementById('photoFallback');
  const photoFrame = document.getElementById('photoFrame');

  // Fallback: if image fails to load, show initials (also handled inline onerror)
  if (profileImg && photoFallback) {
    // If image is already broken (e.g., 404 on load), naturalWidth will be 0
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      photoFallback.classList.add('is-visible');
      photoFallback.removeAttribute('aria-hidden');
    });
    // Check after load if img didn't load (cached 404)
    if (profileImg.complete && profileImg.naturalWidth === 0) {
      profileImg.style.display = 'none';
      photoFallback.classList.add('is-visible');
    }
  }

  // Subtle tilt/parallax on mouse (disabled on touch / reduced motion)
  if (photoFrame && !isTouchDevice && !prefersReducedMotion) {
    const tiltStrength = 8; // deg
    const scaleOnHover = 1.02;

    photoFrame.addEventListener('mousemove', (e) => {
      const rect = photoFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * tiltStrength;
      const rotateX = ((centerY - y) / centerY) * tiltStrength;
      photoFrame.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`;
    });

    photoFrame.addEventListener('mouseleave', () => {
      photoFrame.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });

    // Also subtle glow intensify on hover
    photoFrame.addEventListener('mouseenter', () => {
      const glow = photoFrame.querySelector('.about__photo-glow');
      if (glow) glow.style.opacity = '0.32';
    });
    photoFrame.addEventListener('mouseleave', () => {
      const glow = photoFrame.querySelector('.about__photo-glow');
      if (glow) glow.style.opacity = '';
    });
  }

  /* =====================
     10. STAT COUNTERS (count-up on scroll)
     ===================== */
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400; // ms
    const startTime = performance.now();

    // Respect reduced motion: jump directly to target
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => statObserver.observe(el));
  } else {
    // Fallback: animate immediately
    statNumbers.forEach(animateCount);
  }

  /* =====================
     11. SKILLS FILTER TABS
     ===================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  function applyFilter(filter) {
    skillCards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      const shouldShow = filter === 'all' || cat === filter;
      if (shouldShow) {
        card.classList.remove('is-hidden');
        // Small stagger reveal for nice effect (unless reduced motion)
        if (!prefersReducedMotion) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 300ms ease, transform 300ms ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            setTimeout(() => {
              card.style.transition = '';
              card.style.opacity = '';
              card.style.transform = '';
            }, 320);
          });
        }
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  if (filterBtns.length && skillCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        // Update active state + aria
        filterBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        applyFilter(filter);
      });

      // Keyboard navigation: arrow keys move between tabs
      btn.addEventListener('keydown', (e) => {
        const idx = Array.from(filterBtns).indexOf(btn);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = filterBtns[(idx + 1) % filterBtns.length];
          next.focus();
          next.click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = filterBtns[(idx - 1 + filterBtns.length) % filterBtns.length];
          prev.focus();
          prev.click();
        }
      });
    });
  }

  /* =====================
     12. SKILL PROGRESS BARS (animate on scroll)
     ===================== */
  const skillFills = document.querySelectorAll('.skill-bar__fill[data-width]');

  if ('IntersectionObserver' in window && skillFills.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            // Respect reduced motion: no transition
            if (prefersReducedMotion) {
              fill.style.transition = 'none';
              fill.style.width = width;
            } else {
              // Trigger after small delay so transition is visible
              requestAnimationFrame(() => {
                fill.style.width = width;
              });
            }
            barObserver.unobserve(fill);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20px 0px' }
    );
    skillFills.forEach((fill) => barObserver.observe(fill));
  } else {
    // Fallback: set directly
    skillFills.forEach((fill) => {
      fill.style.width = fill.getAttribute('data-width');
    });
  }

  /* =====================================================
     13. PROJECTS — RENDER FROM ARRAY + FILTER + MODAL (FIXED)
     =====================================================
     FIX: Render FIRST, then observe. Cards are visible by default in CSS;
          .js-enabled hides them until observer adds .is-visible once.
          Filter toggles only .is-hidden (display:none) — no opacity/transform conflict.
          Fallback after 1.5s guarantees visibility if observer fails.
  */
  const projectsGrid = document.getElementById('projectsGrid');
  const projectFilterBtns = document.querySelectorAll('.projects__filters .filter-btn');
  let activeProjectFilter = 'all';

  // Helpers — defined before use so createProjectCard can call them
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }
  function getProjectCategoryLabel(cat) {
    const map = { web: 'Web', java: 'Java', python: 'Python', database: 'Database' };
    return map[cat] || cat;
  }

  function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card glass' + (project.featured ? ' project-card--featured' : '');
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);
    // No inline opacity/transform here — CSS handles hidden state via .js-enabled
    // Do NOT add .reveal — new CSS uses .js-enabled .project-card + .is-visible

    const initials = project.title.replace(/\[|\]/g, '').split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase() || 'PRJ';
    const tagsHtml = project.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('');
    const featuresHtml = project.features && project.featured
      ? `<ul class="project-card__features">${project.features.slice(0,4).map(f=>`<li>${escapeHtml(f)}</li>`).join('')}</ul>`
      : '';
    const featuredBadge = project.featured ? `<span class="project-card__badge">Featured</span>` : '';
    const demoBtn = project.demo && !project.demo.includes('[YOUR')
      ? `<a href="${escapeAttr(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm" aria-label="Live demo for ${escapeAttr(project.title)}">Live Demo</a>`
      : `<a href="${escapeAttr(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm" aria-label="Live demo placeholder for ${escapeAttr(project.title)}">Live Demo</a>`;
    const githubBtn = `<a href="${escapeAttr(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm" aria-label="GitHub for ${escapeAttr(project.title)}">GitHub</a>`;

    card.innerHTML = `
      <div class="project-card__media">
        <img src="${escapeAttr(project.image)}" alt="${escapeAttr(project.title)} screenshot" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
        <div class="project-card__placeholder" style="display:none;" aria-hidden="true"><span>${escapeHtml(initials)}</span></div>
        ${featuredBadge}
        <span class="project-card__category">${escapeHtml(getProjectCategoryLabel(project.category))}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
        <p class="project-card__desc">${escapeHtml(project.shortDesc)}</p>
        ${featuresHtml}
        <div class="project-card__tags" aria-label="Tech stack">${tagsHtml}</div>
        <div class="project-card__actions">
          ${demoBtn}
          ${githubBtn}
          <button type="button" class="btn--ghost" data-details-id="${project.id}" aria-label="View details for ${escapeAttr(project.title)}">Details</button>
        </div>
      </div>
    `;
    const detailsBtn = card.querySelector('[data-details-id]');
    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => openProjectModal(project.id));
    }
    return card;
  }

  // Single, simple reveal — add .is-visible once and unobserve. No removal.
  function attachProjectReveal() {
    const cards = projectsGrid ? projectsGrid.querySelectorAll('.project-card') : [];
    if (!cards.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    cards.forEach(c => observer.observe(c));
  }

  function renderProjects(filter = 'all') {
    try {
      if (!projectsGrid) throw new Error('Projects grid #projectsGrid not found in DOM');
      if (!Array.isArray(projectsData) || projectsData.length === 0) throw new Error('projectsData array is missing or empty — check js/main.js top');
      projectsGrid.setAttribute('aria-busy', 'true');
      projectsGrid.innerHTML = '';

      const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

      if (filtered.length === 0) {
        projectsGrid.innerHTML = `<p class="section-desc" style="grid-column:1/-1; text-align:center;">No projects in this category. Edit <code>projectsData</code> in js/main.js to add more.</p>`;
        projectsGrid.setAttribute('aria-busy', 'false');
        return;
      }
      // Featured first
      filtered.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));

      filtered.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
      });

      // Attach reveal AFTER cards exist in DOM — critical fix
      attachProjectReveal();

      // Fallback: after 1.5s make sure all cards are visible even if observer never fired
      setTimeout(() => {
        const hidden = projectsGrid.querySelectorAll('.project-card:not(.is-visible):not(.is-hidden)');
        if (hidden.length) {
          console.warn('[Projects] Fallback: forcing', hidden.length, 'cards visible after 1.5s');
          hidden.forEach(c => c.classList.add('is-visible'));
        }
      }, 1500);

      projectsGrid.setAttribute('aria-busy', 'false');
    } catch (err) {
      console.error('[Projects] Render failed:', err.message, err);
      if (projectsGrid) {
        projectsGrid.innerHTML = `<p class="section-desc" style="grid-column:1/-1; text-align:center; color:var(--text-muted)">Unable to load projects: ${escapeHtml(err.message)} — check console and js/main.js projectsData.</p>`;
        projectsGrid.setAttribute('aria-busy', 'false');
      }
    }
  }

  // Initial render — All active on load, all cards shown
  try {
    renderProjects('all');
    console.log('[Projects] Rendered', projectsData.length, 'cards from projectsData');
  } catch (err) {
    console.error('[Projects] Initial render error:', err);
  }

  // Filter — toggles only .is-hidden (display:none), no opacity/transform conflict
  if (projectFilterBtns.length) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        activeProjectFilter = filter;
        projectFilterBtns.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });
        const cards = projectsGrid ? projectsGrid.querySelectorAll('.project-card') : [];
        cards.forEach(card => {
          const shouldShow = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !shouldShow);
        });
        // Ensure newly shown cards are observed for reveal if they were hidden
        if (!prefersReducedMotion && 'IntersectionObserver' in window) {
          const toReveal = projectsGrid.querySelectorAll('.project-card:not(.is-hidden):not(.is-visible)');
          if (toReveal.length) {
            const obs = new IntersectionObserver((entries, o) => {
              entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); o.unobserve(e.target); }});
            }, { threshold: 0.12 });
            toReveal.forEach(c => obs.observe(c));
            // Fallback for filtered-in cards already in viewport
            setTimeout(() => toReveal.forEach(c => c.classList.add('is-visible')), 600);
          }
        }
      });
    });
  } else {
    console.warn('[Projects] No filter buttons found — check .projects__filters markup');
  }

  /* ---- Modal Logic ---- */
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalFallback = document.getElementById('modalFallback');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTags = document.getElementById('modalTags');
  const modalLinks = document.getElementById('modalLinks');
  let lastFocusedEl = null;

  function openProjectModal(id) {
    const project = projectsData.find(p => String(p.id) === String(id));
    if (!project || !modal) return;

    // Fill content
    if (modalImage) {
      modalImage.src = project.image;
      modalImage.alt = project.title + ' — full preview';
      modalImage.style.display = '';
      if (modalFallback) modalFallback.classList.remove('is-visible');
      modalImage.onerror = () => {
        modalImage.style.display = 'none';
        if (modalFallback) modalFallback.classList.add('is-visible');
      };
    }
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDesc) modalDesc.textContent = project.fullDesc;
    if (modalFeatures) {
      modalFeatures.innerHTML = project.features.map(f => `<li>${escapeHtml(f)}</li>`).join('');
    }
    if (modalTags) {
      modalTags.innerHTML = project.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('');
    }
    if (modalLinks) {
      modalLinks.innerHTML = `
        <a href="${escapeAttr(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary" aria-label="Open live demo for ${escapeAttr(project.title)}">Live Demo</a>
        <a href="${escapeAttr(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary" aria-label="Open GitHub for ${escapeAttr(project.title)}">GitHub</a>
      `;
    }

    // Show modal
    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    // Prevent background scroll, preserve scroll position
    document.body.style.overflow = 'hidden';
    // Trigger open animation next frame
    requestAnimationFrame(() => modal.classList.add('is-open'));
    // Focus close button
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();

    // Trap focus
    document.addEventListener('keydown', trapModalFocus);
    document.addEventListener('keydown', handleModalEsc);
  }

  function closeProjectModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    // Wait for transition
    setTimeout(() => {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', trapModalFocus);
      document.removeEventListener('keydown', handleModalEsc);
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }, 260);
  }

  function handleModalEsc(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeProjectModal();
    }
  }

  function trapModalFocus(e) {
    if (!modal || modal.hidden || e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Close handlers: X, backdrop, any [data-close-modal]
  if (modal) {
    modal.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', (e) => {
        // If clicking backdrop, ensure it's direct
        if (e.target === el || el.classList.contains('modal__close') || el.hasAttribute('data-close-modal')) {
          closeProjectModal();
        }
      });
    });
    // Also close when clicking backdrop area (the modal itself but not dialog)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  /* =====================================================
     14. JOURNEY — TIMELINE RENDER + TABS + REVEAL
     ===================================================== */
  const timelineEdu = document.getElementById('timelineEducation');
  const timelineExp = document.getElementById('timelineExperience');
  const journeyTabs = document.querySelectorAll('.journey-tab');
  const journeyPanels = document.querySelectorAll('.journey__panel');

  function createTimelineItem(item) {
    const el = document.createElement('article');
    el.className = 'timeline__item';
    // Reveal handled via observer
    const bullets = item.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('');
    el.innerHTML = `
      <div class="timeline__dot ${item.current ? 'timeline__dot--current' : ''}" aria-hidden="true"></div>
      <div class="timeline__card glass">
        <span class="timeline__date">${escapeHtml(item.date)}</span>
        <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
        <p class="timeline__org">${escapeHtml(item.org)}</p>
        <ul class="timeline__bullets">${bullets}</ul>
      </div>
    `;
    return el;
  }

  function renderTimeline(container, data) {
    if (!container) return;
    container.innerHTML = '';
    data.forEach(item => {
      const node = createTimelineItem(item);
      container.appendChild(node);
    });
    // Observe for reveal (staggered)
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const tObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            tObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
      container.querySelectorAll('.timeline__item').forEach((it, i) => {
        it.style.transitionDelay = `${i * 80}ms`;
        tObserver.observe(it);
      });
    } else {
      container.querySelectorAll('.timeline__item').forEach(it => it.classList.add('is-visible'));
    }
  }

  renderTimeline(timelineEdu, educationData);
  renderTimeline(timelineExp, experienceData);

  // Tabs logic (Education/Experience)
  function activateJourney(target) {
    journeyTabs.forEach(tab => {
      const isActive = tab.getAttribute('data-journey') === target;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    journeyPanels.forEach(panel => {
      const isTarget = panel.id === `panel-${target}`;
      if (isTarget) {
        panel.hidden = false;
        panel.classList.add('is-active');
        // Re-trigger reveal for items that were hidden (they may be already observed but hidden)
        panel.querySelectorAll('.timeline__item:not(.is-visible)').forEach(it => {
          // Force visible if reduced motion, else let observer handle when scrolled
          if (prefersReducedMotion) it.classList.add('is-visible');
        });
      } else {
        panel.hidden = true;
        panel.classList.remove('is-active');
      }
    });
  }

  if (journeyTabs.length) {
    journeyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        activateJourney(tab.getAttribute('data-journey'));
      });
      tab.addEventListener('keydown', (e) => {
        const idx = Array.from(journeyTabs).indexOf(tab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = journeyTabs[(idx + 1) % journeyTabs.length];
          next.focus();
          next.click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = journeyTabs[(idx - 1 + journeyTabs.length) % journeyTabs.length];
          prev.focus();
          prev.click();
        }
      });
    });
  }

  /* =====================================================
     15. ACHIEVEMENTS — COUNTERS + GALLERY + FILTER + LIGHTBOX
     ===================================================== */
  const certificatesGrid = document.getElementById('certificatesGrid');
  const certFilterBtns = document.querySelectorAll('.certificates__filters .filter-btn');
  const counterTotal = document.getElementById('counterTotal');
  const counterHackathons = document.getElementById('counterHackathons');
  const counterAwards = document.getElementById('counterAwards');
  const counterWorkshops = document.getElementById('counterWorkshops');
  const otherList = document.getElementById('otherAchievementsList');
  let activeCertFilter = 'all';
  let filteredCerts = [...certificatesData]; // currently visible set (for lightbox prev/next)
  let lightboxIndex = 0;

  // Auto-calculate counters from certificatesData[] and animate on scroll (reuse animateCount)
  function updateAchievementCounters() {
    const total = certificatesData.length;
    const hackathons = certificatesData.filter(c => c.category === 'hackathon').length;
    const awards = certificatesData.filter(c => c.category === 'award').length;
    const workshops = certificatesData.filter(c => c.category === 'workshop').length;

    const map = [
      [counterTotal, total],
      [counterHackathons, hackathons],
      [counterAwards, awards],
      [counterWorkshops, workshops]
    ];
    map.forEach(([el, val]) => {
      if (!el) return;
      el.setAttribute('data-target', String(val));
      // If already visible, animate now; otherwise observer will trigger
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        animateCount(el);
      } else if ('IntersectionObserver' in window) {
        const cObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        cObs.observe(el);
      } else {
        animateCount(el);
      }
    });
  }
  updateAchievementCounters();

  function getCertBadgeClass(cat) {
    return `cert-card__badge--${cat}`;
  }
  function getCertCategoryLabel(cat) {
    const m = { course: 'Course', hackathon: 'Hackathon', award: 'Award', workshop: 'Workshop' };
    return m[cat] || cat;
  }

  function createCertCard(cert) {
    const card = document.createElement('article');
    card.className = 'cert-card glass reveal';
    card.setAttribute('data-category', cert.category);
    card.setAttribute('data-id', cert.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View certificate: ${cert.title} by ${cert.issuer}`);
    if (prefersReducedMotion) card.classList.add('is-visible');

    const initials = cert.title.replace(/\[|\]/g, '').split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase() || 'CERT';
    const verifyBtn = cert.verify && cert.verify.trim() && !cert.verify.includes('[YOUR')
      ? `<a href="${escapeAttr(cert.verify)}" target="_blank" rel="noopener noreferrer" class="cert-card__verify" aria-label="Verify ${escapeAttr(cert.title)}" onclick="event.stopPropagation()">Verify <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`
      : '';

    card.innerHTML = `
      <div class="cert-card__media">
        <img src="${escapeAttr(cert.image)}" alt="${escapeAttr(cert.title)} — ${escapeAttr(cert.issuer)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.classList.add('is-visible');">
        <div class="cert-card__placeholder" aria-hidden="true"><span>${escapeHtml(initials)}</span></div>
        <span class="cert-card__badge ${getCertBadgeClass(cert.category)}">${escapeHtml(getCertCategoryLabel(cert.category))}</span>
      </div>
      <div class="cert-card__body">
        <h3 class="cert-card__title">${escapeHtml(cert.title)}</h3>
        <p class="cert-card__issuer">${escapeHtml(cert.issuer)}</p>
        <p class="cert-card__date"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${escapeHtml(cert.date)}</p>
        <div class="cert-card__actions">
          <span class="cert-card__date" style="opacity:0.9">Tap to enlarge</span>
          ${verifyBtn}
        </div>
      </div>
    `;

    // Open lightbox on click / Enter / Space
    function openFromCard() {
      const idx = filteredCerts.findIndex(c => String(c.id) === String(cert.id));
      openLightbox(idx >= 0 ? idx : 0);
    }
    card.addEventListener('click', openFromCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromCard();
      }
    });
    return card;
  }

  function renderCertificates(filter = 'all') {
    if (!certificatesGrid) return;
    certificatesGrid.setAttribute('aria-busy', 'true');
    certificatesGrid.innerHTML = '';
    filteredCerts = filter === 'all' ? [...certificatesData] : certificatesData.filter(c => c.category === filter);

    if (filteredCerts.length === 0) {
      certificatesGrid.innerHTML = `<p class="section-desc" style="grid-column:1/-1; text-align:center;">No certificates in this category. Add one to <code>certificatesData</code> in js/main.js.</p>`;
      certificatesGrid.setAttribute('aria-busy', 'false');
      return;
    }

    filteredCerts.forEach((cert, idx) => {
      const card = createCertCard(cert);
      if (!prefersReducedMotion) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
      }
      certificatesGrid.appendChild(card);
      if (!prefersReducedMotion) {
        setTimeout(() => {
          card.style.transition = 'opacity 340ms ease, transform 340ms ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          setTimeout(() => { card.style.transition=''; card.style.opacity=''; card.style.transform=''; }, 360);
        }, idx * 45);
      } else {
        card.classList.add('is-visible');
      }
    });
    certificatesGrid.setAttribute('aria-busy', 'false');
  }

  renderCertificates(activeCertFilter);

  if (certFilterBtns.length) {
    certFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        activeCertFilter = filter;
        certFilterBtns.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });
        if (!prefersReducedMotion && certificatesGrid) {
          const cards = certificatesGrid.querySelectorAll('.cert-card');
          if (cards.length) {
            cards.forEach(c => c.classList.add('is-filtering-out'));
            setTimeout(() => renderCertificates(filter), 220);
            return;
          }
        }
        renderCertificates(filter);
      });
    });
  }

  // Other Achievements mini-timeline
  function renderOtherAchievements() {
    if (!otherList) return;
    otherList.innerHTML = '';
    otherAchievementsData.forEach(item => {
      const li = document.createElement('li');
      li.className = 'other-achievement';
      li.innerHTML = `
        <h4 class="other-achievement__title">${escapeHtml(item.title)}</h4>
        <p class="other-achievement__desc">${escapeHtml(item.desc)}</p>
        <span class="other-achievement__meta">${escapeHtml(item.meta)}</span>
      `;
      otherList.appendChild(li);
    });
  }
  renderOtherAchievements();

  /* ---- Lightbox Logic ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxFallback = document.getElementById('lightboxFallback');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxVerify = document.getElementById('lightboxVerify');
  const lightboxCounter = document.getElementById('lightboxCounter');
  let lastFocusedLightbox = null;

  function updateLightboxContent(index) {
    const cert = filteredCerts[index];
    if (!cert) return;
    lightboxIndex = index;
    if (lightboxImage) {
      lightboxImage.src = cert.image;
      lightboxImage.alt = cert.title + ' — ' + cert.issuer;
      lightboxImage.style.display = '';
      if (lightboxFallback) lightboxFallback.classList.remove('is-visible');
      lightboxImage.onerror = () => {
        lightboxImage.style.display = 'none';
        if (lightboxFallback) lightboxFallback.classList.add('is-visible');
      };
    }
    if (lightboxTitle) lightboxTitle.textContent = cert.title;
    if (lightboxIssuer) lightboxIssuer.textContent = cert.issuer;
    if (lightboxDate) lightboxDate.textContent = cert.date;
    if (lightboxVerify) {
      if (cert.verify && cert.verify.trim() && !cert.verify.includes('[YOUR')) {
        lightboxVerify.href = cert.verify;
        lightboxVerify.textContent = 'Verify Certificate';
        lightboxVerify.hidden = false;
        lightboxVerify.style.display = 'inline-flex';
      } else {
        lightboxVerify.hidden = true;
        lightboxVerify.style.display = 'none';
      }
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${filteredCerts.length}`;
    }
  }

  function openLightbox(index) {
    if (!lightbox || !filteredCerts.length) return;
    updateLightboxContent(index);
    lastFocusedLightbox = document.activeElement;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    const closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', handleLightboxKeys);
    document.addEventListener('keydown', trapLightboxFocus);
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    setTimeout(() => {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleLightboxKeys);
      document.removeEventListener('keydown', trapLightboxFocus);
      if (lastFocusedLightbox && typeof lastFocusedLightbox.focus === 'function') lastFocusedLightbox.focus();
    }, 260);
  }

  function handleLightboxKeys(e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (lightboxIndex - 1 + filteredCerts.length) % filteredCerts.length;
      updateLightboxContent(prev);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (lightboxIndex + 1) % filteredCerts.length;
      updateLightboxContent(next);
    }
  }

  function trapLightboxFocus(e) {
    if (!lightbox || lightbox.hidden || e.key !== 'Tab') return;
    const focusable = lightbox.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (lightbox) {
    lightbox.querySelectorAll('[data-close-lightbox]').forEach(el => {
      el.addEventListener('click', closeLightbox);
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    const nextBtn = lightbox.querySelector('[data-lightbox-next]');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      const prev = (lightboxIndex - 1 + filteredCerts.length) % filteredCerts.length;
      updateLightboxContent(prev);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const next = (lightboxIndex + 1) % filteredCerts.length;
      updateLightboxContent(next);
    });
  }

  /* =====================================================
     16. RESUME — VIEWER FALLBACK + PRINT + LAST UPDATED
     ===================================================== */
  const resumeFrame = document.getElementById('resumeFrame');
  const resumeFallback = document.getElementById('resumeFallback');
  const resumePrintBtn = document.getElementById('resumePrintBtn');

  // Show fallback if iframe fails to load / is blocked (common on mobile)
  // We use a timeout check: if iframe hasn't loaded in 2.5s, assume blocked and show fallback hint.
  // Fallback is also always accessible via buttons; not intrusive on desktop.
  if (resumeFrame && resumeFallback) {
    let loaded = false;
    resumeFrame.addEventListener('load', () => { loaded = true; });
    resumeFrame.addEventListener('error', () => {
      resumeFallback.classList.add('is-visible');
    });
    // Mobile heuristic: if browser is iOS where inline PDF is often blocked, show hint
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    if (isIOS && isMobile) {
      // Don't auto-show, but ensure fallback is discoverable — keep buttons prominent
    }
    // After 3s if not loaded and contentWindow inaccessible, show hint
    setTimeout(() => {
      try {
        // Try to access contentDocument; cross-origin PDF will throw, treat as loaded
        const doc = resumeFrame.contentDocument;
        if (!loaded && doc && doc.body && doc.body.innerHTML === '') {
          // Empty — likely blocked
          // Keep viewer but make fallback visible as helper bar
        }
      } catch (e) {
        // Cross-origin PDF loaded successfully (expected) -> do nothing
      }
    }, 3000);
  }

  if (resumePrintBtn && resumeFrame) {
    resumePrintBtn.addEventListener('click', () => {
      try {
        // Try to print iframe content (same-origin PDFs may allow)
        if (resumeFrame.contentWindow && typeof resumeFrame.contentWindow.print === 'function') {
          resumeFrame.contentWindow.focus();
          resumeFrame.contentWindow.print();
          return;
        }
      } catch (e) {
        // Fallback to opening in new tab
      }
      window.open(resumeFrame.src, '_blank', 'noopener');
    });
  }

  /* =====================================================
     17. PAGE LOADER — PKP glowing, <1.5s, respects reduced-motion
     ===================================================== */
  const pageLoader = document.getElementById('pageLoader');
  function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add('is-hidden');
    pageLoader.setAttribute('aria-hidden', 'true');
    // Remove from DOM after transition to free focus
    setTimeout(() => {
      if (pageLoader.parentNode) pageLoader.style.display = 'none';
    }, 500);
  }
  if (pageLoader) {
    if (prefersReducedMotion) {
      // Skip animation, hide quickly
      setTimeout(hideLoader, 300);
    } else {
      // Show at least 600ms, hide after window load or max 1.5s
      let loaded = false;
      window.addEventListener('load', () => { loaded = true; });
      const maxDelay = 1400;
      const minDelay = 600;
      const start = performance.now();
      function tryHide() {
        const elapsed = performance.now() - start;
        if (loaded && elapsed >= minDelay) hideLoader();
        else if (elapsed >= maxDelay) hideLoader();
        else setTimeout(tryHide, 80);
      }
      setTimeout(tryHide, minDelay);
    }
  }

  /* =====================================================
     18. SCROLL PROGRESS BAR (top) + BACK TO TOP (circular progress)
     ===================================================== */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTop = document.getElementById('backToTop');
  const backToTopFill = backToTop ? backToTop.querySelector('.back-to-top__fill') : null;
  const circumference = 2 * Math.PI * 22; // r=22
  if (backToTopFill) {
    backToTopFill.style.strokeDasharray = String(circumference);
    backToTopFill.style.strokeDashoffset = String(circumference);
  }
  let tickingProgress = false;
  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (window.scrollY / docHeight) : 0;
    const pct = Math.min(Math.max(scrolled, 0), 1);
    if (scrollProgressBar) {
      scrollProgressBar.style.width = (pct * 100) + '%';
    }
    if (backToTopFill) {
      const offset = circumference - (pct * circumference);
      backToTopFill.style.strokeDashoffset = String(offset);
    }
    // Show back-to-top after 400px
    if (backToTop) {
      const shouldShow = window.scrollY > 400;
      if (shouldShow && backToTop.hidden) {
        backToTop.hidden = false;
        requestAnimationFrame(() => backToTop.classList.add('is-visible'));
      } else if (!shouldShow && !backToTop.hidden) {
        backToTop.classList.remove('is-visible');
        setTimeout(() => { if (!backToTop.classList.contains('is-visible')) backToTop.hidden = true; }, 300);
      }
    }
    tickingProgress = false;
  }
  window.addEventListener('scroll', () => {
    if (!tickingProgress) {
      tickingProgress = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* =====================================================
     19. CURRENT YEAR IN FOOTER
     ===================================================== */
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }

  /* =====================================================
     20. TOAST + COPY EMAIL
     ===================================================== */
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast--success' : ''}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <span class="toast__icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span>${escapeHtml(message)}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 280ms ease forwards';
      setTimeout(() => toast.remove(), 320);
    }, 2200);
  }

  // Copy email buttons — [data-copy-email]
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = btn.getAttribute('data-copy-email') || document.getElementById('contactEmailValue')?.textContent?.trim() || '';
      if (!email || email.includes('[YOUR')) {
        showToast('Replace [YOUR-EMAIL-HERE] with your real email first', 'error');
        return;
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        // Visual feedback
        const orig = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        btn.setAttribute('aria-label', 'Email copied');
        showToast('Email copied!');
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.setAttribute('aria-label', 'Copy email address');
        }, 1600);
      } catch (err) {
        showToast('Copy failed — please select and copy manually', 'error');
      }
    });
  });

  /* =====================================================
     21. CONTACT FORM — VALIDATION + GLOWING FOCUS + FORM ENDPOINT
     ===================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactSubject = document.getElementById('contactSubject');
  const contactMessage = document.getElementById('contactMessage');
  const contactSubmit = document.getElementById('contactSubmit');
  const formStatus = document.getElementById('formStatus');
  const honeypot = document.getElementById('contactWebsite');

  function setFieldError(input, errorEl, message) {
    if (!input || !errorEl) return;
    if (message) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      errorEl.textContent = '';
    }
  }

  function validateName() {
    const el = contactName;
    const err = document.getElementById('errorName');
    if (!el) return true;
    const v = el.value.trim();
    if (!v) { setFieldError(el, err, 'Please enter your name'); return false; }
    if (v.length < 2) { setFieldError(el, err, 'Name must be at least 2 characters'); return false; }
    setFieldError(el, err, ''); return true;
  }
  function validateEmailField() {
    const el = contactEmail;
    const err = document.getElementById('errorEmail');
    if (!el) return true;
    const v = el.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) { setFieldError(el, err, 'Please enter your email'); return false; }
    if (!re.test(v)) { setFieldError(el, err, 'Please enter a valid email address'); return false; }
    setFieldError(el, err, ''); return true;
  }
  function validateSubject() {
    const el = contactSubject;
    const err = document.getElementById('errorSubject');
    if (!el) return true;
    const v = el.value.trim();
    if (!v) { setFieldError(el, err, 'Please enter a subject'); return false; }
    if (v.length < 3) { setFieldError(el, err, 'Subject must be at least 3 characters'); return false; }
    setFieldError(el, err, ''); return true;
  }
  function validateMessage() {
    const el = contactMessage;
    const err = document.getElementById('errorMessage');
    if (!el) return true;
    const v = el.value.trim();
    if (!v) { setFieldError(el, err, 'Please enter your message'); return false; }
    if (v.length < 10) { setFieldError(el, err, 'Message must be at least 10 characters'); return false; }
    setFieldError(el, err, ''); return true;
  }

  // Live validation on blur
  if (contactName) contactName.addEventListener('blur', validateName);
  if (contactEmail) contactEmail.addEventListener('blur', validateEmailField);
  if (contactSubject) contactSubject.addEventListener('blur', validateSubject);
  if (contactMessage) contactMessage.addEventListener('blur', validateMessage);
  // Clear error on input
  [contactName, contactEmail, contactSubject, contactMessage].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        // Re-validate live
        if (input === contactName) validateName();
        if (input === contactEmail) validateEmailField();
        if (input === contactSubject) validateSubject();
        if (input === contactMessage) validateMessage();
      }
    });
  });

  function setFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status is-visible ' + (type === 'success' ? 'form-status--success' : 'form-status--error');
    formStatus.setAttribute('role', type === 'success' ? 'status' : 'alert');
  }
  function clearFormStatus() {
    if (!formStatus) return;
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormStatus();

      // Honeypot check — if filled, treat as bot and silently succeed
      if (honeypot && honeypot.value.trim() !== '') {
        setFormStatus('Thanks! Your message has been received.', 'success');
        contactForm.reset();
        return;
      }

      const validName = validateName();
      const validEmail = validateEmailField();
      const validSubject = validateSubject();
      const validMessage = validateMessage();
      const allValid = validName && validEmail && validSubject && validMessage;
      if (!allValid) {
        setFormStatus('Please fix the highlighted fields and try again.', 'error');
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Check endpoint configured
      if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('[YOUR')) {
        setFormStatus('Form endpoint not configured. In js/main.js set FORM_ENDPOINT to your Formspree (https://formspree.io/f/xxxx) or Web3Forms (https://api.web3forms.com/submit) URL. See comment above FORM_ENDPOINT for steps.', 'error');
        return;
      }

      // Loading state
      if (contactSubmit) {
        contactSubmit.classList.add('is-loading');
        contactSubmit.disabled = true;
        const loader = contactSubmit.querySelector('.btn__loader');
        const text = contactSubmit.querySelector('.btn__text');
        if (loader) loader.hidden = false;
        if (text) text.hidden = true;
        contactSubmit.setAttribute('aria-busy', 'true');
      }

      try {
        const formData = new FormData(contactForm);
        // Remove honeypot from submission (some services ignore it)
        formData.delete('website');
        // For Web3Forms, user must have added hidden access_key input manually if needed
        // We do not add it automatically to keep Formspree compatible

        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        // Formspree returns JSON {ok:true}, Web3Forms returns {success:true}
        let ok = response.ok;
        try {
          const data = await response.clone().json();
          if (data && (data.ok === true || data.success === true)) ok = true;
          if (data && data.errors) ok = false;
        } catch (_) { /* ignore parse error, use response.ok */ }

        if (ok) {
          setFormStatus('Message sent successfully! I’ll reply within 24 hours. ✨', 'success');
          showToast('Message sent — thank you!');
          contactForm.reset();
        } else {
          const text = await response.text().catch(() => '');
          throw new Error(text || `Request failed (${response.status})`);
        }
      } catch (err) {
        setFormStatus('Sorry, something went wrong. Please try again or email me directly at ' + (document.getElementById('contactEmailValue')?.textContent?.trim() || '[YOUR-EMAIL-HERE]') + '.', 'error');
        console.error('Form submit error:', err);
      } finally {
        if (contactSubmit) {
          contactSubmit.classList.remove('is-loading');
          contactSubmit.disabled = false;
          const loader = contactSubmit.querySelector('.btn__loader');
          const text = contactSubmit.querySelector('.btn__text');
          if (loader) loader.hidden = true;
          if (text) text.hidden = false;
          contactSubmit.removeAttribute('aria-busy');
        }
      }
    });
  }

  /* =====================================================
     22. SITE-WIDE ANIMATIONS POLISH — staggered reveals
     ===================================================== */
  // Add small stagger to grids so items fade in one by one (already has .reveal)
  // We keep transform/opacity only and respect reduced-motion
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const staggeredGrids = document.querySelectorAll('.certificates__grid, .projects__grid, .skills__grid, .about__stats');
    staggeredGrids.forEach(grid => {
      const items = grid.querySelectorAll('.reveal');
      items.forEach((item, i) => {
        item.style.transitionDelay = `${Math.min(i * 70, 400)}ms`;
      });
    });
  }

  // Small console hint for dev
  console.log('%c Phase 5 loaded ✓ — Contact + Footer + Animations ', 'background: linear-gradient(135deg,#7C3AED,#06B6D4); color:white; padding:4px 10px; border-radius:6px; font-weight:600;');
  console.log('Theme:', getPreferredTheme(), '| Touch:', isTouchDevice, '| ReducedMotion:', prefersReducedMotion);
  console.log('Form endpoint:', FORM_ENDPOINT.includes('[YOUR') ? '(not configured — set FORM_ENDPOINT)' : FORM_ENDPOINT);
})();
