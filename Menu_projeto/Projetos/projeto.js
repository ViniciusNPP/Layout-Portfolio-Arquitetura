//#region SIDEBAR
const header = document.querySelector('.header');

window.addEventListener('message', (e) => {
    if (e.data && e.data.tipo === "header") {
        header.classList.toggle('aberto', e.data.aberta);
    }
});

//#endregion

//#region IMAGENS
const json = "./imagens_projetos.json" //Json
const projetoId = new URLSearchParams(window.location.search).get("id"); //id do projeto

const section = document.querySelector('.container-imagens');
const info = document.querySelector('.container-info');

// Retorna o objeto do projeto com os dados e imagens
async function carregarDadosProjetos(projeto) {
    const res = await fetch(json);

    if (!res.ok) return null;

    const obj = await res.json();
    return obj[projeto] ?? null;
}

// Adiciona as imagens ao html
function adicionarImagens(projeto, grid) {
    if (!projeto) return;

    // Preenche as informações do projeto
    info.querySelector('.titulo').textContent = projeto.titulo;
    info.querySelector('.endereco-ano').textContent = `${projeto.endereco} - ${projeto.ano}`;
    info.querySelector('.descricao').textContent = projeto.descricao;

    // Adiciona as imagens ao section
    projeto.imagens.forEach((img, index) => {
        const imagem = document.createElement('img');
        imagem.src = img.src;
        imagem.alt = img.alt;
        imagem.classList.add('imagem', `img${index + 1}`, img.tipo);
        imagem.style.gridArea = `img${index + 1}`;
        section.appendChild(imagem);
    });

    // Adiciona o grid de imagens ao css do section
    section.style.gridTemplateAreas = grid;
}

// Cria uma grid de imagens com base no projeto atual
function organizarImagensGrid(imagens) {
    let grid = "";
    
    imagens.forEach((img, index) => {
        let tipoAnterior = index > 1 ? imagens[index - 1].tipo : null;
        
        if (index === 0) {
            grid += `"info img${index + 1} img${index + 1} img${index + 1}"\n`;
            return;
        }
        //Verifica o tipo da imagem: normal, horizontal ou vertical
        /* 
        Normal ocupa 2 ou 3 espaços
        Horizontal ocupa toda a linha
        Vertical ocupa 1 espaço
        */
        if (img.tipo === "normal" || img.tipo === "vertical") { //Os dois podem ficam juntos na mesma linha
            
            if (img.tipo === "normal") { //Cria o normal
                if (tipoAnterior === "normal") {
                    grid += `img${index + 1} img${index + 1}"\n`; //Completa com imagem normal (norm1 norm1 norm2 norm2)
                    return 
                }
                else if (tipoAnterior === "vertical") {
                    grid += `img${index + 1} img${index + 1} img${index + 1}"\n`; //Completa com imagem normal (vert norm norm norm)
                    return 
                }
                
                grid += `"img${index + 1} img${index + 1} `// Inicia com imagem normal (norm norm )
                return
            }

            if (img.tipo === "vertical") {
                if (tipoAnterior) {
                    grid += `img${index} img${index + 1}"\n`; //Completa com 1 imagem normal e 1 vertical (norm norm norm vert || vert1 vert1 vert2 vert2)
                    return
                }

                grid += `"img${index + 1} `; //Inicia com imagem vertical (vert )
            }
        }
        else if (img.tipo === "horizontal") { //Sempre ocupa toda linha
            grid += `"img${index + 1} img${index + 1} img${index + 1} img${index + 1}"\n`;
        }
    });

    return grid;
}

const projetoAtual = await carregarDadosProjetos(projetoId); // Objeto com os dados do projeto
const grid = organizarImagensGrid(projetoAtual.imagens);
adicionarImagens(projetoAtual, grid); // Adiciona as imagens ao html e organiza o grid

//#endregion