// script/tela.js

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const menu = document.getElementById('menu');
    const buttons = document.querySelectorAll('.glitch-btn');

    // Efeito sonoro para os botões
    function glitchClickSound() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(80, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        oscillator.connect(gainNode).connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.08);
    }

    // Animação do título e menu
    title.addEventListener('click', () => {
        title.classList.add('move-up');
        setTimeout(() => {
            menu.classList.remove('hidden');
            menu.classList.add('visible');
        }, 800);
    }, { once: true }); // Executa o evento de clique apenas uma vez

    // Adiciona o som a todos os botões
    buttons.forEach(button => {
        button.addEventListener('click', glitchClickSound);
    });
});