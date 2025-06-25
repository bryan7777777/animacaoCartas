// =====================================================================
// BATTLE.JS - VERSÃO COM CORREÇÃO DA TELA DE RECOMPENSA
// =====================================================================

// --- 1. DEFINIÇÃO DE TODAS AS CARTAS ---
const adrenalinaSintetica = { name: 'Adrenalina Sintética', imageSrc: '../img/cards/Cards verde/Adrenalina Sintetica.png', effect: function(caster, targets) { console.log(`${caster.id} usou Adrenalina Sintética para ganhar ímpeto!`); drawCard(); console.log(`Uma carta foi comprada.`); } };
const barreira = { name: 'Barreira', imageSrc: '../img/cards/Cards azul/Barreira.png', effect: function(caster, targets) { console.log(`${caster.id} ergueu uma Barreira!`); caster.effects.negateAttackCharges += 1; console.log(`O próximo ataque será anulado.`); } };
const blindagemReforcada = { name: 'Blindagem Reforçada', imageSrc: '../img/cards/Cards azul/Blindagem Reforçada.png', effect: function(caster, targets) { console.log(`${caster.id} reforçou sua blindagem!`); caster.effects.damageReduction = 10; caster.effects.damageReductionDuration = 2; console.log(`Redução de dano de 10 ativada por 2 turnos.`); } };
const campoDeForca = { name: 'Campo de Força', imageSrc: '../img/cards/Cards azul/Campo de Força.png', effect: function(caster, targets) { console.log(`${caster.id} ativou um Campo de Força!`); caster.barrier += 12; console.log(`Barreira aumentada para ${caster.barrier}.`); } };
const chuvaDeFragmentos = { name: 'Chuva de Fragmentos', isAoe: true, imageSrc: '../img/cards/Cards vermelho/Chuva de Fragmentos.png', type: 'attack', effect: function(caster, targets) { console.log(`${caster.id} usou Chuva de Fragmentos!`); targets.forEach(target => { dealDamage(caster, target, 15); }); } };
const deslocamentoRapido = { name: 'Deslocamento Rápido', imageSrc: '../img/cards/Cards azul/Deslocamento Rapido.png', effect: function(caster, targets) { console.log(`${caster.id} ativou o Deslocamento Rápido!`); caster.effects.evasionChance = 1.0; caster.effects.evasionChanceDuration = 2; console.log(`Chance de evasão de 100% ativada.`); } };
const explosaoDeEnergia = { name: 'Explosão de Energia', imageSrc: '../img/cards/Cards vermelho/Explosão de Energia.png', type: 'attack', effect: function(caster, target) { console.log(`${caster.id} usou Explosão de Energia!`); dealDamage(caster, target, 20, true); } };
const impactoCinetico = { name: 'Impacto Cinético', imageSrc: '../img/cards/Cards vermelho/Impacto Cinetico.png', type: 'attack', effect: function(caster, target) { console.log(`${caster.id} usou Impacto Cinético!`); dealDamage(caster, target, 12); target.mechaElement.classList.add('pushed-back'); setTimeout(() => target.mechaElement.classList.remove('pushed-back'), 500); } };
const impulsoDeNanomaquinas = { name: 'Impulso de Nanomáquinas', imageSrc: '../img/cards/Cards verde/Impulso de Nanomaquinas.png', effect: function(caster, targets) { console.log(`${caster.id} usou Impulso de Nanomáquinas!`); caster.hp += 20; if (caster.hp > caster.maxHp) caster.hp = caster.maxHp; console.log(`Recuperou 20 de vida.`); } };
const lancaGranadas = { name: 'Lança-Granadas', imageSrc: '../img/cards/Cards vermelho/Lança Granadas.png', type: 'attack', effect: function(caster, target) { console.log(`${caster.id} usou Lança-Granadas!`); dealDamage(caster, target, 18); target.effects.isStunned = true; console.log(`${target.id} está atordoado!`); } };
const overclocking = { name: 'Overclocking', imageSrc: '../img/cards/Cards verde/Overclocking.png', effect: function(caster, targets) { console.log(`${caster.id} usou Overclocking!`); caster.effects.damageBonus = 0.30; caster.effects.damageBonusDuration = 3; console.log(`Dano aumentado em 30% por 2 turnos.`); } };
const reforcoDeEstrutura = { name: 'Reforço de Estrutura', imageSrc: '../img/cards/Cards verde/Reforço de Estrutura.png', effect: function(caster, targets) { console.log(`${caster.id} usou Reforço de Estrutura!`); caster.maxHp += 10; caster.hp += 10; console.log(`Vida máxima aumentada para ${caster.maxHp}.`); } };
const sincronizacaoNeural = { name: 'Sincronização Neural', imageSrc: '../img/cards/Cards verde/Sincronização Neural.png', effect: function(caster, targets) { console.log(`${caster.id} usou Sincronização Neural!`); drawCard(); console.log(`Uma carta foi comprada.`); } };
const sistemaDeReflexao = { name: 'Sistema de Reflexão', imageSrc: '../img/cards/Cards azul/Sistema de Reflexão.png', effect: function(caster, targets) { console.log(`${caster.id} ativou o Sistema de Reflexão!`); caster.effects.reflectDamageBonus = 0.60; caster.effects.reflectDamageDuration = 2; console.log(`Refletirá 60% do dano por 1 turno.`); } };
const tiroCarregado = { name: 'Tiro Carregado', imageSrc: '../img/cards/Cards vermelho/Tiro Carregado.png', type: 'attack', effect: function(caster, target) { console.log(`${caster.id} usou Tiro Carregado!`); dealDamage(caster, target, 30); } };

