import controladorClickNaCarta from "./gamePlay.js";
import iniciarRelogio from "./relogio.js";

let numeroDeCartas;
let relogio;

function getCartas() {
  const cartas = [];

  for (let i = 0; i < numeroDeCartas / 2; i++) {
    const novaCarta = document.createElement("div");
    novaCarta.classList.add("carta", `carta--${i}`);
    novaCarta.innerHTML = /*html*/ `
      <div class="face frente"></div>
      <div class="face verso"></div>
    `;
    cartas.push(novaCarta.cloneNode(true));
    cartas.push(novaCarta.cloneNode(true));
  }

  for (let carta in cartas){
    cartas[carta].onclick = (e) => controladorClickNaCarta(e.currentTarget);
  }

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

function distribuirCartas(cartas) {
  const appArea = document.querySelector(".app");
  appArea.innerHTML = "";

  cartas.forEach((carta) => {
    appArea.appendChild(carta);
  });
}

function novoJogo() {
  do {
    numeroDeCartas = prompt("Com quantas cartas quer jogar?");
  } while (
    numeroDeCartas < 4 ||
    numeroDeCartas > 14 ||
    numeroDeCartas % 2 !== 0
  );

  let cartas = getCartas();
  cartas = embaralharCartas(cartas);
  distribuirCartas(cartas);

  document.querySelector(".relogio").innerHTML = 0;
  relogio = iniciarRelogio();
}

export default novoJogo;
export { numeroDeCartas, relogio};
