import { Carta as Carta } from "./Carta.js";
import { Cronometro as Cronometro } from "./Cronometro.js";

export class Jogo {
  _cartas = [];
  _cronometro;
  varJogo = {
    primeiraCarta: null,
    segundaCarta: null,
    numViradas: 0,
    cartasViradas: 0,
  };

  _gerarCartas() {
    for (let i = 0; i < this.varJogo.numeroDeCartas / 2; i++) {
      this._cartas.push(new Carta(i, this));
      this._cartas.push(new Carta(i, this));
    }
  }

  _embaralharCartas() {
    //Algoritmo Fisher-Yates
    for (let i = this._cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const aux = this._cartas[j];
      this._cartas[j] = this._cartas[i];
      this._cartas[i] = aux;
    }
  }

  _distribuirCartas() {
    const appArea = document.querySelector(".app");
    appArea.innerHTML = "";

    this._cartas.forEach((carta) => {
      appArea.appendChild(carta.nodeElement);
    });
  }

  _resetar() {
    this._cartas = [];
    this._cronometro;
    this.varJogo = {
      primeiraCarta: null,
      segundaCarta: null,
      numViradas: 0,
      cartasViradas: 0,
    };
  }

  iniciar() {
    do {
      this.varJogo.numeroDeCartas = prompt(
        "Com quantas cartas quer jogar? Escolha entre 4 e 14 cartas."
      );
    } while (
      this.varJogo.numeroDeCartas < 4 ||
      this.varJogo.numeroDeCartas > 14 ||
      this.varJogo.numeroDeCartas % 2 !== 0
    );

    this._gerarCartas();
    this._embaralharCartas();
    this._distribuirCartas();

    this.status = "Em andamento";
    this._cronometro = Cronometro.iniciar();
  }

  finalizar() {
    const tempoDeJogo = Cronometro.parar();

    alert(
      `Você ganhou em ${tempoDeJogo} segundos com ${this.varJogo.numViradas} jogadas!`
    );

    let desejaReiniciar;
    do {
      desejaReiniciar = prompt("Deseja reiniciar a partida?");
      if (desejaReiniciar === "sim") {
        this._resetar();
        this.iniciar();
      } else if (desejaReiniciar === "não") {
        alert("Obrigado por jogar!");
      } else {
        alert(
          "Você deve responder 'sim' ou 'não' em minúsculo com a acentuação correta"
        );
      }
    } while (desejaReiniciar !== "sim" && desejaReiniciar !== "não");
  }
}
