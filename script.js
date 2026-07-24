(function () {
  'use strict';

  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-list a');
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  /* Header scroll shadow */
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function toggleMenu(forceClose) {
    const isOpen = forceClose === true ? false : !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', isOpen);
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', function () {
    toggleMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true);
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id], .hero');

  function setActiveNav() {
    const scrollPos = window.scrollY + header.offsetHeight + 40;

    sections.forEach(function (section) {
      const id = section.id;
      if (!id) return;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* Contact form */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      formNote.className = 'form-note';

      if (!name || !email || !message) {
        formNote.textContent = 'すべての項目を入力してください。';
        formNote.classList.add('is-error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = '正しいメールアドレスを入力してください。';
        formNote.classList.add('is-error');
        return;
      }

      formNote.textContent = 'お問い合わせありがとうございます。内容を確認のうえ、ご連絡いたします。';
      formNote.classList.add('is-success');
      contactForm.reset();
    });
  }

  /* Collection image fade-in */
  const collectionItems = document.querySelectorAll('.collection-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    collectionItems.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }

  /* FAQ — close others when one opens */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.open = false;
          }
        });
      }
    });
  });
})();
