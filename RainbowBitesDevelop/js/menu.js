let botao = document.getElementById("botao-menu");
let nav = document.getElementById("nav-menu");
let overlay = document.getElementById("div-menu");

botao.addEventListener("click", () =>
{
    nav.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
});

overlay.addEventListener("click", (e) =>
{
    if (!nav.contains(e.target))
    {
        nav.classList.remove("ativo");
        overlay.classList.remove("ativo");
    }
});