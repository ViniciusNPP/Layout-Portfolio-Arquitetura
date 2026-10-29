//#region CATEGORIA
const categoria = new URLSearchParams(window.location.search).get("categoria");

//#endregion

//#region SIDEBAR
const header = document.querySelector('.header');

window.addEventListener('message', (e) => {
    if (e.data && e.data.tipo === "header") {
        header.classList.toggle('aberto', e.data.aberta);
    }
});

//#endregion

//#region FILTRO DE CARDS
const cards = document.querySelectorAll('.card');
const CATEGORIAS = ['residencial', 'comercial'];
const categoriaAtual = categoria ? categoria.trim().toLowerCase() : null;

// Só filtra se a categoria for válida; senão mostra todos
if (CATEGORIAS.includes(categoriaAtual)) {
    cards.forEach(card => {
        card.classList.toggle('oculto', !card.classList.contains(categoriaAtual));
    });
}

//#endregion

//#region REDIRECIONAMENTO
// Clique (ou Enter/Espaço) abre projeto.html?id=ID, usando o data-id do card
cards.forEach(card => {
    const abrirProjeto = () => {
        window.location.href = `../Projetos/projeto.html?id=${encodeURIComponent(card.dataset.id)}`;
    };

    card.addEventListener('click', abrirProjeto);
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirProjeto();
        }
    });
});

//#endregion