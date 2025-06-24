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