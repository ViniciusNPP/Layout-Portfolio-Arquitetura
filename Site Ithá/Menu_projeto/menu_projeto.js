const cards = document.querySelectorAll('.projeto-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        console.log("Oi")
        window.location.href = "./Projetos/projeto.html";
    });
})