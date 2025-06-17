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