// --- 2. BANCO DE DADOS E ESTADO DO JOGO ---
const cardDatabase = {
    adrenalinaSintetica, barreira, blindagemReforcada, campoDeForca, chuvaDeFragmentos,
    deslocamentoRapido, explosaoDeEnergia, impactoCinetico, impulsoDeNanomaquinas,
    lancaGranadas, overclocking, reforcoDeEstrutura, sincronizacaoNeural,
    sistemaDeReflexao, tiroCarregado
};

let isPlayerTurn = true;
let isBattleOver = false;
let cardBeingPlayed = null;

const player = {
    id: 'Player',
    hp: 100,
    maxHp: 100,
    barrier: 10,
    mechaElement: document.getElementById('p1-battle'),
    hpBar: document.getElementById('player-hp'),
    hpText: document.querySelector('.life-cash span:nth-child(1)'),
    barrierText: document.getElementById('player-barrier'),
    effects: {
        negateAttackCharges: 0,
        damageReduction: 0,
        damageReductionDuration: 0,
        damageBonus: 0,
        damageBonusDuration: 0,
        evasionChance: 0,
        evasionChanceDuration: 0,
        reflectDamageBonus: 0,
        reflectDamageDuration: 0,
    }
};

const enemy = {
    id: 'Inimigo',
    hp: 100,
    maxHp: 100,
    baseDamage: 8,
    mechaElement: document.getElementById('enemy-mecha'),
    hpBar: document.getElementById('enemy-hp'),
    effects: {
        isStunned: false
    }
};

// --- 3. FUNÇÕES PRINCIPAIS DO JOGO ---

function playCard(event) {
    if (!isPlayerTurn || isBattleOver || cardBeingPlayed) return;

    const cardId = event.currentTarget.dataset.cardId;
    const cardData = cardDatabase[cardId]; 

    if (!cardData) return console.error(`Carta ${cardId} não encontrada!`);
    
    isPlayerTurn = false;
    cardBeingPlayed = event.currentTarget;

    cardBeingPlayed.addEventListener('transitionend', () => {
        console.log(`Executando: ${cardData.name}`);
        const target = cardData.isAoe ? [enemy] : enemy;
        cardData.effect(player, target);
        updateUI();

        // CORREÇÃO: Adicionando a verificação de vitória AQUI
        if (enemy.hp <= 0) {
            isBattleOver = true;
            console.log("Inimigo derrotado! Mostrando recompensas...");
            animateDamage(enemy.mechaElement, 'animate__fadeOutDown');
            setTimeout(showRewardScreen, 1500); 
            return; 
        }

        // Se o inimigo não morreu, o jogo continua normalmente.
        setTimeout(enemyAttackSequence, 1500);

    }, { once: true });

    cardBeingPlayed.classList.add('card-played');
}

function enemyAttackSequence() {
    if (isBattleOver) return;
    if (enemy.effects.isStunned) {
        console.log("Inimigo está atordoado e não pode atacar!");
        enemy.effects.isStunned = false;
        endTurn();
        return;
    }
    if (player.effects.evasionChance > 0 && Math.random() < player.effects.evasionChance) {
        console.log("Ataque inimigo evadido!");
        animateDamage(player.mechaElement, 'animate__slideOutLeft');
        setTimeout(() => player.mechaElement.classList.remove('animate__animated', 'animate__slideOutLeft'), 1000);
        endTurn();
        return;
    }
    let damageDealt = enemy.baseDamage;
    if (player.effects.damageReduction > 0) {
        damageDealt -= player.effects.damageReduction;
        if (damageDealt < 0) damageDealt = 0;
    }
    animateAttack(enemy.mechaElement, 'enemy-attacker');
    setTimeout(() => {
        console.log(`Inimigo tenta causar ${damageDealt} de dano.`);
        if (player.effects.reflectDamageBonus > 0) {
            const reflectedDamage = Math.round(damageDealt * player.effects.reflectDamageBonus);
            console.log(`Refletiu ${reflectedDamage} de dano!`);
            dealDamage(player, enemy, reflectedDamage, false, true);
        }
        if (player.effects.negateAttackCharges > 0) {
            player.effects.negateAttackCharges--;
            console.log("Ataque ANULADO pela Barreira!");
            animateDamage(player.mechaElement, 'animate__bounceIn');
        } else {
            let remainingDamage = damageDealt;
            if (player.barrier > 0) {
                const absorbed = Math.min(player.barrier, remainingDamage);
                player.barrier -= absorbed;
                remainingDamage -= absorbed;
                console.log(`Campo de Força absorveu ${absorbed} de dano.`);
            }
            if (remainingDamage > 0) {
                player.hp -= remainingDamage;
                console.log(`Jogador sofreu ${remainingDamage} de dano.`);
                animateDamage(player.mechaElement, 'animate__headShake');
            }
        }
        updateUI();
        if (player.hp <= 0) {
            isBattleOver = true;
            alert("Você foi derrotado!");
            return;
        }
        endTurn();
    }, 800);
}

