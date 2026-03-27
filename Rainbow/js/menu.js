let botaoAbrir = document.getElementById("botao-menu");
let nav = document.getElementById("nav-menu");

botaoAbrir.addEventListener("click", () =>
{
    nav.classList.toggle("ativo");
});

document.addEventListener("click", (e) =>
{
    if (!nav.contains(e.target) && e.target !== botaoAbrir)
    {
        nav.classList.remove("ativo");
    }
});