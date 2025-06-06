const title = document.getElementById('title');
const menu = document.getElementById('menu');

title.addEventListener('click', () => {
  // Move o título para cima
  title.classList.add('move-up');

  // Após atraso, mostra os botões
  setTimeout(() => {
    menu.classList.remove('hidden');
    menu.classList.add('visible');
  }, 800);
});
function glitchClick() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gainNode = audio.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(80, audio.currentTime);
  gainNode.gain.setValueAtTime(0.05, audio.currentTime);
  oscillator.connect(gainNode).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.08);
}

// Adicione um evento de clique ao corpo do documento
document.body.addEventListener('click', function() {
  // Adicione a classe .fade-in aos botões
  document.querySelector('.menu').classList.add('fade-in');
});