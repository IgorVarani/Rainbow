let botaoIniciar = document.getElementById("botao-iniciar-pedido");
let modal = document.getElementById("div-pedido");
let fechar = document.getElementById("botao-fechar-pedido");

botaoIniciar.addEventListener("click", () =>
{
    modal.classList.remove("oculto");
});

fechar.addEventListener("click", () =>
{
    modal.classList.add("oculto");
});