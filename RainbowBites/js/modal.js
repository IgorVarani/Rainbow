function abrirModal(modal)
{
    if (modal)
    {
        modal.classList.remove("oculto");
        document.body.classList.add("modal-aberto");
    }
}

function fecharModal(modal)
{
    if (modal)
    {
        modal.classList.add("oculto");

        const algumModalAberto = document.querySelector(
            "#div-pedido:not(.oculto), #div-faq:not(.oculto), #div-carrinho:not(.oculto)"
        );

        if (!algumModalAberto)
        {
            document.body.classList.remove("modal-aberto");
        }
    }
}

//? ===================
//?       PEDIDO
//? ===================

//? Resetar ao usar o botão fechar.
function resetarPedidoCompleto()
{
    carrinho = [];

    const lista = document.getElementById("itens-carrinho");
    const totalEl = document.getElementById("total-carrinho");

    if (lista) lista.innerHTML = "";
    if (totalEl) totalEl.textContent = "Total: R$0.00";

    if (inputCep) inputCep.value = "";
    if (resultadoEndereco) resultadoEndereco.innerHTML = "";

    resetarEtapas();

    localStorage.removeItem("frete");
    localStorage.removeItem("endereco");
    localStorage.removeItem("tipoPedido");
}

//? ViaCEP.
const btnBuscarCep = document.getElementById("btn-buscar-cep");
const inputCep = document.getElementById("input-cep");
const resultadoEndereco = document.getElementById("resultado-endereco");

const cidadesPermitidas = [
    "Santo André",
    "São Bernardo do Campo",
    "São Caetano do Sul",
    "Diadema",
    "Mauá",
    "Ribeirão Pires",
    "Rio Grande da Serra"
];

function calcularFrete(cidade)
{
    switch(cidade)
    {
        case "São Caetano do Sul": return 5;
        case "Santo André": return 8;
        case "São Bernardo do Campo": return 10;
        case "Diadema": return 12;
        case "Mauá": return 15;
        case "Ribeirão Pires": return 18;
        case "Rio Grande da Serra": return 20;
        default: return null;
    }
}

if (btnBuscarCep)
{
    btnBuscarCep.addEventListener("click", async () =>
    {
        let cep = inputCep.value.replace(/\D/g, "");

        if (cep.length !== 8)
        {
            resultadoEndereco.innerHTML = "CEP inválido!";
            return;
        }

        try
        {
            let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let dados = await resposta.json();

            if (dados.erro)
            {
                resultadoEndereco.innerHTML = "CEP não encontrado!";
                return;
            }

            let cidade = dados.localidade;

            if (!cidadesPermitidas.includes(cidade))
            {
                resultadoEndereco.innerHTML = `Não entregamos em ${cidade}.`;
                return;
            }

            let frete = calcularFrete(cidade);

            resultadoEndereco.innerHTML =
            `
                <p><strong>Endereço:</strong> ${dados.logradouro || "Não informado"}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${cidade}</p>
                <p><strong>Frete:</strong> R$ ${frete.toFixed(2)}</p>
            `;

            localStorage.setItem("endereco", JSON.stringify(dados));
            localStorage.setItem("frete", frete);

            document.getElementById("btn-continuar").classList.remove("oculto");
        }
        catch
        {
            resultadoEndereco.innerHTML = "Erro ao buscar CEP.";
        }
    });
}

//? Produtos.
const produtos = [
    { nome: "RGBurger", preco: 29.90 },
    { nome: "CMYK Chicken", preco: 27.90 },
    { nome: "Color Bacon", preco: 32.90 },

    { nome: "Rainbow Shake", preco: 19.90 },
    { nome: "Ultra Cola", preco: 12.90 },
    { nome: "Hyper Orange", preco: 14.90 },

    { nome: "Rainbow Fries", preco: 15.90 },
    { nome: "Crunchy Nuggets", preco: 17.90 },
    { nome: "Elden Rings", preco: 13.90 },

    //! PLACEHOLDER.
    { nome: "Cyber Fries", preco: 19.90 },
    { nome: "Galaxy Shake", preco: 24.90 },
    { nome: "Hyper Soda", preco: 10.90 },
    { nome: "Neon Burger", preco: 27.90 },
    { nome: "Pixel Nuggets", preco: 21.90 }
];

const listaProdutos = document.getElementById("lista-produtos");

function renderizarProdutos()
{
    if (!listaProdutos) return;

    listaProdutos.innerHTML = "";

    produtos.forEach((produto, index) =>
    {
        const div = document.createElement("div");
        div.classList.add("produto");

        div.innerHTML =
        `
            <span>${produto.nome} - R$ ${produto.preco.toFixed(2)}</span>
            <button onclick="adicionarCarrinho(${index})">+</button>
        `;

        listaProdutos.appendChild(div);
    });
}

//? Carrinho.
let carrinho = [];

function adicionarCarrinho(index)
{
    carrinho.push(produtos[index]);
    atualizarCarrinho();
}

