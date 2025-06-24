export const impactoCinetico = {
        name: 'Impacto Cinético',
        cost: 1,
        description: 'Causa 6 de dano e empurra o inimigo para trás.',
        effect: function(caster, target) {
            console.log(`${caster.mechaElement.id} usou Impacto Cinético!`);
            target.hp -= 6;

            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement);

            // Dispara a nova animação de "empurrar"
            target.mechaElement.classList.add('pushed-back');
            setTimeout(() => {
                target.mechaElement.classList.remove('pushed-back');
            }, 500); // Duração da animação de empurrão
        }
    }