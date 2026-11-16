/* GratteSky — interactions : menu mobile, filtres projets, formulaire de contact. */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  var closeBtn = menu ? menu.querySelector('.menu-close') : null;

  function setMenu(open) {
    if (!menu || !menuBtn) { return; }
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && closeBtn) { closeBtn.focus(); } else { menuBtn.focus(); }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(true); });
    if (closeBtn) { closeBtn.addEventListener('click', function () { setMenu(false); }); }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); }
    });
  }

  /* ---------- Filtres de la page Projets ---------- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.card');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var seg = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      cards.forEach(function (c) {
        c.hidden = !(seg === 'all' || c.getAttribute('data-segment') === seg);
      });
    });
  });

  /* ---------- Formulaire de contact ---------- */
  var wrapper = document.querySelector('.contact__form');
  var form = document.getElementById('contact-form');
  if (!form) { return; }

  var MESSAGES = {
    name: 'Indiquez votre nom.',
    email: 'Indiquez une adresse e-mail valide.',
    phone: 'Indiquez un numéro de téléphone valide.',
    profile: 'Choisissez un profil.',
    place: 'Indiquez le lieu du projet.',
    message: 'Décrivez votre projet en 40 caractères au moins.',
    consent: 'Cochez cette case pour envoyer votre message.'
  };

  function isValid(key, el) {
    var v = (el.type === 'checkbox') ? el.checked : el.value.trim();
    switch (key) {
      case 'name': return v.length > 0;
      case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      case 'phone': return v === '' || /^[+()\d\s.\-]{6,}$/.test(v);
      case 'profile': return v !== '';
      case 'place': return v.length > 0;
      case 'message': return v.length >= 40;
      case 'consent': return v === true;
    }
    return true;
  }

  function setState(field, key, el, ok, showValid) {
    var err = field.querySelector('.msg');
    field.classList.toggle('has-error', !ok);
    field.classList.toggle('is-valid', ok && showValid);
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (err && !ok) { err.textContent = MESSAGES[key]; }
  }

  var inputs = form.querySelectorAll('[data-key]');

  inputs.forEach(function (el) {
    var key = el.getAttribute('data-key');
    var field = el.closest('.field');
    el.addEventListener('blur', function () {
      var empty = (el.type === 'checkbox') ? false : el.value.trim() === '';
      if (empty && !field.classList.contains('has-error')) { return; }
      var ok = isValid(key, el);
      setState(field, key, el, ok, !empty && key !== 'consent');
    });
    el.addEventListener('input', function () {
      if (field.classList.contains('has-error') && isValid(key, el)) { setState(field, key, el, true, false); }
    });
    el.addEventListener('change', function () {
      if (el.type === 'checkbox' || el.tagName === 'SELECT') {
        var ok = isValid(key, el);
        setState(field, key, el, ok, ok && key !== 'consent');
      }
    });
  });

  var formError = form.querySelector('.form-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    inputs.forEach(function (el) {
      var key = el.getAttribute('data-key');
      var ok = isValid(key, el);
      setState(el.closest('.field'), key, el, ok, ok && key !== 'consent' && el.value !== undefined && String(el.value).trim() !== '');
      if (!ok && !firstBad) { firstBad = el; }
    });
    if (firstBad) { firstBad.focus(); return; }
    /* Aucun envoi réel dans cette maquette : brancher l'action du formulaire (Webflow Forms, e-mail, CRM). */
    if (formError) { formError.classList.remove('is-visible'); }
    wrapper.classList.add('is-sent');
    var title = wrapper.querySelector('.form-success h2');
    if (title) { title.setAttribute('tabindex', '-1'); title.focus(); }
  });

  var again = wrapper ? wrapper.querySelector('.js-again') : null;
  if (again) {
    again.addEventListener('click', function () {
      form.reset();
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('has-error', 'is-valid'); });
      inputs.forEach(function (el) { el.setAttribute('aria-invalid', 'false'); });
      wrapper.classList.remove('is-sent');
      inputs[0].focus();
    });
  }
})();
