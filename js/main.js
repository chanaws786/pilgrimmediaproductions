/* ============================================================
   PILGRIM MEDIA PRODUCTIONS — Main JavaScript (Modern)
   ============================================================ */

/* ── Reading Progress Bar ── */
(function () {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var scrollTop  = window.scrollY;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}());

/* ── Smart Sticky Header (hide on scroll down, show on scroll up) ── */
(function () {
  var header   = document.querySelector('.site-header');
  if (!header) return;
  var lastY    = 0;
  var delta    = 8;

  window.addEventListener('scroll', function () {
    var currentY = window.scrollY;

    if (currentY < 100) {
      header.classList.remove('hidden', 'scrolled');
    } else if (currentY > lastY + delta) {
      header.classList.add('hidden');
    } else if (currentY < lastY - delta) {
      header.classList.remove('hidden');
      header.classList.add('scrolled');
    }
    lastY = currentY;
  }, { passive: true });
}());

/* ── Mobile nav toggle ── */
(function () {
  var hamburger = document.getElementById('hamburger');
  var nav       = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    var spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    }
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      var spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    });
  });
}());

/* ── Back to Top ── */
(function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

/* ── Scroll Reveal ── */
(function () {
  var els = document.querySelectorAll(
    '.service-card, .project-card, .blog-card, .store-card, ' +
    '.why-point, .value-item, .stat-item, .contact-item, ' +
    '.testimonial-card, .process-step, .trust-item, .wvc-light, .wvc-dark'
  );

  if (!els.length || !window.IntersectionObserver) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 5) * 0.07 + 's';
    observer.observe(el);
  });
}());

/* ── Animated Number Counters ── */
(function () {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length || !window.IntersectionObserver) return;

  function animateCount(el) {
    var target   = parseFloat(el.getAttribute('data-count'));
    var suffix   = el.getAttribute('data-suffix') || '';
    var prefix   = el.getAttribute('data-prefix') || '';
    var isFloat  = el.getAttribute('data-float') === 'true';
    var duration = 1800;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      var value    = target * ease;
      el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
}());

/* ── Newsletter form handler ── */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  var form  = e.target;
  var input = form.querySelector('input[type="email"]');
  var btn   = form.querySelector('button');

  btn.textContent = 'Subscribed! ✓';
  btn.disabled    = true;
  input.value     = '';

  setTimeout(function () {
    btn.textContent = 'Subscribe';
    btn.disabled    = false;
  }, 3500);
}

/* ── Contact form handler ── */
function handleContactSubmit(e) {
  e.preventDefault();
  var form    = e.target;
  var success = document.getElementById('form-success');
  var btn     = form.querySelector('button[type="submit"]');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(function () {
    btn.textContent = 'Message Sent!';
    if (success) success.style.display = 'flex';
    form.reset();

    setTimeout(function () {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      if (success) success.style.display = 'none';
    }, 5000);
  }, 900);
}

/* ── Dropdown: toggle on click (mobile) + close on outside click (desktop) ── */
(function () {
  var hasDropdowns = document.querySelectorAll('.has-dropdown');
  if (!hasDropdowns.length) return;

  hasDropdowns.forEach(function (item) {
    var toggle = item.querySelector('a');
    var dropdown = item.querySelector('.dropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function (e) {
      // Only intercept on mobile (hamburger visible)
      var hamburger = document.getElementById('hamburger');
      if (!hamburger || getComputedStyle(hamburger).display === 'none') return;
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
  });

  // Close all dropdowns when clicking outside on desktop
  document.addEventListener('click', function (e) {
    hasDropdowns.forEach(function (item) {
      if (!item.contains(e.target)) {
        item.querySelector('.dropdown').classList.remove('open');
      }
    });
  });
}());

/* ── Smooth anchor scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 88;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ── Active nav section detection ── */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (s) { observer.observe(s); });
}());
