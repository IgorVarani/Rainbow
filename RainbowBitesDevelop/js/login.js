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
        return;
    }

    //* Verificar senha separadamente.
    if (usuarioEmail.senha !== senha)
    {
        alert("Senha incorreta, não é colorida o suficiente. Tente novamente!");
        return;
    }

    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEmail));

    alert(`Bem-vindo, ${usuarioEmail.nome}!`);

    window.location.href = "/index.html";
});