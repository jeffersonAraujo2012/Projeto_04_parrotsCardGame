function iniciarRelogio() {
    let areaTempo = document.querySelector(".relogio");
    let tempoAtual = Number(areaTempo.innerHTML);

    const relogio = setInterval(() => {
        tempoAtual += 1;
        areaTempo.innerHTML = tempoAtual;
    }, 1000);

    return relogio;
}

export default iniciarRelogio;