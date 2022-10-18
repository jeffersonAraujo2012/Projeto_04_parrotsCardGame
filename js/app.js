let numeroDeCartas;

do {
  numeroDeCartas = prompt("Com quantas cartas quer jogar?");
} while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0);

distribuirCartas();

function getCartas() {
  const cartas = [];

  for (let i = 0; i < numeroDeCartas / 2; i++) {
    let carta = document.createElement("div");
    carta.innerHTML = /*html*/ `
        <div class="face frente"></div>
        <div class="face verso"></div>
    `;
    carta.classList.add("carta", `carta--${i}`);
    cartas.push(carta.cloneNode(true));
    cartas.push(carta.cloneNode(true));
  }

  console.log(cartas);
  return cartas;
}

function embaralharCartas(cartas) {
    //Algoritmo Fisher-Yates
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const aux = cartas[j];
        cartas[j] = cartas[i];
        cartas[i] = aux;
    }
    return cartas;
}

function distribuirCartas() {
  const appArea = document.querySelector(".app");
  const cartas = embaralharCartas(getCartas());
  appArea.innerHTML = "";

  cartas.forEach((carta) => {
    appArea.appendChild(carta);    
  })
}
