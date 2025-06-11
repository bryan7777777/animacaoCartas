let telaAtual = 1;
let telaAnterior = null;

function mostrarTela(n) {
  for(let i = 1; i <= 5; i++) {
    const tela = document.getElementById(`div${i}`);
    if(tela) {
      if(i === n) {
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

function proximaTela() {
  if (telaAtual >= 3) return;
  mostrarTela(telaAtual + 1);
}

function irParaDiv2() {
  mostrarTela(2);
}

function irParaDiv4() {
  telaAnterior = telaAtual;
  mostrarTela(4);
}

function irParaDiv5() {
  telaAnterior = telaAtual;
  mostrarTela(5);
}

function voltarAnterior() {
  if(telaAnterior) {
    mostrarTela(telaAnterior);
    telaAnterior = null;
  } else {
    mostrarTela(1);
  }
}
// SELECAO
document.getElementById('laranja').addEventListener('click', selecao);
document.getElementById('amarelo').addEventListener('click', selecao);
document.getElementById('azul').addEventListener('click', selecao);

function selecao(event) {
  document.querySelectorAll('.personagens').forEach(el => {
    el.classList.remove('ativo');
});
event.currentTarget.classList.add('ativo');

const id = event.currentTarget.id;

let usuario;

  switch (id) {
    case 'azul':
      usuario = 3;
      break;
    case 'amarelo':
      usuario = 2;
      break;
    case 'laranja':
      usuario = 1;
      break;
    default:
      usuario = null;

    luta(usuario); // funçao que retorna o personagem do player
}
};

// MAPA


// LUTA
const hand = document.getElementById('hand');
    const cartas  = [
      {
        name: "Ataque",
        cost: 1,
        basePower: 5,
        rarity: "common",
        img: "./img/cards/atk/LancaGranadas.png",
        desc: "Causa 5 de dano ao inimigo."
      },
      {
        name: "Defesa",
        cost: 1,
        basePower: 3,
        rarity: "common",
        img: "./img/cards/def/Blindagem.png",
        desc: "Ganha 3 de defesa temporária."
      },
      {
        name: "Cura",
        cost: 2,
        basePower: 5,
        rarity: "rare",
        img: "./img/cards/buff/Cura.png",
        desc: "Recupera 5 de HP."
      },
      {
        name: "Explosão",
        cost: 3,
        basePower: 4,
        rarity: "epic",
        img: "./img/cards/atk/ExplosaoDeEnergia.png",
        desc: "Causa dano em área a todos os inimigos."
      },
      {
        name: "Escudo",
        cost: 1,
        basePower: 4,
        rarity: "rare",
        img: "./img/cards/def/Blindagem.png",
        desc: "Cria um escudo de 4 pontos."
      },
      {
        name: "Golpe Duplo",
        cost: 2,
        basePower: 4,
        rarity: "epic",
        img: "./img/cards/atk/tiroCarregado.png",
        desc: "Ataca duas vezes com 4 de dano cada."
      }
    ];

    function criarCarta(nome, index, total) {
      const carta = document.createElement("div");
      carta.className = "card";
      carta.textContent = nome;
      carta.style.animationDelay = `${index * 0.1}s`;

      // Leque mais espaçado
      const spread = 70; // Aumentado para mais separação angular
      const angle = -spread / 2 + (spread / (total - 1)) * index;
      const offsetX = (index - (total - 1) / 2) * 30; // Espaço horizontal entre cartas

      carta.style.left = `50%`;
      carta.style.transform = `translateX(${offsetX}px) rotate(${angle}deg)`;

      carta.addEventListener("click", () => {
        carta.classList.add("exit");
        carta.addEventListener("animationend", () => carta.remove());
      });

      hand.appendChild(carta);
    }

    cartas.forEach((nome, i) => criarCarta(nome, i, cartas.length));