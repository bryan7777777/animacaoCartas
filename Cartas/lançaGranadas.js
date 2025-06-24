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
    }