function endTurn() {
    if (cardBeingPlayed) {
        cardBeingPlayed.classList.remove('card-played');
        cardBeingPlayed.classList.add('hidden');
        cardBeingPlayed = null;
    }

    for (const key in player.effects) {
        if (key.endsWith('Duration')) {
            if (player.effects[key] > 0) {
                player.effects[key]--;
                if (player.effects[key] === 0) {
                    const effectName = key.replace('Duration', '');
                    if (player.effects[effectName] !== undefined) {
                         player.effects[effectName] = 0;
                         console.log(`Efeito ${effectName} acabou.`);
                    }
                }
            }
        }
    }
    updateUI();
    console.log("------------------\nÉ a sua vez de jogar!");
    isPlayerTurn = true;
}

function drawCard() {
    if (!isPlayerTurn) {
        console.log("Aguarde o seu turno para comprar cartas.");
        return;
    }
    const cardSlots = document.querySelectorAll('.hand-table .card1');
    const emptySlot = Array.from(cardSlots).find(slot => slot.classList.contains('hidden'));
    if (!emptySlot) {
        console.log("Mão cheia! Não é possível comprar mais cartas.");
        return;
    }
    const allCardIds = Object.keys(cardDatabase);
    const randomCardId = allCardIds[Math.floor(Math.random() * allCardIds.length)];
    const newCardData = cardDatabase[randomCardId];
    console.log(`Você comprou: ${newCardData.name}`);
    emptySlot.src = newCardData.imageSrc;
    emptySlot.dataset.cardId = randomCardId;
    emptySlot.classList.remove('hidden');
    emptySlot.classList.add('card-drawn');
    emptySlot.addEventListener('animationend', () => {
        emptySlot.classList.remove('card-drawn');
    }, { once: true });
}

// --- 4. FUNÇÕES UTILITÁRIAS ---

function dealDamage(caster, target, baseDamage, ignoreBarrier = false, isReflection = false) {
    let finalDamage = baseDamage;
    if (caster.id === 'Player' && caster.effects.damageBonus > 0) {
        finalDamage = Math.round(finalDamage * (1 + caster.effects.damageBonus));
    }
    console.log(`${caster.id} causa ${finalDamage} de dano em ${target.id}.`);
    
    const attackAnim = isReflection ? 'animate__bounceIn' : 'player';
    if (ignoreBarrier) {
        target.hp -= finalDamage;
        animateAttack(caster.mechaElement, attackAnim);
        animateDamage(target.mechaElement, 'animate__flash');
    } else {
        target.hp -= finalDamage;
        animateAttack(caster.mechaElement, attackAnim);
        animateDamage(target.mechaElement, 'animate__wobble');
    }
}

function updateUI() {
    player.hpBar.value = player.hp;
    player.hpBar.max = player.maxHp;
    enemy.hpBar.value = enemy.hp;
    enemy.hpBar.max = enemy.maxHp;
    
    player.hpText.textContent = `❤️ ${player.hp}/${player.maxHp}`;
    if (player.barrierText) player.barrierText.textContent = player.barrier;
}

function animateAttack(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => element.classList.remove(animationClass), { once: true });
}

function animateDamage(element, animationClass) {
    element.classList.add('animate__animated', animationClass);
    element.addEventListener('animationend', () => element.classList.remove('animate__animated', animationClass), { once: true });
}

// --- 5. INICIALIZAÇÃO DO JOGO ---
document.addEventListener('DOMContentLoaded', () => {
    const playerCards = document.querySelectorAll('.hand-table .card1');
    playerCards.forEach(card => card.addEventListener('click', playCard));
    const deckElement = document.getElementById('deck-draw');
    if (deckElement) {
        deckElement.addEventListener('click', drawCard);
    }
    const rewardOptions = document.querySelectorAll('.recompensas-option');
    rewardOptions.forEach(option => {
        option.addEventListener('click', selectReward);
    });
    updateUI(); 
    console.log("Jogo iniciado. É a sua vez.");
});

// --- 6. RECOMPENSAS DO JOGO ---
function showRewardScreen() {
  const battlefield = document.querySelector(".battlefield");
  const footer = document.querySelector(".footer");
  battlefield.classList.add("hidden");
  footer.classList.add("hidden");
  const rewardsScreen = document.getElementById("rewards-screen");
  rewardsScreen.classList.remove("hidden");
}

function selectReward(event) {
  const rewardType = event.currentTarget.dataset.reward;
  console.log(`Recompensa escolhida: ${rewardType}`);
  alert(`Você escolheu: ${rewardType}!`);
  const rewardsScreen = document.getElementById("rewards-screen");
  rewardsScreen.classList.add("hidden");
}