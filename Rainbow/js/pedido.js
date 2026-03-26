let botaoIniciar = document.getElementById("iniciarPedido");
let modal = document.getElementById("modalPedido");
let fechar = document.getElementById("fecharPedido");

botaoIniciar.addEventListener("click", () =>
{
    modal.classList.remove("oculto");
});

fechar.addEventListener("click", () =>
{
    modal.classList.add("oculto");
});