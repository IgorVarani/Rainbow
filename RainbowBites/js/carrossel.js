const carrosseis = document.querySelectorAll(".div-carrossel");

carrosseis.forEach(carrossel =>
{
    let slides = carrossel.querySelectorAll(".slide");
    let index = 0;

    const botaoAnterior = carrossel.querySelector(".botao-anterior");
    const botaoProximo = carrossel.querySelector(".botao-proximo");

    function mostrarSlide(i)
    {
        slides.forEach(slide =>
        {
            slide.classList.remove("ativo");
        });

        slides[i].classList.add("ativo");
    }

    botaoProximo.addEventListener("click", () =>
    {
        index++;
        if (index >= slides.length) index = 0;
        mostrarSlide(index);
    });

    botaoAnterior.addEventListener("click", () =>
    {
        index--;
        if (index < 0) index = slides.length - 1;
        mostrarSlide(index);
    });

    setInterval(() =>
    {
        index++;
        if (index >= slides.length) index = 0;
        mostrarSlide(index);
    }, 5000);
});