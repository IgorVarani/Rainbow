const botaoIniciar = document.getElementById("botao-iniciar-pedido");
const modal = document.getElementById("div-pedido");
const botaoFechar = document.getElementById("botao-fechar-pedido");

function usuarioEstaLogado()
{
    return localStorage.getItem("usuarioLogado") !== null;
}

function abrirModal()
{
    if (modal) modal.classList.remove("oculto");
}

function fecharModal()
{
    if (modal) modal.classList.add("oculto");
}

if (botaoIniciar)
{
    botaoIniciar.addEventListener("click", () =>
    {
        if (!usuarioEstaLogado())
        {
            alert("Você precisa estar logado para fazer um pedido! Junte-se a nós e descubra cores de sabores incríveis!");
            window.location.href = "/pages/login.html";
            return;
        }
        abrirModal();
    });
}

if (botaoFechar)
{
    botaoFechar.addEventListener("click", fecharModal);
}