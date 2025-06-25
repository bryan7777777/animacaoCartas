export const adrenalinaSintetica = {
    name: 'Adrenalina Sintética',
    cost: 3,
    type: 'skill',
    description: 'Garante +1 de ação no próximo turno.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} usou Adrenalina Sintética!`);
        
        // Acumula uma ação bônus para o próximo turno.
        // A nossa "ação" no jogo é a "energia".
        caster.effects.bonusActionsNextTurn += 1;

        console.log(`Ação extra garantida para o próximo turno.`);
    }
};

export const barreira = {
    name: 'Barreira',
    cost: 2,
    type: 'skill',
    description: 'Anula o próximo ataque sofrido.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} ergueu uma Barreira!`);
        
        // Adiciona uma carga de negação de ataque.
        caster.effects.negateAttackCharges += 1;
        console.log(`O próximo ataque será anulado.`);
    }
};

export const blindagemReforcada = {
    name: 'Blindagem Reforçada',
    cost: 0,
    type: 'skill',
    description: 'Reduz o dano recebido em 4 por 2 turnos.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} reforçou sua blindagem!`);
        
        // Ativa a redução de dano e sua duração.
        caster.effects.damageReduction = 4;
        caster.effects.damageReductionDuration = 2;
        console.log(`Redução de dano de 4 ativada por 2 turnos.`);
    }
};

export const campoDeForca = {
    name: 'Campo de Força',
    cost: 3,
    type: 'skill',
    description: 'Absorve 12 de dano recebido.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} ativou um Campo de Força!`);
        
        // Adiciona 12 pontos à barreira do jogador.
        // A barreira será consumida antes da vida quando receber dano.
        caster.barrier += 12;
        console.log(`Barreira aumentada para ${caster.barrier}.`);
        // Adicionar um efeito visual de escudo seria excelente aqui.
    }
};

export const chuvaDeFragmentos = {
        name: 'Chuva de Fragmentos',
        cost: 3,
        description: 'Causa 6 de dano a todos os inimigos.',
        effect: function(caster, targets) { // Note que 'targets' agora é um array
            console.log(`${caster.mechaElement.id} usou Chuva de Fragmentos!`);
            
            // Itera sobre todos os alvos (inimigos)
            targets.forEach(target => {
                // A lógica de dano padrão poderia ser uma função separada
                // mas por enquanto, vamos fazer direto.
                target.hp -= 6;
                console.log(`${target.id} sofreu 6 de dano.`);
                animateDamage(target.mechaElement); // Anima cada inimigo
            });
        }
    } 

    export const deslocamentoRapido = {
    name: 'Deslocamento Rápido',
    cost: 1,
    type: 'skill',
    description: 'Aumenta evasão em 20% por 1 turno.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} ativou o Deslocamento Rápido!`);
        
        // Define a chance de evasão e a duração.
        caster.effects.evasionChance = 0.20; // 0.20 = 20%
        caster.effects.evasionChanceDuration = 1;
        console.log(`Chance de evasão de 20% por 1 turno.`);
    }
};

export const explosaoDeEnergia = {
        name: 'Explosão de Energia',
        cost: 2,
        description: 'Causa 10 de dano e ignora barreiras.',
        effect: function(caster, target) {
            console.log(`${caster.mechaElement.id} usou Explosão de Energia!`);
            
            // Lógica especial: Dano direto na vida, sem passar pela barreira.
            target.hp -= 10; 
            console.log(`Dano ignorou a barreira de ${target.id}!`);

            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement, 'animate__flash'); // Animação diferente para efeito especial
        }
    };

    export const impactoCinetico = {
        name: 'Impacto Cinético',
        cost: 1,
        description: 'Causa 6 de dano e empurra o inimigo para trás.',
        effect: function(caster, target) {
            console.log(`${caster.mechaElement.id} usou Impacto Cinético!`);
            target.hp -= 6;

            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement);

            // Dispara a nova animação de "empurrar"
            target.mechaElement.classList.add('pushed-back');
            setTimeout(() => {
                target.mechaElement.classList.remove('pushed-back');
            }, 500); // Duração da animação de empurrão
        }
    };

    export const impulsoDeNanomaquinas = {
    name: 'Impulso de Nanomáquinas',
    cost: 0,
    type: 'skill',
    description: 'Regenera 8 pontos de vida.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} usou Impulso de Nanomáquinas!`);
        
        caster.hp += 8;
        if (caster.hp > caster.maxHp) {
            caster.hp = caster.maxHp; // Não deixa a vida passar do máximo
        }
        console.log(`Recuperou 8 de vida.`);
    }
};

