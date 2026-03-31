const botaoLogin = document.getElementById("botao-login-header");
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (usuarioLogado)
{
    botaoLogin.innerHTML = `<i class="fa-solid fa-user"></i>${usuarioLogado.nome}`;

    botaoLogin.addEventListener("click", () =>
    {
        const confirmar = confirm("Deseja sair do Rainbow?");

        if (confirmar)
        {
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("logado");
            window.location.reload();
        }
    });

}
else
{
    botaoLogin.textContent = "Entrar";

    botaoLogin.addEventListener("click", () =>
    {
        window.location.href = "/pages/login.html";
    });
}