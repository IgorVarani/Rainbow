let slides = document.querySelectorAll(".slide");
let index = 0;

const botaoAnterior = document.getElementById("bAnterior");
const botaoProximo = document.getElementById("bProximo");

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

    if (index >= slides.length)
    {
        index = 0;
    }

    mostrarSlide(index);
});

botaoAnterior.addEventListener("click", () =>
{
    index--;

    if (index < 0)
    {
        index = slides.length - 1;
    }

    mostrarSlide(index);
});