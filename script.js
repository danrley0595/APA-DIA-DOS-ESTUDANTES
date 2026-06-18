document.addEventListener('DOMContentLoaded', function () {
  let sectionsOcultos = document.querySelectorAll('.oculto');
  let btnChangeTheme = document.getElementById('btn-dark');

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

  enableListeners();
  criarIndicadores();

  function checkScroll() {
    let alturaJanela = window.innerHeight;

    sectionsOcultos.forEach((section) => {
      const alturaSection = section.getBoundingClientRect().top;
      if (alturaSection < alturaJanela) {
        section.classList.add('ativo');
      }
    });
  }

  function alterarTema() {
    document.documentElement.classList.toggle('dark');
  }

  function enableListeners() {
    window.addEventListener('scroll', checkScroll);
    btnChangeTheme.addEventListener('click', alterarTema);
    checkScroll();
  }

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
      img.style.display = 'none';
      video.muted = true;
      video.play();
    }

    const indicadores = document.querySelectorAll('#indicadores span');
    indicadores.forEach(function (ponto, i) {
      ponto.classList.toggle('ativo', i === indice);
    });
  }

  function criarIndicadores() {
    const indicadores = document.getElementById('indicadores');

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

  // Menu hamburguer
  const btnHamburguer = document.getElementById('btn-hamburguer');
  const btnFechar = document.getElementById('btn-fechar');
  const navMobile = document.getElementById('nav-mobile');
  const btnDarkMobile = document.getElementById('btn-dark-mobile');

  btnHamburguer.addEventListener('click', function (e) {
    e.stopPropagation();
    navMobile.classList.toggle('aberto');
  });

  btnFechar.addEventListener('click', function () {
    navMobile.classList.remove('aberto');
  });

  // Fecha ao clicar fora do modal
  document.addEventListener('click', function (e) {
    if (!navMobile.contains(e.target) && !btnHamburguer.contains(e.target)) {
      navMobile.classList.remove('aberto');
    }
  });

  // Fecha ao clicar em um link
  document
    .querySelectorAll('.nav--mobile__links .nav__link')
    .forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('aberto');
      });
    });

  // Botão modo escuro do menu mobile
  btnDarkMobile.addEventListener('click', alterarTema);
});
