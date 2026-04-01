//? Redefinir senha.
let tentativasLogin = 0;

function registrarErroLogin()
{
    tentativasLogin++;

    if (tentativasLogin >= 1)
    {
        mostrarEsqueciSenha();
    }
}

function mostrarEsqueciSenha()
{
    const botao = document.getElementById("botao-esqueci");

    if (botao)
    {
        botao.style.display = "block";
    }
}

//? Click do botão "Esqueci minha senha".
document.getElementById("botao-esqueci").addEventListener("click", () =>
{
    document.getElementById("modal-recuperar-senha").style.display = "flex";
});

document.getElementById("fechar-modal").addEventListener("click", () =>
{
    document.getElementById("modal-recuperar-senha").style.display = "none";
});

window.addEventListener("click", (e) =>
{
    if (e.target.id === "modal-recuperar-senha")
    {
        document.getElementById("modal-recuperar-senha").style.display = "none";
    }
});

//? Click do botão de enviar nova senha.
document.getElementById("enviar-recuperar").addEventListener("click", () =>
{
    const email = document.getElementById("email-recuperar").value.trim().toLowerCase();
    const novaSenha = document.getElementById("nova-senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-nova-senha").value.trim();

    if (!email || !novaSenha || !confirmarSenha)
    {
        alert("Preencha todos os campos!");
        return;
    }

    if (novaSenha.length < 6)
    {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (novaSenha !== confirmarSenha)
    {
        alert("As senhas não coincidem.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email.toLowerCase() === email);

    if (!usuario)
    {
        alert("E-mail não encontrado.");
        return;
    }

    usuario.senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Senha redefinida com sucesso!");

    document.getElementById("modal-recuperar-senha").style.display = "none";
    document.getElementById("email-recuperar").value = "";
    document.getElementById("nova-senha").value = "";
    document.getElementById("confirmar-nova-senha").value = "";
});


//? Submit do formulário de login.
document.querySelector("#form-login").addEventListener("submit", function(e)
{
    e.preventDefault();

    let emailInput = document.getElementById("email").value;
    let senhaInput = document.getElementById("senha").value;

    //* Verificações genéricas dos Shoulds Bes.
    if (!emailInput || !senhaInput)
    {
        alert("Preencha todos os campos para unir-se ao RGB!");
        return;
    }

    //* Detectar espaços.
    if (emailInput !== emailInput.trim())
    {
        alert("O e-mail não pode conter espaços no início ou fim. Fique atento, os e-mails coloridos não gostam de espaços!");
        return;
    }

    if (senhaInput !== senhaInput.trim())
    {
        alert("A senha não pode conter espaços no início ou fim. Fique atento, as senhas coloridas não gostam de espaços!");
        return;
    }

    const email = emailInput.trim().toLowerCase();
    const senha = senhaInput.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //* Nenhum usuário cadastrado.
    if (usuarios.length === 0)
    {
        alert("Nenhum usuário cadastrado. Crie uma conta, aproveite as cores e junte-se ao RGB!");
        return;
    }

    //* Verificar se o email existe.
    const usuarioEmail = usuarios.find(u => 
        u.email.toLowerCase() === email
    );

    if (!usuarioEmail)
    {
        alert("E-mail não encontrado, tente novamente meu amigo de arco-íris!");
        registrarErroLogin();
        return;
    }

    //* Verificar senha separadamente.
    if (usuarioEmail.senha !== senha)
    {
        alert("Senha incorreta, não é colorida o suficiente. Tente novamente!");
        registrarErroLogin();
        return;
    }

    //* Login bem-sucedido.
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEmail));

    alert(`Bem-vindo, ${usuarioEmail.nome}!`);

    window.location.href = "/index.html";
});