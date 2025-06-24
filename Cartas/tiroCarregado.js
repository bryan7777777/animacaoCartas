export const tiroCarregado = {
        name: 'Tiro Carregado',
        cost: 2,
        description: 'Causa 16 de dano.',
        effect: function(caster, target) { // 'target' aqui é um único inimigo
            console.log(`${caster.mechaElement.id} usou Tiro Carregado!`);
            target.hp -= 16;
            
            animateAttack(caster.mechaElement, 'player');
            animateDamage(target.mechaElement);
        }
    }