export const lancaGranadas = {
        name: 'Lança-Granadas',
        cost: 3,
        description: 'Causa 12 de dano e atordoa por 1 turno.',
        effect: function(caster, target) {
            console.log(`${caster.mechaElement.id} usou Lança-Granadas!`);
            target.hp -= 12;

            // Aplica o efeito de status "atordoado"
            target.effects.isStunned = true;
            console.log(`${target.id} está atordoado!`);

            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement);
        }
    };

    export const overclocking = {
    name: 'Overclocking',
    cost: 2,
    type: 'skill', // É uma habilidade, não um ataque direto
    description: 'Aumenta o dano em 30% por 2 turnos.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} usou Overclocking!`);
        
        // Ativa o bônus de dano e define sua duração.
        // O turno em que a carta é usada conta como o primeiro.
        caster.effects.damageBonus = 0.30;
        caster.effects.damageBonusDuration = 2; 

        console.log(`Dano aumentado em 30% por 2 turnos.`);
        // Adicionar uma animação de "power-up" no caster seria ótimo aqui!
    }
};

export const reforcoDeEstrutura = {
    name: 'Reforço de Estrutura',
    cost: 0,
    type: 'skill',
    description: 'Aumenta a vida máxima em 10 pontos até o final da batalha.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} usou Reforço de Estrutura!`);
        
        // Aumenta a vida máxima e a vida atual em 10.
        caster.maxHp += 10;
        caster.hp += 10;

        console.log(`Vida máxima aumentada para ${caster.maxHp}.`);
        // É importante que a função que atualiza a UI saiba atualizar
        // o valor máximo da barra de vida também.
        // ex: caster.hpElement.max = caster.maxHp;
    }
};

// export const sincronizacaoNeural = {
//     name: 'Sincronização Neural',
//     cost: 1,
//     type: 'skill',
//     description: 'Reduz o custo de cartas de ataque em 1 por 2 turnos.',
//     effect: function(caster, target) {
//         console.log(`${caster.mechaElement.id} usou Sincronização Neural!`);

//         // Ativa a redução de custo e define sua duração.
//         caster.effects.attackCostReduction = 1;
//         caster.effects.attackCostReductionDuration = 2;
        
//         console.log(`Custo de ataques reduzido por 2 turnos.`);
//     }
// };

export const sistemaDeReflexao = {
    name: 'Sistema de Reflexão',
    cost: 0,
    type: 'skill',
    description: 'Devolve 60% do dano recebido ao atacante.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} ativou o Sistema de Reflexão!`);
        
        // Ativa o bônus de reflexão de dano e sua duração.
        caster.effects.reflectDamageBonus = 0.60; // 0.60 = 60%
        caster.effects.reflectDamageDuration = 1; // Vamos assumir que dura 1 turno
        console.log(`Refletirá 60% do dano por 1 turno.`);
    }
};

export const tiroCarregado = {
        name: 'Tiro Carregado',
        cost: 2,
        description: 'Causa 16 de dano.',
        effect: function(caster, target) { // 'target' aqui é um único inimigo
            console.log(`${caster.mechaElement.id} usou Tiro Carregado!`);
            target.hp -= 16;
            
            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement);
        }
    };