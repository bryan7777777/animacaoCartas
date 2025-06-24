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