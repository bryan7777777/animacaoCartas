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