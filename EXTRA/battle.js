function runAway() {
  alert("Você fugiu da batalha!");
}

function endTurn() {
  const enemyHP = document.getElementById("enemy-hp");
  enemyHP.value -= 10;
  if (enemyHP.value <= 0) {
    alert("Você venceu!");
  }
}

function roboatk() {
    
    const robo = document.getElementById('p1-battle');
    
    robo.addEventListener('click', () => {
        robo.classList.remove('player');
        
        void robo.offsetWidth;
        
        robo.classList.add('player');
    });
}