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


//? Fechar o menu ao pressionar a tecla "Escape".
document.addEventListener("keydown", (e) =>
{
    if (e.key === "Escape") {
        nav.classList.remove("ativo");
        overlay.classList.remove("ativo");
    }
});

//? Fechar o menu ao clicar no botão "X".
let botaoFechar = document.getElementById("botao-fechar-menu");

botaoFechar.addEventListener("click", () =>
{
    nav.classList.remove("ativo");
    overlay.classList.remove("ativo");
});

//? Abrir o FAQ.
let botaoFaqMenu = document.getElementById("botao-faq-menu");
let faq = document.getElementById("div-faq");

botaoFaqMenu.addEventListener("click", () =>
{
    faq.classList.remove("oculto");

    nav.classList.remove("ativo");
    overlay.classList.remove("ativo");
});