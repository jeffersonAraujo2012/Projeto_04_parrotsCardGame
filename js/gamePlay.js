import { numeroDeCartas, relogio } from "./novoJogo.js";

let numViradas = 0,
  cartasViradas = [],
  cartasViradasRodada = [];

function virarCarta(carta) {
  carta.classList.add("carta--virada");
  cartasViradas.push(carta);
  cartasViradasRodada.push(carta);
  numViradas++;
  console.log(numViradas);
}

function desvirarCartasRodada() {
  cartasViradasRodada.forEach((cartaVirada) => {
    cartaVirada.classList.remove("carta--virada");
    removerItemDeVetor(cartaVirada, cartasViradas);
  });
  cartasViradasRodada = [];
}

function removerItemDeVetor(item, vetor) {
  const indice = vetor.indexOf(item);
  vetor.splice(indice, 1);
}

function controladorClickNaCarta(carta) {
  //Verifica se a carta clicada está virada
  let ehVirada = carta.classList.contains("carta--virada");

  /*Se a quantidade de carta virada for menor que 2 e a carta 
    clicada não tiver sido virada: vira-se a carta*/
  if (cartasViradasRodada.length < 2 && !ehVirada) {
    virarCarta(carta);
  }

  //Quando o jogador virar duas cartas...
  if (cartasViradasRodada.length === 2) {
    //...verifica-se se elas são iguais.
    if (cartasViradasRodada[0].isEqualNode(cartasViradasRodada[1])) {
      //Se forem, apenas zera-se a lista de cartasViradasRodada
      cartasViradasRodada = [];
      if (cartasViradas.length == numeroDeCartas) finalizarJogo();
    } else {
      //Senão após 1000ms = 1s as cartas da lista são desviradas
      setTimeout(() => {
        desvirarCartasRodada();
      }, 1000);
    }
  }
}

function finalizarJogo() {
  clearInterval(relogio);
  let tempoDeJogo = document.querySelector(".relogio").innerHTML;

  alert(`Você ganhou em ${tempoDeJogo} segundos com ${numViradas} jogadas!`);
}

export default controladorClickNaCarta;
