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