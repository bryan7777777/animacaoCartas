export const explosaoDeEnergia = {
        name: 'Explosão de Energia',
        cost: 2,
        description: 'Causa 10 de dano e ignora barreiras.',
        effect: function(caster, target) {
            console.log(`${caster.mechaElement.id} usou Explosão de Energia!`);
            
            // Lógica especial: Dano direto na vida, sem passar pela barreira.
            target.hp -= 10; 
            console.log(`Dano ignorou a barreira de ${target.id}!`);

            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement, 'animate__flash'); // Animação diferente para efeito especial
        }
    }