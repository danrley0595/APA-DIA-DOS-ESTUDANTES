document.addEventListener('DOMContentLoaded', function () {
  // ── Modo Escuro ──────────────────────────────────────────
  const btnDark = document.getElementById('btn-dark');
  const btnDarkMobile = document.getElementById('btn-dark-mobile');

  function alterarTema() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    const label = isDark ? 'Modo Claro' : 'Modo Escuro';
    if (btnDark) btnDark.textContent = label;
    if (btnDarkMobile) btnDarkMobile.textContent = label;
  }

  if (btnDark) btnDark.addEventListener('click', alterarTema);
  if (btnDarkMobile) btnDarkMobile.addEventListener('click', alterarTema);

  // ── Scroll Reveal (IntersectionObserver) ─────────────────
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('ativo');
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.oculto').forEach(function (el) {
    observer.observe(el);
  });

  // ── Link ativo no nav conforme scroll ────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener(
    'scroll',
    function () {
      let current = '';
      sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      navLinks.forEach(function (l) {
        l.classList.remove('is-active');
        if (l.getAttribute('href') === '#' + current) {
          l.classList.add('is-active');
        }
      });
    },
    { passive: true }
  );

  // ── Menu Hamburguer ───────────────────────────────────────
  const btnHamburguer = document.getElementById('btn-hamburguer');
  const btnFechar = document.getElementById('btn-fechar');
  const navMobile = document.getElementById('nav-mobile');

  if (btnHamburguer) {
    btnHamburguer.addEventListener('click', function (e) {
      e.stopPropagation();
      navMobile.classList.toggle('aberto');
    });
  }

  if (btnFechar) {
    btnFechar.addEventListener('click', function () {
      navMobile.classList.remove('aberto');
    });
  }

  document
    .querySelectorAll('.nav--mobile__links .nav__link')
    .forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('aberto');
      });
    });

  document.addEventListener('click', function (e) {
    if (
      navMobile &&
      !navMobile.contains(e.target) &&
      !btnHamburguer.contains(e.target)
    ) {
      navMobile.classList.remove('aberto');
    }
  });

  // ── Carrossel ─────────────────────────────────────────────
  const imagens = [
    { tipo: 'imagem', arquivo: 'assets/publicidade01.jpeg' },
    { tipo: 'imagem', arquivo: 'assets/publicidade02.jpeg' },
    { tipo: 'imagem', arquivo: 'assets/publicidade03.jpeg' },
    { tipo: 'imagem', arquivo: 'assets/publicidade04.jpeg' },
    { tipo: 'imagem', arquivo: 'assets/publicidade05.jpeg' },
    { tipo: 'imagem', arquivo: 'assets/publicidade06.jpg' },
    { tipo: 'video', arquivo: 'assets/publicidade.mp4' },
  ];

  let indice = 0;

  function atualizarSlide() {
    const img = document.getElementById('slide');
    const video = document.getElementById('slide-video');
    const midia = imagens[indice];

    if (midia.tipo === 'imagem') {
      img.src = midia.arquivo;
      img.style.display = 'block';
      video.style.display = 'none';
      video.pause();
    } else if (midia.tipo === 'video') {
      video.src = midia.arquivo;
      video.style.display = 'block';
      video.muted = true;
      video.play();
      img.style.display = 'none';
    }

    document.querySelectorAll('#indicadores span').forEach(function (ponto, i) {
      ponto.classList.toggle('ativo', i === indice);
    });
  }

  function criarIndicadores() {
    const indicadores = document.getElementById('indicadores');
    if (!indicadores) return;

    imagens.forEach(function (_, index) {
      const ponto = document.createElement('span');
      if (index === 0) ponto.classList.add('ativo');
      ponto.addEventListener('click', function () {
        indice = index;
        atualizarSlide();
      });
      indicadores.appendChild(ponto);
    });

    setTimeout(function () {
      function proximoSlide() {
        const midia = imagens[indice];
        const tempo = midia.tipo === 'video' ? 8000 : 8000;
        setTimeout(function () {
          indice = (indice + 1) % imagens.length;
          atualizarSlide();
          proximoSlide();
        }, tempo);
      }
      proximoSlide();
    }, 2000);
  }

  criarIndicadores();
});
