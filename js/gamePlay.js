import novoJogo from "./novoJogo.js";
import { numeroDeCartas, relogio } from "./novoJogo.js";

let numViradas = 0,
  cartasViradas = 0,
  cartasViradasRodada = [],
  primeiraCarta,
  segundaCarta;

function virarCarta(carta) {
  carta.classList.add("carta--virada");
  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    segundaCarta = carta;
  }
  numViradas++;
  console.log(numViradas);
}

function desvirarCartasRodada() {
  //Este if abaixo existe apenas para resolver um bug
  if (segundaCarta) {
    primeiraCarta.classList.remove("carta--virada");
    segundaCarta.classList.remove("carta--virada");
    primeiraCarta = null;
    segundaCarta = null;
  }
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
  if (!segundaCarta && !ehVirada) {
    virarCarta(carta);
  }

  //Quando o jogador virar duas cartas...
  if (primeiraCarta && segundaCarta) {
    //...verifica-se se elas são iguais.
    if (primeiraCarta.isEqualNode(segundaCarta)) {
      //Se forem, apenas zera-se a lista de cartasViradasRodada
      primeiraCarta = null;
      segundaCarta = null;
      cartasViradas += 2;
      if (cartasViradas == numeroDeCartas) finalizarJogo();
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

  let desejaReiniciar;
  do {
    desejaReiniciar = prompt("Deseja reiniciar a partida?");
    if (desejaReiniciar === "sim") {
      numViradas = 0;
      cartasViradas = 0;
      primeiraCarta = null;
      segundaCarta = null;
      novoJogo();
    } else if (desejaReiniciar === "não") {
      alert("Obrigado por jogar!");
    } else {
      alert(
        "Você deve responder 'sim' ou 'não' em minúsculo com a acentuação correta"
      );
    }
  } while (desejaReiniciar !== "sim" && desejaReiniciar !== "não");
}

export default controladorClickNaCarta;
