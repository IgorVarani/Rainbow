const thumb = document.getElementById("scrollbar-thumb");

function atualizarScrollbar()
{
    const alturaPagina = document.documentElement.scrollHeight;
    const alturaTela = window.innerHeight;
    const scrollAtual = window.scrollY;

    const alturaThumb = (alturaTela / alturaPagina) * alturaTela;
    thumb.style.height = alturaThumb + "px";

    const maxScroll = alturaPagina - alturaTela;
    const posicao = (scrollAtual / maxScroll) * (alturaTela - alturaThumb);

    thumb.style.top = posicao + "px";
}

window.addEventListener("scroll", atualizarScrollbar);
window.addEventListener("resize", atualizarScrollbar);

atualizarScrollbar();