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