function atualizarCarrinho()
{
    const lista = document.getElementById("itens-carrinho");
    const totalEl = document.getElementById("total-carrinho");

    if (!lista || !totalEl) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item =>
    {
        let li = document.createElement("li");
        li.textContent = item.nome;
        lista.appendChild(li);

        total += item.preco;
    });

    let frete = Number(localStorage.getItem("frete")) || 0;

    totalEl.textContent = `Total: R$${(total + frete).toFixed(2)}`;
}

//? Modais.
const modalPedido = document.getElementById("div-pedido");
const modalCarrinho = document.getElementById("div-carrinho");

const botaoIniciar = document.getElementById("botao-iniciar-pedido");
const botaoFecharPedido = document.getElementById("botao-fechar-pedido");
const botaoFecharCarrinho = document.getElementById("botao-fechar-carrinho");
const botaoConcluirCarrinho = document.getElementById("botao-concluir-carrinho");

function usuarioEstaLogado()
{
    return localStorage.getItem("usuarioLogado") !== null;
}

//? Reset.
function resetarEtapas()
{
    document.getElementById("etapa-retirada")?.classList.add("oculto");
    document.getElementById("etapa-delivery")?.classList.add("oculto");

    document.getElementById("btn-continuar")?.classList.add("oculto");

    if (resultadoEndereco) resultadoEndereco.innerHTML = "";
}

//? Abrir pedido.
if (botaoIniciar)
{
    botaoIniciar.addEventListener("click", () =>
    {
        if (!usuarioEstaLogado())
        {
            alert("Você precisa estar logado!");
            window.location.href = "/pages/login.html";
            return;
        }

        abrirModal(modalPedido);
    });
}

//? Fechar modais.
botaoFecharPedido?.addEventListener("click", () =>
{
    if (!confirm("Deseja cancelar o pedido atual?"))
    {
        return;
    }

    fecharModal(modalPedido);
    resetarPedidoCompleto();
});

botaoFecharCarrinho?.addEventListener("click", () =>
{
    if (!confirm("Deseja cancelar o pedido atual?"))
    {
        return;
    }

    fecharModal(modalCarrinho);
    resetarPedidoCompleto();
});

botaoConcluirCarrinho?.addEventListener("click", () =>
{
    if (carrinho.length === 0)
    {
        alert("Seu carrinho está vazio!");
        console.log("Tentativa de finalizar com carrinho vazio.");
        return;
    }

    const tipoPedido = localStorage.getItem("tipoPedido");

    if (!tipoPedido)
    {
        alert("Escolha como deseja receber o pedido!");
        console.log("Tipo de pedido não definido.");
        return;
    }

    if (tipoPedido === "delivery")
    {
        const endereco = localStorage.getItem("endereco");

        if (!endereco)
        {
            alert("Digite um CEP válido antes de continuar!");
            console.log("Tentativa de delivery sem endereço.");
            return;
        }
    }

    let totalProdutos = carrinho.reduce((acc, item) => acc + item.preco, 0);
    let frete = Number(localStorage.getItem("frete")) || 0;
    let totalFinal = totalProdutos + frete;

    console.log("===== PEDIDO FINAL =====");
    console.log("Tipo:", tipoPedido);
    console.log("Itens:", carrinho);
    console.log("Total produtos:", totalProdutos.toFixed(2));
    console.log("Frete:", frete.toFixed(2));
    console.log("Total final:", totalFinal.toFixed(2));

    alert(`Pedido realizado com sucesso!\nTotal: R$ ${totalFinal.toFixed(2)}`);

    fecharModal(modalCarrinho);
    resetarPedidoCompleto();
});

//? Tipo pedido.
const btnRetirada = document.getElementById("btn-retirada");
const btnDelivery = document.getElementById("btn-delivery");

btnRetirada?.addEventListener("click", () =>
{
    resetarEtapas();

    localStorage.setItem("tipoPedido", "retirada");

    document.getElementById("etapa-retirada").classList.remove("oculto");
    document.getElementById("btn-continuar").classList.remove("oculto");
});

btnDelivery?.addEventListener("click", () =>
{
    resetarEtapas();

    localStorage.setItem("tipoPedido", "delivery");

    document.getElementById("etapa-delivery").classList.remove("oculto");
});

//? Continuar.
const btnContinuar = document.getElementById("btn-continuar");

btnContinuar?.addEventListener("click", () =>
{
    fecharModal(modalPedido);
    abrirModal(modalCarrinho);

    renderizarProdutos();
});

//? ===================
//?        FAQ
//? ===================

const botaoFaq = document.getElementById("botao-faq");
const modalFaq = document.getElementById("div-faq");
const botaoFecharFaq = document.getElementById("botao-fechar-faq");

botaoFaq?.addEventListener("click", () => abrirModal(modalFaq));
botaoFecharFaq?.addEventListener("click", () => fecharModal(modalFaq));