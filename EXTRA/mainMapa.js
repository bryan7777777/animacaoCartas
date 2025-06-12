const container = document.getElementById("div2");
const shadow = container.attachShadow({ mode: "open" });

// Define CSS isolado
const style = `
  body {
    margin: 0;
    background-image: url(../img/background/mapa.png);
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding: 10px;
    overflow-x: auto;
    color: white;
    font-family: sans-serif;
  }

  canvas {
    margin-left: 14%;
    margin-top: 0.5%;
  }

  #mapa {
    display: flex;
    gap: 100px;
    padding: 60px 40px;
    position: relative;
    width: max-content;
    align-items: center;
    height: 700px;
    margin-left: 13.7%;
  }
  .coluna {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    position: relative;
    height: 700px;
  }
  .nodo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 18px;
    position: relative;
    user-select: none;
    transition: transform 0.2s, opacity 0.3s;
    z-index: 10;
    background-color: #666;
  }
  .nodo:hover { transform: scale(1.1); }
  .inimigo  { background: #d33; }
  .loot     { background: #fd0; color: black; }
  .loja     { background: #0d8; }
  .elite    { background: #a3f; }
  .hospital { background: #4cf; }
  .boss     { background: #000; border: 2px solid white; }
  .invalido { opacity: 0; pointer-events: none; }
  .nodo.inacessivel {
    background-color: #444 !important;
    color: #999 !important;
    cursor: default;
    pointer-events: none;
    transform: none !important;
  }
  .nodo.selecionado {
    box-shadow: 0 0 10px 3px #fff;
    transform: scale(1.2);
  }
  canvas#conexoes {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 5;
  }
`;

// Define HTML da interface
shadow.innerHTML = `
  <style>${style}</style>
  <canvas id="conexoes"></canvas>
  <div id="mapa"></div>
`;


