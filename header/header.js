//#region NAVEGADORES
const opcoes = document.querySelectorAll('.nav');

opcoes.forEach(opcao => {
    opcao.addEventListener('click', (e) => {
        // Editar os ifs e hrefs conforme necessário
        if (opcao.classList.contains('nav-1')) {
            window.top.location.href = '../Menu_projeto/Projetos/projetos_tipo.html';
        }
        if (opcao.classList.contains('nav-2')) {
            window.top.location.href = '../Sobre/sobre.html';
        }
        if (opcao.classList.contains('nav-3')) {
            window.top.location.href = '../Contatos/contatos.html';
        }
        if (opcao.classList.contains('nav-4')) {
            window.top.location.href = '../index.html'
        }
    })
});
//#endregion

//#region BODY
const checkbox = document.querySelector('#menu-toggle');
const nav = document.querySelector('nav');

document.body.addEventListener('click', (e) => {
    if (!checkbox.checked || !(e.target instanceof Element)) {
        if (e.target.closest('.expansor')) return;

        //#region HEADER FECHADO
        
        //#endregion
    }
    if (nav.contains(e.target) || e.target.closest('.expansor')) return;

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
});

//#endregion

//#region MENSAGEM
let timeoutId;

checkbox.addEventListener('change', (e) => {
    clearTimeout(timeoutId);
    let delay = checkbox.checked ? 0 : 300
    
    timeoutId = setTimeout(() => {
        window.parent.postMessage(
            { tipo: "header", aberta: checkbox.checked },
            '*'
        );
    }, delay);
});
//#endregion