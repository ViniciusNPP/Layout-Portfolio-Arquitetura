//#region CARROSSEL
const carrossel = document.querySelector('.carrossel');

let mouse_X = 0;
let mouse_Y = 0;
let isCarrosselHovered = false;

carrossel.addEventListener('mousemove', (e) => {
    mouse_X = e.clientX;
    mouse_Y = e.clientY;
    isCarrosselHovered = true;
});

carrossel.addEventListener('mouseleave', () => {
    isCarrosselHovered = false;
    resetarFundos();
});

function resetarFundos() {
    document.querySelectorAll('.projeto-imagens').forEach(container => {
        container.classList.remove('hover');
        container.firstElementChild.style.filter = "grayscale(100%)";
        container.lastElementChild.style.opacity = "0";
    });
}

function verificarElemento() {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop && isCarrosselHovered) {
        const elemento = document.elementFromPoint(mouse_X, mouse_Y);
        const containerAtivo = elemento ? elemento.closest('.projeto-imagens') : null;

        document.querySelectorAll('.projeto-imagens').forEach(container => {
            const isContainer = container === containerAtivo;
            container.classList.toggle('hover', isContainer);

            if (isContainer) {
                container.firstElementChild.style.filter = "none";
                container.lastElementChild.style.opacity = "1";
            } else {
                container.firstElementChild.style.filter = "grayscale(100%)";
                container.lastElementChild.style.opacity = "0";
            }
        });
    } else if (!isDesktop) {
        document.querySelectorAll('.projeto-imagens .background-projeto').forEach(bg => {
            bg.style.filter = "";
        });
        document.querySelectorAll('.projeto-imagens > *:last-child').forEach(el => {
            if (el.style.opacity) el.style.opacity = "";
        });
    }
    requestAnimationFrame(verificarElemento);
}

//#region PARAR ANIMAÇÃO
document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('animacao-parada', document.hidden);
});
//#endregion

verificarElemento();



//#region OVERLAY MOBILE
 
const overlayMobile = document.querySelector('.info-overlay-mobile');
const overlayCategoria = overlayMobile?.querySelector('.info-categoria');
const overlayNome = overlayMobile?.querySelector('.info-nome');
const overlayCidade = overlayMobile?.querySelector('.info-cidade');
const todosSlides = Array.from(document.querySelectorAll('.projeto-imagens'));
 
let slideAtualMobile = null;
 
function preencherOverlay(slide) {
    const infoOriginal = slide.querySelector('.informacoes-projeto');
    if (!infoOriginal) return;
 
    const categoria = infoOriginal.querySelector('.categoria')?.textContent ?? '';
    const nome = infoOriginal.querySelector('.nome-projeto')?.textContent ?? '';
    const cidade = infoOriginal.querySelector('.cidade-pais')?.textContent ?? '';
 
    overlayCategoria.textContent = categoria;
    overlayNome.textContent = nome;
    overlayCidade.textContent = cidade;
}
 
function atualizarOverlayMobile() {
    const isMobile = window.innerWidth <= 768;
 
    if (!isMobile || !overlayMobile) {
        requestAnimationFrame(atualizarOverlayMobile);
        return;
    }
 
    const alturaTela = window.innerHeight;
 
    let slideProximo = null;
    let melhorTop = -Infinity;
 
    todosSlides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        // Slide entrando por baixo, ainda subindo
        if (rect.top < alturaTela && rect.top > melhorTop) {
            melhorTop = rect.top;
            slideProximo = slide;
        }
    });
 
    if (slideProximo) {
        const rect = slideProximo.getBoundingClientRect();
        const percentualVisivel = (alturaTela - rect.top) / alturaTela;
 
        const indice = todosSlides.indexOf(slideProximo);
        const slideAnterior = todosSlides[indice - 1] ?? slideProximo;
 
        const slideParaMostrar = percentualVisivel >= 0.8 ? slideProximo : slideAnterior;
 
        if (slideParaMostrar !== slideAtualMobile) {
            slideAtualMobile = slideParaMostrar;
            preencherOverlay(slideParaMostrar);
        }
    }
 
    requestAnimationFrame(atualizarOverlayMobile);
}
 
atualizarOverlayMobile();
//#endregion

//#region BOTOES

const botoes = document.querySelectorAll(".botao-navegador");
let botaoAtual;

botoes.forEach(botao => {
    botao.addEventListener('mouseover', (e) => {
        //O botão atual não vai sofrer alterações, mas os outros ficarão opacados
        if (botaoAtual !== e.currentTarget) {
            botaoAtual = e.currentTarget;
        }

        botaoAtual.style.opacity = '1';
        botoes.forEach(botaoOpac => {
            if (botaoOpac !== botaoAtual) {
                botaoOpac.style.opacity = '0.5';
            }
        });
    });

    botao.addEventListener('click', (e) => {
        if (botao.className.includes('botao-projeto')) {
            window.location.href = "./Menu_projeto/menu_projeto.html";
        } else if (botao.className.includes('botao-sobre')) {
            window.location.href = "./Sobre/sobre.html";
        } else {
            window.location.href = "./Contatos/contatos.html";
        }
    });
});

// Faz a opacidade dos botões voltarem ao normal caso clique na página
document.addEventListener('click', (e) => {
    botoes.forEach(botao => {
        if (botao.style.opacity === '0.5') {
            botao.style.opacity = '1'
        }
    });
})
//#endregion

//#region IMAGEM REDIREICIONA

todosSlides.forEach(slide => {
    slide.addEventListener('click', (e) => {
        window.location.href = "./Menu_projeto/Projetos/projeto.html";
    });
})

//#endregion