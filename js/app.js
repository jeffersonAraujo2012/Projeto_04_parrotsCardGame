let numeroDeCartas,
  cartasViradas = [];

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

  for (let carta in cartas) {
    cartas[carta].onclick = (event) => {
      event.preventDefault();
      controladorClickNaCarta(event.currentTarget);
    };
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
  });
}

function virarCarta(carta) {
  carta.classList.add("carta--virada");
}

function controladorClickNaCarta(carta) {
  //Verifica se a carta clicada está virada
  let ehVirada = carta.classList.contains("carta--virada");

  /*Se a quantidade de carta virada for menor que 2 e a carta 
  clicada não tiver sido virada, então vira-se a carta e a acrescenta 
  na lista de viradas*/
  if (cartasViradas.length < 2 && !ehVirada) {
    virarCarta(carta);
    cartasViradas.push(carta);
  }
   
  //Quando o jogador virar duas cartas...
  if (cartasViradas.length === 2) {
    //...verifica-se se elas são iguais.
    if (cartasViradas[0].isEqualNode(cartasViradas[1])) {
      //Se forem apenas zera-se a lista de cartasViradas
      cartasViradas = [];
    } else {
      /*Senão após 1000ms = 1s, as cartas da lista são desviradas 
        e o vetor de cartas viradas é zerado*/
      setTimeout(() => {
        cartasViradas.forEach((cartaVirada) => {
          cartaVirada.classList.remove("carta--virada");
        });
        cartasViradas = [];
      }, 1000);
    }
  }
}
