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