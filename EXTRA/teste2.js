// script.js

let playerHP = 50;
let playerMaxHP = 50;
let playerEnergy = 3;
let playerShield = 0;
let deck = [];
let hand = [];
let discardPile = [];
let enemies = [];
const handSize = 4;

const playerImg = document.getElementById("player-img");
const enemyArea = document.getElementById("enemy-area");
const handArea = document.querySelector(".hand");
const drawPileElem = document.getElementById("draw-pile");
const discardPileElem = document.getElementById("discard-pile");
const effectsOverlay = document.getElementById("battle-effects");
const playerHPBar = document.getElementById("player-hp-bar");

function flashEffect(color) {
  effectsOverlay.className = `flash-${color}`;
  setTimeout(() => effectsOverlay.className = '', 300);
}

function triggerShake(element) {
  element.classList.add('tremor');
  setTimeout(() => element.classList.remove('tremor'), 400);
}

function updateHUD() {
  document.getElementById("player-hp").textContent = `HP: ${playerHP}/${playerMaxHP}`;
  document.getElementById("player-energy").textContent = `Energia: ${playerEnergy}`;
  playerHPBar.style.width = `${(playerHP / playerMaxHP) * 100}%`;
  if (playerHP <= 0) {
    alert("Você foi derrotado!");
    window.location.reload();
  }
}

function updateEnemyHP(enemy) {
  const hpBar = enemy.elem.querySelector(".hp-bar-inner");
  if (enemy.hp < 0) enemy.hp = 0;
  hpBar.style.width = `${(enemy.hp / enemy.maxHP) * 100}%`;
  if (enemy.hp <= 0) {
    enemy.elem.remove();
    enemies = enemies.filter(e => e !== enemy);
    if (enemies.length === 0) {
      alert("Vitória! Batalha encerrada.");
      setupBattle();
    }
  }
}

