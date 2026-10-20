const cards = document.querySelectorAll('.projeto-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = "./Projetos/projeto.html";
    });
})

//#region SIDEBAR
const header = document.querySelector('.header');

window.addEventListener('message', (e) => {
    if (e.data && e.data.tipo === "header") {
        header.classList.toggle('aberto', e.data.aberta);
    }
})

//#endregion