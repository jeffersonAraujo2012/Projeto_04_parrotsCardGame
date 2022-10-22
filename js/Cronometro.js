export class Cronometro {
  areaTempo;
  tempoAtual;
  static iniciar() {
    document.querySelector(".cronometro").innerHTML = 0;
    this.areaTempo = document.querySelector(".cronometro");
    this.tempoAtual = Number(this.areaTempo.innerHTML);

    this._timer = setInterval(() => {
      this.tempoAtual += 1;
      this.areaTempo.innerHTML = this.tempoAtual;
    }, 1000);
  }

  static parar() {
    if (this._timer) {
      clearInterval(this._timer);
    }
    return this.tempoAtual;
  }
}
