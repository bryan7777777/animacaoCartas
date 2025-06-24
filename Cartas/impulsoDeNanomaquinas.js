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