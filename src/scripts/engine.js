const emojis = [
    "😎", "😎", "😛", "😛", "👽", "👽", "🤖", "🤖", 
    "👻", "👻", "🐧", "🐧", "🍕", "🍕", "💻", "💻"
];
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    // Verificar se todas as cartas foram combinadas
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        showFireworks(); // Chama a função de fogos de artifício quando o jogador vence
    }
}

function showFireworks() {
    // Criar o elemento para os fogos de artifício
    const fireworksContainer = document.createElement("div");
    fireworksContainer.classList.add("fireworks");

    // Criar alguns "fogos" individuais
    for (let i = 0; i < 5; i++) {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        fireworksContainer.appendChild(firework);
    }

    // Adicionar os fogos de artifício ao corpo da página
    document.body.appendChild(fireworksContainer);

    // Criar a mensagem de Parabéns
    const congratulationsMessage = document.createElement("div");
    congratulationsMessage.classList.add("congratulations");
    congratulationsMessage.innerText = "Parabéns! Você venceu!";
    document.body.appendChild(congratulationsMessage);

    // Remover os fogos de artifício e a mensagem após 2 segundos
    setTimeout(() => {
        fireworksContainer.remove();
        congratulationsMessage.remove();
    }, 3000); // Após 3 segundos, remove a animação e a mensagem
}
