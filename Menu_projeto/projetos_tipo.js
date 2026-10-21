//#region SIDEBAR
const header = document.querySelector('.header');

window.addEventListener('message', (e) => {
    if (e.data && e.data.tipo === "header") {
        header.classList.toggle('aberto', e.data.aberta);
    }
})

//#endregion

//#region REDIRECIONA
document.querySelector('.categorias').addEventListener('click', (e) => {
    //Identifica a categoria clicada
    const elemento = e.target.closest(".categoria");
    if (!elemento) return;

    const categoriaElemento = elemento.classList.contains("categoria-comercial")
        ? "comercial"
        : "residencial";

    //Redireciona para a aba card_projetos
    window.top.location.href = `Cards_projetos/card_projetos.html?categoria=${categoriaElemento}`
});

//#endregion