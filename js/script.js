/* ============================================================
   «Флора» — интерактивность сайта
   ============================================================ */

(function () {
  'use strict';

  /* Помечаем, что JS работает: CSS прячет reveal-элементы
     только при наличии этого класса. Без JS контент виден сразу. */
  document.documentElement.classList.add('js');

  /* ---------- Шапка: фон при скролле ---------- */

  const header = document.getElementById('header');

  function toggleHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', toggleHeader, { passive: true });
  toggleHeader();

  /* ---------- Мобильное меню ---------- */

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function closeMenu() {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-locked');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  }

  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-locked', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Закрываем меню при клике по ссылке
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Закрываем меню по Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ---------- Появление элементов при скролле ---------- */

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Кнопка «наверх» ---------- */

  const toTop = document.getElementById('toTop');

  window.addEventListener(
    'scroll',
    function () {
      toTop.classList.toggle('is-visible', window.scrollY > 560);
    },
    { passive: true }
  );

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Демо-обработчик формы ---------- */

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Статический сайт: реальной отправки нет.
      // Подключите свой бэкенд или сервис типа Formspree:
      // form.action = 'https://formspree.io/f/ВАШ_ID';
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Отправляем…';

      setTimeout(function () {
        note.hidden = false;
        form.reset();
        button.disabled = false;
        button.textContent = 'Отправить заявку';
      }, 700);
    });
  }

  /* ---------- Плавный скролл с учётом фиксированной шапки ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = header.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
