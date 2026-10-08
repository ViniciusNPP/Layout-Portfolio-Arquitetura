//#region CARROSSEL
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carrossel_slide');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProximo = document.getElementById('btn-proximo');
    const contenedorPontos = document.getElementById('pontos');

    let atual = 0;

    // Cria um ponto para cada slide
    const pontos = Array.from(slides).map((_, i) => {
        const ponto = document.createElement('button');
        ponto.type = 'button';
        ponto.className = 'carrossel_ponto';
        ponto.setAttribute('role', 'tab');
        ponto.setAttribute('aria-label', `Ir para o texto ${i + 1}`);
        ponto.addEventListener('click', () => irPara(i));
        contenedorPontos.appendChild(ponto);
        return ponto;
    });

    function irPara(indice) {
        // Volta ao início / fim (carrossel circular)
        atual = (indice + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const ativo = i === atual;
            slide.classList.toggle('ativo', ativo);
            slide.setAttribute('aria-hidden', String(!ativo));
        });

        pontos.forEach((ponto, i) => {
            const ativo = i === atual;
            ponto.classList.toggle('ativo', ativo);
            ponto.setAttribute('aria-selected', String(ativo));
        });
    }

    btnAnterior.addEventListener('click', () => irPara(atual - 1));
    btnProximo.addEventListener('click', () => irPara(atual + 1));

    // Setas do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') irPara(atual - 1);
        if (e.key === 'ArrowRight') irPara(atual + 1);
    });

    // Deslizar o dedo no celular
    let inicioX = 0;
    const area = document.querySelector('.carrossel_area');

    area.addEventListener('touchstart', (e) => {
        inicioX = e.changedTouches[0].clientX;
    }, { passive: true });

    area.addEventListener('touchend', (e) => {
        const diferenca = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(diferenca) > 50) {
            irPara(diferenca > 0 ? atual - 1 : atual + 1);
        }
    }, { passive: true });

    irPara(0);
});
//#endregion

//#region SIDEBAR
const header = document.querySelector('.header');

window.addEventListener('message', (e) => {
    if (e.data && e.data.tipo === 'header') {
        header.classList.toggle('aberto', e.data.aberta);
    }
})

//#endregion