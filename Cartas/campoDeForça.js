export const campoDeForca = {
    name: 'Campo de Força',
    cost: 3,
    type: 'skill',
    description: 'Absorve 12 de dano recebido.',
    effect: function(caster, target) {
        console.log(`${caster.mechaElement.id} ativou um Campo de Força!`);
        
        // Adiciona 12 pontos à barreira do jogador.
        // A barreira será consumida antes da vida quando receber dano.
        caster.barrier += 12;
        console.log(`Barreira aumentada para ${caster.barrier}.`);
        // Adicionar um efeito visual de escudo seria excelente aqui.
    }
};