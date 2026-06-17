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

})

