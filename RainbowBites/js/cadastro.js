document.querySelector("#form-cadastro").addEventListener("submit", function(e)
{
    e.preventDefault();

    let nomeInput = document.getElementById("nome").value;
    let emailInput = document.getElementById("email").value;
    let senhaInput = document.getElementById("senha").value;
    let confirmarSenhaInput = document.getElementById("confirmarSenha").value;

    //* Campos vazios.
    if (!nomeInput || !emailInput || !senhaInput || !confirmarSenhaInput)
    {
        alert("Preencha todos os campos! As cores do arco-íris adoram a diversidade, mas não gostam de campos vazios.");
        return;
    }

    //* Espaços indevidos.
    if (nomeInput !== nomeInput.trim())
    {
        alert("O nome não pode conter espaços no início ou fim. As cores do arco-íris preferem a harmonia, e os espaços desnecessários são chatos.");
        return;
    }

    if (emailInput !== emailInput.trim())
    {
        alert("O e-mail não pode conter espaços no início ou fim. As cores do arco-íris preferem a harmonia, e os espaços desnecessários são chatos.");
        return;
    }

    //* Normalização.
    const nome = nomeInput.trim();
    const email = emailInput.trim().toLowerCase();
    const senha = senhaInput.trim();
    const confirmarSenha = confirmarSenhaInput.trim();

    //* Validar usuário.
    if (nome.length > 12)
    {
        alert("O nome deve ter no máximo 12 caracteres.");
        return;
    }

    if (nome.length < 3)
    {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    //* Validar senha.
    if (senha.length < 6)
    {
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    if (senha !== confirmarSenha)
    {
        alert("As senhas não coincidem! O campo Confirmar Senha não gosta de confusão na harmonia das cores.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //* Verificar duplicidade de email.
    const emailExistente = usuarios.find(u => 
        u.email.toLowerCase() === email
    );

    if (emailExistente)
    {
        alert("Já existe uma conta com esse e-mail! Você provavelmente já é de casa, tente fazer login.");
        return;
    }

    //* Criar novo usuário.
    const novoUsuario =
    {
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Seja bem-vindo(a) ao mundo colorido, " + nome + "!");

    window.location.href = "/pages/login.html";
});