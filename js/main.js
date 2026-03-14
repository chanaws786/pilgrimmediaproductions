/* ============================================================
   PILGRIM MEDIA PRODUCTIONS — Main JavaScript
   ============================================================ */

// ── Mobile nav toggle ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('main-nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    // Animate spans
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
}());

// ── Sticky header background enhancement ──
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.style.background = 'rgba(13,13,13,0.98)';
    } else {
      header.style.background = 'rgba(13,13,13,0.92)';
    }
  }, { passive: true });
}());

// ── Scroll-reveal animation ──
(function () {
  var revealElements = document.querySelectorAll(
    '.service-card, .project-card, .blog-card, .store-card, .why-point, .value-item, .stat-item, .contact-item'
  );

  if (!revealElements.length) return;

  // Apply initial state
  revealElements.forEach(function (el, i) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 4 * 0.08) + 's, transform 0.5s ease ' + (i % 4 * 0.08) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}());

// ── Newsletter form handler ──
function handleNewsletterSubmit(e) {
  e.preventDefault();
  var form  = e.target;
  var input = form.querySelector('input[type="email"]');
  var btn   = form.querySelector('button');

  btn.textContent = 'Subscribed!';
  btn.disabled    = true;
  input.value     = '';

  setTimeout(function () {
    btn.textContent = 'Subscribe';
    btn.disabled    = false;
  }, 3000);
}

// ── Contact form handler ──
function handleContactSubmit(e) {
  e.preventDefault();
  var form    = e.target;
  var success = document.getElementById('form-success');
  var btn     = form.querySelector('button[type="submit"]');

  btn.textContent = 'Sending...';
  btn.disabled    = true;

  // Simulate async send
  setTimeout(function () {
    btn.textContent = 'Message Sent!';
    if (success) success.style.display = 'block';
    form.reset();

    setTimeout(function () {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      if (success) success.style.display = 'none';
    }, 5000);
  }, 800);
}

// ── Smooth anchor scrolling ──
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
