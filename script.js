const bancoDeQuestoes = [
    { texto: "Seus olhos são como jabuticabas.", tipo: "comparacao" },
    { texto: "A vida é um palco.", tipo: "metafora" },
    { texto: "Ele é forte como um touro.", tipo: "comparacao" },
    { texto: "As nuvens são algodões no céu.", tipo: "metafora" },
    { texto: "O tempo voa.", tipo: "metafora" },
    { texto: "Cabelos brancos como a neve.", tipo: "comparacao" },
    { texto: "Você é um anjo.", tipo: "metafora" },
    { texto: "Rápido tal qual um relâmpago.", tipo: "comparacao" },
    { texto: "Aquele garoto é um dicionário ambulante.", tipo: "metafora" },
    { texto: "Ficou vermelho igual a um pimentão.", tipo: "comparacao" },
    { texto: "O riso dela é música para mim.", tipo: "metafora" },
    { texto: "Eles lutaram como leões.", tipo: "comparacao" },
    { texto: "A notícia foi um balde de água fria.", tipo: "metafora" },
    { texto: "Dormiu feito uma pedra.", tipo: "comparacao" },
    { texto: "Seu coração é de gelo.", tipo: "metafora" }
];

let questoes = [];
let questaoAtual = 0;
let acertos = 0;
let tempoRestante = 300; // 5 minutos
let intervaloTempo;

// Inicialização
function init() {
    questoes = [...bancoDeQuestoes].sort(() => Math.random() - 0.5);
    renderQuestao();
    startTimer();
}

function renderQuestao() {
    if (questaoAtual >= questoes.length) {
        endGame();
        return;
    }
    const fraseEl = document.getElementById('phrase-text');
    const card = document.getElementById('phrase-card');
    
    fraseEl.innerText = questoes[questaoAtual].texto;
    card.classList.remove('animate-pop');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('animate-pop');
}

function checkAnswer(respostaUsuario) {
    const correta = questoes[questaoAtual].tipo;
    const feedbackEl = document.getElementById('feedback');
    const card = document.getElementById('phrase-card');

    if (respostaUsuario === correta) {
        acertos++;
        document.getElementById('score').innerText = acertos;
        showFeedback("✅", "var(--correct)");
    } else {
        showFeedback("❌", "var(--wrong)");
        alert(`Resposta incorreta! O certo seria: ${correta.toUpperCase()}`);
    }

    questaoAtual++;
    setTimeout(renderQuestao, 600);
}

function showFeedback(simbolo, cor) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.innerText = simbolo;
    feedbackEl.style.color = cor;
    feedbackEl.classList.remove('hidden');
    setTimeout(() => feedbackEl.classList.add('hidden'), 600);
}

function startTimer() {
    intervaloTempo = setInterval(() => {
        tempoRestante--;
        const min = Math.floor(tempoRestante / 60);
        const sec = tempoRestante % 60;
        document.getElementById('timer').innerText = 
            `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

        if (tempoRestante <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(intervaloTempo);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = acertos;
}

// Inicia o jogo ao carregar
window.onload = init;