function drawCards(n) {
  for (let i = 0; i < n; i++) {
    if (deck.length === 0 && discardPile.length > 0) {
      deck = shuffle(discardPile);
      discardPile = [];
    }
    if (deck.length === 0) break;
    const card = deck.pop();
    hand.push(card);
  }
  renderHand();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderHand() {
  handArea.innerHTML = '';
  hand.forEach(card => {
    const cardElem = createCardElement(card);
    handArea.appendChild(cardElem);
  });
}

function createCardElement(card) {
  const cardDiv = document.createElement("div");
  cardDiv.className = card.class;
  cardDiv.style.backgroundImage = getCardBackground(card.class);
  cardDiv.style.backgroundSize = '100% 100%';
  cardDiv.style.backgroundRepeat = 'no-repeat';
  cardDiv.innerHTML = `
    <p class="energia"><strong>${card.cost}</strong></p>
    <img class="icon" src="${card.icon}" alt="">
    <div class="cardInfo">
      <h1 class="cardTitle">${card.name}</h1>
      <p class="cardDescription">${card.desc}</p>
    </div>
  `;
  cardDiv.onclick = () => playCard(card);
  return cardDiv;
}

function getCardBackground(cardClass) {
  if (cardClass === "card1") return "url('./../img/cards/cardVermelho.png')";
  if (cardClass === "card2") return "url('./../img/cards/cardVerd.png')";
  return "url('./../img/cards/cartaAzul.png')";
}

function playCard(card) {
  if (playerEnergy < card.cost) return;
  playerEnergy -= card.cost;
  discardPile.push(card);
  hand = hand.filter(c => c !== card);

  if (card.type === "attack") {
    enemies.forEach(enemy => {
      enemy.hp -= card.damage;
      triggerShake(enemy.elem);
      updateEnemyHP(enemy);
    });
    flashEffect("red");
  } else if (card.type === "heal") {
    playerHP += card.heal;
    if (playerHP > playerMaxHP) playerHP = playerMaxHP;
    flashEffect("green");
  } else if (card.type === "shield") {
    playerShield += card.shield;
    flashEffect("blue");
  }

  updateHUD();
  renderHand();
}

function endTurn() {
  discardPile.push(...hand);
  hand = [];
  playerEnergy = 3;
  drawCards(handSize);
}

document.getElementById("end-turn").onclick = endTurn;

function setupBattle() {
  deck = shuffle([...allCards]);
  discardPile = [];
  hand = [];

  const enemyOptions = [
    "lenhadorCorrompido.webp",
    "tartaruga.png",
    "cogumeloEvoluido.webp",
    "antiPragaHackeado.webp",
    "coisa.webp"
  ];

  const numEnemies = Math.floor(Math.random() * 3) + 1;
  enemies = [];
  enemyArea.innerHTML = '';
  for (let i = 0; i < numEnemies; i++) {
    const enemyImg = enemyOptions[Math.floor(Math.random() * enemyOptions.length)];
    const enemy = {
      name: enemyImg,
      hp: 20,
      maxHP: 20,
      elem: createEnemy(enemyImg)
    };
    enemies.push(enemy);
    enemyArea.appendChild(enemy.elem);
  }

  drawCards(handSize);
  updateHUD();
  playerImg.src = "./../img/mecas/mineiro.png";
}

function createEnemy(imgSrc) {
  const div = document.createElement("div");
  div.className = "enemy";
  div.style.backgroundImage = `url('./../img/inimigos/${imgSrc}')`;
  div.innerHTML = `
    <div class="hp-bar">
      <div class="hp-bar-inner"></div>
    </div>
  `;
  return div;
}

const allCards = [
  { name: "Chuva de Fragmentos", type: "attack", class: "card1", cost: 3, damage: 5, icon: "./../img/cards/atk/chuvaestilhaco.png", desc: "Causa 5 de dano a todos os inimigos." },
  { name: "Lança-Granadas", type: "attack", class: "card1", cost: 3, damage: 12, icon: "./../img/cards/atk/LancaGranadas.png", desc: "Causa 12 de dano e atordoa por 1 turno." },
  { name: "Explosão de Energia", type: "attack", class: "card1", cost: 2, damage: 10, icon: "./../img/cards/atk/ExplosaoDeEnergia.png", desc: "Causa 10 de dano e ignora barreiras." },
  { name: "Tiro Carregado", type: "attack", class: "card1", cost: 2, damage: 15, icon: "./../img/cards/atk/tiroCarregado.png", desc: "Causa 15 de dano." },
  { name: "Impacto Cinético", type: "attack", class: "card1", cost: 1, damage: 6, icon: "./../img/cards/atk/inpacto.png", desc: "Causa 6 de dano e empurra o inimigo para trás." },
  { name: "Impulso de Nanomáquinas", type: "heal", class: "card2", cost: 1, heal: 8, icon: "./../img/cards/buff/impulsoVerd.png", desc: "Regenera 8 pontos de vida." },
  { name: "Adrenalina Sintética", type: "buff", class: "card2", cost: 2, icon: "./../img/cards/buff/Cura.png", desc: "Garante +1 de ação no próximo turno." },
  { name: "Overclocking", type: "buff", class: "card2", cost: 2, icon: "./../img/cards/buff/sobreCarga.png", desc: "Aumenta o dano em 30% por 2 turnos." },
  { name: "Sincronização Neural", type: "buff", class: "card2", cost: 2, icon: "./../img/cards/buff/neural.png", desc: "Reduz o custo de cartas de ataque em 1 por 2 turnos." },
  { name: "Reforço de Estrutura", type: "buff", class: "card2", cost: 1, icon: "./../img/cards/buff/reforcoDeEstrutura.png", desc: "Aumenta a vida máxima em 10 pontos até o final da batalha." },
  { name: "Blindagem Reforçada", type: "shield", class: "card", cost: 2, shield: 0, icon: "./../img/cards/def/Blindagem.png", desc: "Reduz o dano recebido em 4 por 2 turnos." },
  { name: "Campo de Força", type: "shield", class: "card", cost: 2, shield: 12, icon: "./../img/cards/def/campoDeForca.png", desc: "Absorve 12 de dano recebido." },
  { name: "Barreira", type: "shield", class: "card", cost: 2, shield: 0, icon: "./../img/cards/def/escudoHolo.png", desc: "Anula o próximo ataque sofrido" },
  { name: "Deslocamento Rápido", type: "buff", class: "card", cost: 1, icon: "./../img/cards/def/impulsoAzul.png", desc: "Aumenta evasão em 20% por 1 turno." },
  { name: "Sistema de Reflexão", type: "shield", class: "card", cost: 3, shield: 0, icon: "./../img/cards/def/sisReflexao.png", desc: "Devolve 50% do dano recebido ao atacante." }
];

window.onload = setupBattle;
