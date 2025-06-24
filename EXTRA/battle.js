// battle.js - VERSÃO FINAL COM TELA DE RECOMPENSAS

// --- Variáveis de Controle ---
let isPlayerTurn = true;
let isBattleOver = false;

// --- Funções de Batalha ---

function roboatk() {
    if (!isPlayerTurn || isBattleOver) return;
    isPlayerTurn = false;
    playerAttackSequence();
}

function playerAttackSequence() {
    const playerMecha = document.getElementById('p1-battle');
    const enemyMecha = document.getElementById('enemy-mecha');
    const enemyHP = document.getElementById('enemy-hp');

    playerMecha.classList.add('player');
    playerMecha.addEventListener('animationend', function handler() {
        playerMecha.classList.remove('player');
        playerMecha.removeEventListener('animationend', handler);
    });

    setTimeout(() => {
        enemyHP.value -= 15; // Dano do jogador
        const damageAnimation = 'animate__headShake';
        enemyMecha.classList.add(damageAnimation);

        setTimeout(() => {
            enemyMecha.classList.remove(damageAnimation);
        }, 1000);

        // --- LÓGICA DE VITÓRIA ---
        if (enemyHP.value <= 0) {
            isBattleOver = true;
            console.log("Você venceu! Mostrando recompensas...");
            // Atraso para a animação de morte do inimigo antes de mostrar as recompensas
            setTimeout(showRewardScreen, 1000);
            return;
        }
        // -------------------------

        setTimeout(enemyAttackSequence, 1500);
    }, 600);
}

function enemyAttackSequence() {
    if (isBattleOver) return; // Garante que o inimigo não ataque se já foi derrotado
    const playerMecha = document.getElementById('p1-battle');
    const enemyMecha = document.getElementById('enemy-mecha');
    const playerHP = document.getElementById('player-hp');

    enemyMecha.classList.add('enemy-attacker');
    enemyMecha.addEventListener('animationend', function handler() {
        enemyMecha.classList.remove('enemy-attacker');
        enemyMecha.removeEventListener('animationend', handler);
    });

    setTimeout(() => {
        playerHP.value -= 10; // Dano do inimigo
        const damageAnimation = 'animate__headShake';
        playerMecha.classList.add(damageAnimation);

        setTimeout(() => {
            playerMecha.classList.remove(damageAnimation);
        }, 1000);

        if (playerHP.value <= 0) {
            isBattleOver = true;
            alert("Você foi derrotado!");
            // Aqui você pode adicionar lógica para reiniciar ou voltar ao menu
            // window.location.reload(); 
            return;
        }

        isPlayerTurn = true;
    }, 600);
}


// --- Funções da Tela de Recompensa ---

function showRewardScreen() {
    // Esconde a interface de batalha
    const battlefield = document.querySelector('.battlefield');
    const footer = document.querySelector('.footer');
    battlefield.classList.add('hidden');
    footer.classList.add('hidden');

    // Mostra a tela de recompensas
    const rewardsScreen = document.getElementById('rewards-screen');
    rewardsScreen.classList.remove('hidden');
}

function selectReward(event) {
    // Pega o tipo de recompensa do atributo 'data-reward'
    const rewardType = event.currentTarget.dataset.reward;
    
    console.log(`Recompensa escolhida: ${rewardType}`);
    alert(`Você escolheu: ${rewardType}!`);

    // Esconde a tela de recompensas
    const rewardsScreen = document.getElementById('rewards-screen');
    rewardsScreen.classList.add('hidden');

    // Lógica pós-recompensa: O que fazer agora?
    // Exemplo: Voltar para a tela do mapa
    // alert("Retornando ao mapa...");
    // window.location.href = 'mapa.html'; // Descomente para redirecionar
}


// --- Inicialização ---

// Adiciona os 'escutadores' de clique nas opções de recompensa assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const rewardOptions = document.querySelectorAll('.recompensas-option');
    rewardOptions.forEach(option => {
        option.addEventListener('click', selectReward);
    });
});