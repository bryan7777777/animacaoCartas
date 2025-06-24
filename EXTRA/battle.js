// battle.js - VERSÃO FINAL E SEM CONFLITOS

let isPlayerTurn = true;
let isBattleOver = false;

function roboatk() {
  if (!isPlayerTurn || isBattleOver) return;
  isPlayerTurn = false;
  console.log("--- Início do Turno do Jogador ---");
  playerAttackSequence();
}

function playerAttackSequence() {
  const playerMecha = document.getElementById('p1-battle');
  const enemyMecha = document.getElementById('enemy-mecha');
  const enemyHP = document.getElementById('enemy-hp');

  // Adiciona a classe de ataque e a remove quando a animação terminar
  playerMecha.classList.add('player');
  playerMecha.addEventListener('animationend', function handler() {
    playerMecha.classList.remove('player');
    playerMecha.removeEventListener('animationend', handler); // Limpa o listener
  });

  // Reação do inimigo ao dano
  setTimeout(() => {
    enemyHP.value -= 15;
    const damageAnimation = 'animate__headShake';
    enemyMecha.classList.add(damageAnimation);
    
    // Limpa a animação de dano do inimigo
    setTimeout(() => {
      enemyMecha.classList.remove(damageAnimation);
    }, 1000);

    if (enemyHP.value <= 0) {
      isBattleOver = true;
      alert("Você venceu!");
      return;
    }

    // Passa o turno para o inimigo
    setTimeout(enemyAttackSequence, 1500);
  }, 600);
}

function enemyAttackSequence() {
  console.log("--- Início do Turno do Inimigo ---");
  const playerMecha = document.getElementById('p1-battle');
  const enemyMecha = document.getElementById('enemy-mecha');
  const playerHP = document.getElementById('player-hp');

  // Adiciona a classe de ataque do inimigo e a remove quando a animação terminar
  enemyMecha.classList.add('enemy-attacker');
  enemyMecha.addEventListener('animationend', function handler() {
    enemyMecha.classList.remove('enemy-attacker');
    enemyMecha.removeEventListener('animationend', handler); // Limpa o listener
  });

  // Reação do jogador ao dano
  setTimeout(() => {
    playerHP.value -= 10;
    const damageAnimation = 'animate__headShake';
    playerMecha.classList.add(damageAnimation);

    // Limpa a animação de dano do jogador
    setTimeout(() => {
      playerMecha.classList.remove(damageAnimation);
    }, 1000);

    if (playerHP.value <= 0) {
      isBattleOver = true;
      alert("Você foi derrotado!");
      return;
    }

    // Devolve o turno ao jogador
    console.log("--- Fim do Turno do Inimigo. Sua vez! ---");
    isPlayerTurn = true;
  }, 600);
}