// Começa o código JavaScript isolado no Shadow DOM
(() => {
  const tipos = ['inimigo', 'loot', 'loja', 'elite'];
  const mapa = [];
  const numFases = 10;
  const caminhosPorFase = 5;
  const mapaContainer = shadow.getElementById("mapa");
  const canvas = shadow.getElementById("conexoes");
  const ctx = canvas.getContext("2d");
  let nodoAtual = null;
  let iniciado = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function gerarMapa() {
    for (let i = 0; i < numFases; i++) {
      const coluna = [];
      for (let j = 0; j < caminhosPorFase; j++) {
        let tipo = tipos[Math.floor(Math.random() * tipos.length)];
        if (i === 0) tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'inimigo' : 'invalido';
        else if (i === numFases - 1) tipo = (j === Math.floor(caminhosPorFase / 2)) ? 'boss' : 'invalido';
        coluna.push({ tipo, conexoes: [] });
      }
      mapa.push(coluna);
    }

    for (let i = 0; i < numFases - 1; i++) {
      for (let j = 0; j < caminhosPorFase; j++) {
        if (mapa[i][j].tipo === 'invalido') continue;

        if (i === 0) {
          mapa[i][j].conexoes = [];
          for (let k = 0; k < caminhosPorFase; k++) {
            if (mapa[i + 1][k].tipo !== 'invalido') {
              mapa[i][j].conexoes.push(k);
            }
          }
          continue;
        }

        if (i === numFases - 2) {
          mapa[i][j].conexoes.push(Math.floor(caminhosPorFase / 2));
          continue;
        }

        let possiveis = [];
        if (j > 0 && mapa[i + 1][j - 1].tipo !== 'invalido') possiveis.push(j - 1);
        if (mapa[i + 1][j].tipo !== 'invalido') possiveis.push(j);
        if (j < caminhosPorFase - 1 && mapa[i + 1][j + 1].tipo !== 'invalido') possiveis.push(j + 1);
        mapa[i][j].conexoes = shuffle(possiveis).slice(0, Math.floor(Math.random() * 2) + 1);
      }
    }

    for (let i = 1; i < numFases; i++) {
      for (let j = 0; j < caminhosPorFase; j++) {
        if (mapa[i][j].tipo === 'invalido') continue;
        let temEntrada = mapa[i - 1].some(n => n.conexoes.includes(j));
        if (!temEntrada) {
          let vizinhos = [j, j - 1, j + 1].filter(x => x >= 0 && x < caminhosPorFase);
          shuffle(vizinhos);
          for (let v of vizinhos) {
            if (mapa[i - 1][v].tipo !== 'invalido') {
              mapa[i - 1][v].conexoes.push(j);
              break;
            }
          }
        }
      }
    }
  }

  function desenharMapa() {
    mapaContainer.innerHTML = '';
    mapa.forEach((coluna, i) => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('coluna');

      coluna.forEach((nodo, j) => {
        const el = document.createElement('div');
        el.classList.add('nodo', nodo.tipo);
        el.dataset.pos = `${i}-${j}`;
        el.textContent = {
          boss: '👑',
          inimigo: '⚔',
          loot: '🎁',
          loja: '🛒',
          elite: '💀',
          hospital: '❤️',
        }[nodo.tipo] || '';
        el.addEventListener('click', () => clicarNodo(i, j));
        colDiv.appendChild(el);
        nodo.element = el;
      });
      mapaContainer.appendChild(colDiv);
    });

    atualizarAcessibilidade();
    desenharConexoes();
  }

  function desenharConexoes() {
    const rect = mapaContainer.getBoundingClientRect();
    canvas.width = mapaContainer.scrollWidth;
    canvas.height = mapaContainer.scrollHeight;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    for (let i = 0; i < mapa.length - 1; i++) {
      mapa[i].forEach((nodo, j) => {
        const de = nodo.element.getBoundingClientRect();
        nodo.conexoes.forEach(k => {
          const para = mapa[i + 1][k].element.getBoundingClientRect();
          const x1 = de.left - rect.left + 20;
          const y1 = de.top - rect.top + 20;
          const x2 = para.left - rect.left + 20;
          const y2 = para.top - rect.top + 20;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      });
    }
  }

  function clicarNodo(i, j) {
    if (!iniciado) {
      if (i === 0 && j === Math.floor(caminhosPorFase / 2)) {
        iniciado = true;
        nodoAtual = { i, j };
        alert(`Iniciando batalha na sala: ${mapa[i][j].tipo}`);
        atualizarAcessibilidade();
        marcarSelecionado();
        centralizarNodo(mapa[i][j].element);
      } else {
        alert('Clique no ponto inicial para começar.');
      }
      return;
    }

    if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) {
      nodoAtual = { i, j };
      alert(`Você chegou em uma sala do tipo: ${mapa[i][j].tipo}`);
      atualizarAcessibilidade();
      marcarSelecionado();
      centralizarNodo(mapa[i][j].element);
    } else {
      alert('Você só pode avançar para os pontos conectados na próxima fase.');
    }
  }

  function atualizarAcessibilidade() {
    mapa.forEach((coluna, i) => {
      coluna.forEach((nodo, j) => {
        if (nodo.tipo === 'invalido') return;
        let podeClicar = false;
        if (!iniciado) {
          if (i === 0 && j === Math.floor(caminhosPorFase / 2)) podeClicar = true;
        } else {
          if (i === nodoAtual.i && j === nodoAtual.j) podeClicar = true;
          if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) podeClicar = true;
        }

        if (podeClicar) {
          nodo.element.classList.remove('inacessivel');
          nodo.element.style.pointerEvents = "auto";
          nodo.element.style.opacity = "1";
        } else {
          nodo.element.classList.add('inacessivel');
          nodo.element.style.pointerEvents = "none";
          nodo.element.style.opacity = "0.85";
        }
      });
    });
  }

  function marcarSelecionado() {
    mapa.forEach(coluna => {
      coluna.forEach(nodo => nodo.element.classList.remove('selecionado'));
    });
    if (nodoAtual) {
      mapa[nodoAtual.i][nodoAtual.j].element.classList.add('selecionado');
    }
  }

  function centralizarNodo(el) {
    const rect = el.getBoundingClientRect();
    const contRect = mapaContainer.getBoundingClientRect();
    const scrollX = rect.left - contRect.left + mapaContainer.scrollLeft - contRect.width / 2 + rect.width / 2;
    mapaContainer.scrollTo({ left: scrollX, behavior: "smooth" });
  }

  gerarMapa();
  desenharMapa();
})();