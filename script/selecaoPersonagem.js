document.getElementById('laranja').addEventListener('click', animar);
 
function animar() {
  const elemento = document.getElementById('laranja');
  elemento.classList.toggle('clicou');
}