// TROCA ENTRE AS TELAS
let telaAtual = 1;

function proximaTela() {
  if (telaAtual >= 4) return;

  telaAtual++;
  const proxima = document.getElementById(`div${telaAtual}`);
  proxima.style.transform = "translateY(0)";
}

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