export class Carta {
  nodeElement;
  _varJogo;
  _jogo;

  constructor(tipo, jogo) {
    this._varJogo = jogo.varJogo;
    this._jogo = jogo;

    this.nodeElement = document.createElement("div");
    this.nodeElement.classList.add("carta", `carta--${tipo}`);
    this.nodeElement.innerHTML = /*html*/ `
      <div class="face frente"></div>
      <div class="face verso"></div>
    `;

    this.nodeElement.onclick = (e) =>
      this._controladorClickNaCarta(e.currentTarget);
  }

  _virarCarta() {
    this.nodeElement.classList.add("carta--virada");
    if (!this._varJogo.primeiraCarta) {
      this._varJogo.primeiraCarta = this.nodeElement;
    } else {
      this._varJogo.segundaCarta = this.nodeElement;
    }
    this._varJogo.numViradas++;
    console.log(this._varJogo.numViradas);
  }

  _desvirarCartasRodada() {
    //Este if abaixo existe apenas para resolver um bug
    if (this._varJogo.segundaCarta) {
      this._varJogo.primeiraCarta.classList.remove("carta--virada");
      this._varJogo.segundaCarta.classList.remove("carta--virada");
      this._varJogo.primeiraCarta = null;
      this._varJogo.segundaCarta = null;
    }
  }

  _controladorClickNaCarta(carta) {
    //Verifica se a carta clicada está virada
    let ehVirada = carta.classList.contains("carta--virada");

    //Só vira-se uma carta se ainda tiver cartas a serem viradas na rodada e se ela não tiver sido virada
    if (!this._varJogo.segundaCarta && !ehVirada) {
      this._virarCarta(carta);
    }

    //Quando o jogador virar duas cartas...
    if (this._varJogo.primeiraCarta && this._varJogo.segundaCarta) {
      //...verifica-se se elas são iguais.
      if (this._varJogo.primeiraCarta.isEqualNode(this._varJogo.segundaCarta)) {
        //Se forem, apenas zera-se a lista de cartasViradasRodada
        this._varJogo.primeiraCarta = null;
        this._varJogo.segundaCarta = null;
        this._varJogo.cartasViradas += 2;
        if (this._varJogo.cartasViradas == this._varJogo.numeroDeCartas) {
          //Este timeout resolve um bug de alguns dispositivos onde a ultima carta não virava visualmente
          setTimeout(this.finalizar, 500);
          this._jogo.finalizar();
        }
      } else {
        //Senão após 1000ms = 1s as cartas da lista são desviradas
        setTimeout(() => {
          this._desvirarCartasRodada();
        }, 1000);
      }
    }
  }
}
