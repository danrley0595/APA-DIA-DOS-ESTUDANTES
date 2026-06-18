document.addEventListener("DOMContentLoaded", function () {
    let sectionsOcultos = document.querySelectorAll('.oculto');
    let btnChangeTheme = document.getElementById("btn-dark");
    console.log(sectionsOcultos);
    enableListeners();

    function checkScroll() {
        let alturaJanela = window.innerHeight;

        sectionsOcultos.forEach((section) => {
            const alturaSection = section.getBoundingClientRect().top;
            console.log(alturaSection);
            if (alturaSection < alturaJanela) {
                section.classList.add('ativo');
            }

        });

    }

    function alterarTema() {
        document.documentElement.classList.toggle("dark");
    }

    function enableListeners() {
        window.addEventListener("scroll", checkScroll);
        btnChangeTheme.addEventListener("click", alterarTema);
    }

    document.querySelectorAll('.slideshow').forEach(function(container) {

  const slides = container.querySelectorAll('.slide');
  const dotsEl = container.querySelector('.slide__dots');
  let atual = 0;
  let intervalo;

  // Cria dots automaticamente
  slides.forEach(function(_, i) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
    d.addEventListener('click', function() { irPara(i); religar(); });
    dotsEl.appendChild(d);
  });

  function irPara(n) {
    // pausa vídeo ao sair do slide
    const vid = slides[atual].querySelector('video');
    if (vid) vid.pause();

    slides[atual].classList.remove('is-active');
    dotsEl.children[atual].classList.remove('is-active');
    atual = (n + slides.length) % slides.length;
    slides[atual].classList.add('is-active');
    dotsEl.children[atual].classList.add('is-active');
  }

  function iniciarAutoplay() {
    intervalo = setInterval(function() {
      const vid = slides[atual].querySelector('video');
      if (!vid || vid.paused) irPara(atual + 1);
    }, 5000); // avança a cada 5 segundos
  }

  function religar() {
    clearInterval(intervalo);
    // espera 4s depois de interação manual
    setTimeout(function() {
      iniciarAutoplay();
    }, 4000);
  }

  // Setas
  const prev = container.querySelector('.slide__prev');
  const next = container.querySelector('.slide__next');
  if (prev) prev.addEventListener('click', function() { irPara(atual - 1); religar(); });
  if (next) next.addEventListener('click', function() { irPara(atual + 1); religar(); });

  // Pausa ao passar o mouse
  container.addEventListener('mouseenter', function() { clearInterval(intervalo); });
  container.addEventListener('mouseleave', iniciarAutoplay);

  iniciarAutoplay(); // inicia ao carregar
});

})
