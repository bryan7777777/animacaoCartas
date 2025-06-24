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