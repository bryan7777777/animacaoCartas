// script/main.js

document.addEventListener('DOMContentLoaded', () => {
    let telaAtual = 1;
    let telaAnterior = null;

    // INICIALIZAÇÃO
    mostrarTela(1); // Garante que a primeira tela seja exibida ao carregar
    const audio = document.getElementById('audio');
    if(audio) audio.play().catch(() => console.log("Usuário precisa interagir com a página para tocar áudio."));


    // --- NAVEGAÇÃO ENTRE TELAS ---
    function mostrarTela(n) {
        for (let i = 1; i <= 5; i++) {
            const tela = document.getElementById(`div${i}`);
            if (tela) {
                if (i === n) {
                    tela.style.transform = "translateY(0)";
                    tela.style.zIndex = 10;
                } else {
                    tela.style.transform = "translateY(100%)";
                    tela.style.zIndex = i;
                }
            }
        }
        telaAtual = n;
    }

    // --- MAPEAMENTO DE BOTÕES ---
    document.getElementById('fimSelecao').addEventListener('click', () => mostrarTela(2));
    document.getElementById('lutaUm').addEventListener('click', () => mostrarTela(2));
    document.getElementById('lojaUm').addEventListener('click', () => mostrarTela(2));
    
    document.getElementById('lutaDois').addEventListener('click', () => { telaAnterior = 3; mostrarTela(5); });
    document.getElementById('lojaDois').addEventListener('click', () => { telaAnterior = 4; mostrarTela(5); });

    document.getElementById('inventario').addEventListener('click', () => {
        if (telaAnterior) {
            mostrarTela(telaAnterior);
            telaAnterior = null;
        } else {
            mostrarTela(2); // Padrão: voltar para o mapa
        }
    });

    // --- LÓGICA DE SELEÇÃO DE PERSONAGEM ---
    document.querySelectorAll('.personagens').forEach(personagem => {
        personagem.addEventListener('click', (event) => {
            document.querySelectorAll('.personagens').forEach(el => el.classList.remove('ativo'));
            event.currentTarget.classList.add('ativo');
            const id = event.currentTarget.id;
            // Aqui você pode salvar a escolha do jogador, por exemplo:
            // localStorage.setItem('playerChoice', id);
            console.log(`Personagem selecionado: ${id}`);
        });
    });

    // --- LÓGICA DO MAPA (COM SHADOW DOM) ---
    const mapaContainer = document.getElementById("div2");
    if(mapaContainer) {
        const shadow = mapaContainer.attachShadow({ mode: "open" });

        const style = `
            :host { width: 100%; height: 100%; overflow: hidden; }
            #mapa-wrapper { background-image: url(../img/background/mapa.png); background-size: cover; background-position: center; width: 100%; height: 100%; overflow-x: auto; }
            canvas#conexoes { position: absolute; top: 0; left: 0; pointer-events: none; z-index: 5; }
            #mapa { display: flex; gap: 100px; padding: 60px; position: relative; width: max-content; align-items: center; height: 100%; }
            .coluna { display: flex; flex-direction: column; gap: 50px; justify-content: center; }
            .nodo { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 24px; position: relative; user-select: none; transition: transform 0.2s, box-shadow 0.2s; z-index: 10; border: 2px solid white; }
            .nodo:hover { transform: scale(1.1); }
            .inimigo  { background-color: #d33; }
            .loja     { background-color: #0d8; }
            .elite    { background-color: #a3f; }
            .hospital { background-color: #4cf; }
            .boss     { background-color: #000; transform: scale(1.2); }
            .invalido { display: none; }
            .inacessivel { filter: grayscale(1) brightness(0.6); cursor: default; pointer-events: none; }
            .selecionado { box-shadow: 0 0 15px 5px #fff; transform: scale(1.2); }
        `;

        shadow.innerHTML = `
            <style>${style}</style>
            <div id="mapa-wrapper">
                <div id="mapa"></div>
                <canvas id="conexoes"></canvas>
            </div>
        `;
        
        initializeMap(shadow);
    }
    
    function initializeMap(shadow) {
        const tipos = ['inimigo', 'hospital', 'elite'];
        const mapa = [];
        const numFases = 10;
        const caminhosPorFase = 5;
        const mapaDiv = shadow.getElementById("mapa");
        const canvas = shadow.getElementById("conexoes");
        const ctx = canvas.getContext("2d");
        const mapaWrapper = shadow.getElementById("mapa-wrapper");
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
                    if (i === numFases - 2) {
                        mapa[i][j].conexoes.push(Math.floor(caminhosPorFase / 2));
                        continue;
                    }
                    let possiveis = [];
                    if (j > 0 && mapa[i + 1][j - 1].tipo !== 'invalido') possiveis.push(j - 1);
                    if (mapa[i + 1][j].tipo !== 'invalido') possiveis.push(j);
                    if (j < caminhosPorFase - 1 && mapa[i + 1][j + 1].tipo !== 'invalido') possiveis.push(j + 1);
                    mapa[i][j].conexoes = shuffle(possiveis).slice(0, Math.floor(Math.random() * 2) + 1);
                    if(mapa[i][j].conexoes.length === 0 && possiveis.length > 0) mapa[i][j].conexoes.push(possiveis[0]);
                }
            }
             for (let i = 1; i < numFases - 1; i++) {
                for (let j = 0; j < caminhosPorFase; j++) {
                    if (mapa[i][j].tipo === 'invalido') continue;
                    let temEntrada = mapa[i - 1].some(n => n.conexoes.includes(j));
                    if (!temEntrada) {
                       let vizinhosComConexao = mapa[i-1].filter(n => n.tipo !== 'invalido' && n.conexoes.length > 0);
                       if(vizinhosComConexao.length > 0) {
                           let vizinhoAleatorio = vizinhosComConexao[Math.floor(Math.random() * vizinhosComConexao.length)];
                           vizinhoAleatorio.conexoes.push(j);
                       }
                    }
                }
            }
        }

        function desenharMapa() {
            mapaDiv.innerHTML = '';
            mapa.forEach((coluna, i) => {
                const colDiv = document.createElement('div');
                colDiv.classList.add('coluna');
                coluna.forEach((nodo, j) => {
                    const el = document.createElement('div');
                    if (nodo.tipo === 'invalido') {
                        el.classList.add('invalido');
                    } else {
                         el.classList.add('nodo', nodo.tipo);
                         el.dataset.pos = `${i}-${j}`;
                         el.textContent = { boss: '👑', inimigo: '⚔', loja: '🛒', elite: '💀', hospital: '❤️' }[nodo.tipo] || '';
                         el.addEventListener('click', () => clicarNodo(i, j));
                    }
                    colDiv.appendChild(el);
                    nodo.element = el;
                });
                mapaDiv.appendChild(colDiv);
            });
            atualizarAcessibilidade();
            // Um pequeno delay para garantir que o DOM foi renderizado antes de desenhar o canvas
            setTimeout(desenharConexoes, 100);
        }
        
        function desenharConexoes() {
            const rect = mapaDiv.getBoundingClientRect();
            canvas.width = mapaDiv.scrollWidth;
            canvas.height = mapaDiv.scrollHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 3;
            
            for (let i = 0; i < mapa.length - 1; i++) {
                mapa[i].forEach((nodo, j) => {
                    if (nodo.tipo === 'invalido') return;
                    const de = nodo.element.getBoundingClientRect();
                    nodo.conexoes.forEach(k => {
                        const para = mapa[i + 1][k].element.getBoundingClientRect();
                        const x1 = de.left - rect.left + de.width / 2;
                        const y1 = de.top - rect.top + de.height / 2;
                        const x2 = para.left - rect.left + para.width / 2;
                        const y2 = para.top - rect.top + para.height / 2;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    });
                });
            }
        }

        function clicarNodo(i, j) {
            const tipo = mapa[i][j].tipo;
            if (!iniciado) {
                if (i === 0) {
                    iniciado = true;
                    nodoAtual = { i, j };
                    executarAcao(tipo);
                    marcarSelecionado();
                    atualizarAcessibilidade();
                    centralizarNodo(mapa[i][j].element);
                }
                return;
            }
            if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) {
                nodoAtual = { i, j };
                executarAcao(tipo);
                marcarSelecionado();
                atualizarAcessibilidade();
                centralizarNodo(mapa[i][j].element);
            }
        }
        
        function atualizarAcessibilidade() {
            mapa.forEach((coluna, i) => {
                coluna.forEach((nodo, j) => {
                    if (nodo.tipo === 'invalido') return;
                    let podeClicar = false;
                    if (!iniciado) {
                        podeClicar = (i === 0);
                    } else {
                        if (i === nodoAtual.i + 1 && mapa[nodoAtual.i][nodoAtual.j].conexoes.includes(j)) {
                            podeClicar = true;
                        }
                    }
                    if (!podeClicar) {
                         nodo.element.classList.add('inacessivel');
                    } else {
                        nodo.element.classList.remove('inacessivel');
                    }
                });
            });
             if(nodoAtual) mapa[nodoAtual.i][nodoAtual.j].element.classList.remove('inacessivel');
        }

        function marcarSelecionado() {
            shadow.querySelectorAll('.nodo').forEach(n => n.classList.remove('selecionado'));
            if (nodoAtual) {
                mapa[nodoAtual.i][nodoAtual.j].element.classList.add('selecionado');
            }
        }
        
        function centralizarNodo(el) {
            const contRect = mapaWrapper.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const scrollX = (elRect.left - contRect.left + mapaWrapper.scrollLeft) - (contRect.width / 2) + (elRect.width / 2);
            mapaWrapper.scrollTo({ left: scrollX, behavior: "smooth" });
        }

        function executarAcao(tipo) {
            switch (tipo) {
                case 'inimigo':
                case 'elite':
                case 'boss':
                    telaAnterior = 2;
                    mostrarTela(3);
                    startBattle(); // Inicia uma nova batalha
                    break;
                case 'loja':
                    telaAnterior = 2;
                    mostrarTela(4);
                    break;
                case 'hospital':
                    telaAnterior = 2;
                    mostrarTela(5);
                    break;
            }
        }

        // Inicia o mapa
        gerarMapa();
        desenharMapa();
    }
});