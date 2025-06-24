// script/battle.js (CORRIGIDO)

document.addEventListener('DOMContentLoaded', () => {
    // --- Variáveis de Controle ---
    let isPlayerTurn = true;
    let isBattleOver = false;

    // --- DOM Elements ---
    const playerMecha = document.getElementById('p1-battle');
    const enemyMecha = document.getElementById('enemy-mecha');
    const playerHP = document.getElementById('player-hp');
    const enemyHP = document.getElementById('enemy-hp');
    const rewardsScreen = document.getElementById('rewards-screen');

    // --- Funções Globais ---
    // Disponibiliza as funções para serem chamadas pelo onclick="" no HTML
    window.startBattle = function() {
        isPlayerTurn = true;
        isBattleOver = false;
        if(playerHP) playerHP.value = playerHP.max;
        if(enemyHP) enemyHP.value = enemyHP.max;
        if(rewardsScreen) rewardsScreen.classList.add('hidden');
        
        document.querySelector('.battlefield')?.classList.remove('hidden');
        document.querySelector('.footer')?.classList.remove('hidden');
        
        comprarCartas(5);
    }

    window.playerAttackSequence = function() {
        if (!isPlayerTurn || isBattleOver) return;
        
        playerMecha.classList.add('player-attacking');
        
        playerMecha.addEventListener('animationend', function handler() {
            playerMecha.classList.remove('player-attacking');
            playerMecha.removeEventListener('animationend', handler);

            enemyHP.value -= 15; // Dano de exemplo
            const damageAnimation = 'animate__headShake';
            enemyMecha.classList.add(damageAnimation);
            setTimeout(() => enemyMecha.classList.remove(damageAnimation), 1000);

            if (enemyHP.value <= 0) {
                isBattleOver = true;
                setTimeout(showRewardScreen, 1000);
                return;
            }
            endTurn();
        }, { once: true });
    }

    window.enemyAttackSequence = function() {
        if (isBattleOver) return;

        enemyMecha.classList.add('enemy-attacking');
        enemyMecha.addEventListener('animationend', function handler() {
            enemyMecha.classList.remove('enemy-attacking');
            enemyMecha.removeEventListener('animationend', handler);

            playerHP.value -= 10;
            const damageAnimation = 'animate__headShake';
            playerMecha.classList.add(damageAnimation);
            setTimeout(() => playerMecha.classList.remove(damageAnimation), 1000);

            if (playerHP.value <= 0) {
                isBattleOver = true;
                alert("Você foi derrotado!");
                window.location.href = '../index.html';
                return;
            }
            isPlayerTurn = true;
            comprarCartas(5);
            console.log("Seu turno!");
        }, { once: true });
    }

    window.endTurn = function() {
        if (!isPlayerTurn || isBattleOver) return;
        isPlayerTurn = false;
        console.log("Turno do jogador encerrado. Inimigo ataca...");
        setTimeout(enemyAttackSequence, 1000);
    }

    function showRewardScreen() {
        document.querySelector('.battlefield')?.classList.add('hidden');
        document.querySelector('.footer')?.classList.add('hidden');
        rewardsScreen?.classList.remove('hidden');
    }

    function selectReward(event) {
        const rewardType = event.currentTarget.dataset.reward;
        alert(`Você escolheu: ${rewardType}!`);
        rewardsScreen.classList.add('hidden');
        // A função mostrarTela está no escopo global de main.js, então pode ser chamada
        window.mostrarTela(2); 
    }

    document.querySelectorAll('.recompensas-option').forEach(option => {
        option.addEventListener('click', selectReward);
    });
});