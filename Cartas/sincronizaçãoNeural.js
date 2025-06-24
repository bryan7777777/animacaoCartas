export const sincronizacaoNeural = {
    name: 'Sincronização Neural',
    cost: 1,
    type: 'skill',
    description: 'Reduz o custo de cartas de ataque em 1 por 2 turnos.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} usou Sincronização Neural!`);

        // Ativa a redução de custo e define sua duração.
        caster.effects.attackCostReduction = 1;
        caster.effects.attackCostReductionDuration = 2;
        
        console.log(`Custo de ataques reduzido por 2 turnos.`);
    }
};