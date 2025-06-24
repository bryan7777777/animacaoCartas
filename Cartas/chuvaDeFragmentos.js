export const chuvaDeFragmentos = {
        name: 'Chuva de Fragmentos',
        cost: 3,
        description: 'Causa 6 de dano a todos os inimigos.',
        effect: function(caster, targets) { // Note que 'targets' agora é um array
            console.log(`${caster.mechaElement.id} usou Chuva de Fragmentos!`);
            
            // Itera sobre todos os alvos (inimigos)
            targets.forEach(target => {
                // A lógica de dano padrão poderia ser uma função separada
                // mas por enquanto, vamos fazer direto.
                target.hp -= 6;
                console.log(`${target.id} sofreu 6 de dano.`);
                animateDamage(target.mechaElement); // Anima cada inimigo
            });
        }
    } 