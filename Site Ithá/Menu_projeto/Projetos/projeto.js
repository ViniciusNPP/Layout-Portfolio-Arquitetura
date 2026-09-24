const imagemProjeto = document.getElementById("imagem-projeto");

const botaoAnterior = document.getElementById("anterior");
const botaoProxima = document.getElementById("proxima");

const indicadores = document.querySelectorAll(".indicador");


/*
    Coloque aqui os caminhos das 3 imagens
    do projeto.
*/

const imagens = [
    "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1534239697798-120952b76f2b?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];


let imagemAtual = 0;


/* =========================
   ATUALIZAR IMAGEM
   ========================= */

function atualizarImagem() {

    imagemProjeto.src = imagens[imagemAtual];


    // Atualiza os indicadores

    indicadores.forEach((indicador, index) => {

        indicador.classList.toggle(
            "ativo",
            index === imagemAtual
        );

    });
}


/* =========================
   PRÓXIMA IMAGEM
   ========================= */

function proximaImagem() {

    imagemAtual++;

    // Volta para a primeira imagem
    // quando chegar ao final

    if (imagemAtual >= imagens.length) {
        imagemAtual = 0;
    }

    atualizarImagem();
}


/* =========================
   IMAGEM ANTERIOR
   ========================= */

function imagemAnterior() {

    imagemAtual--;

    // Vai para a última imagem
    // quando estiver na primeira

    if (imagemAtual < 0) {
        imagemAtual = imagens.length - 1;
    }

    atualizarImagem();
}


/* =========================
   EVENTOS DOS BOTÕES
   ========================= */

botaoProxima.addEventListener(
    "click",
    proximaImagem
);


botaoAnterior.addEventListener(
    "click",
    imagemAnterior
);