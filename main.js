const hmtl = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseButton = document.querySelector("#start-pause");
const startPauseImg = document.querySelector(".app__card-primary-butto-icon");
const iniciarOuPausarBT = document.querySelector("#start-pause span");
const musicPlay = document.querySelector("#alternar-musica");
const temporizador = document.querySelector("#timer")
const musica = new Audio('sons/luna-rise-part-one.mp3');
const sonPlay = new Audio("sons/play.wav");
const sonPause = new Audio("sons/pause.mp3");
const sonAlarm = new Audio("sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musica.loop = true;

musicPlay.addEventListener("change", function(){
    if (musica.paused){
        musica.play()
    }
    else {
        musica.pause()
    }
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContext('descanso-curto')
    curtoBt.classList.add('active')
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContext('foco')
    focoBt.classList.add('active')
}); 

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContext('descanso-longo')
    longoBt.classList.add('active')
});


function alterarContext (contexto){
    
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    hmtl.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`imagens/${contexto}.png`);
    mostrarTempo()
    switch (contexto) {
        case 'foco':
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            title.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            title.innerHTML = `
            Hora de voltar a superfície,<br>
                <strong class="app__title-strong">faça uma pausa longa!</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    //iniciar();
    if (tempoDecorridoEmSegundos <= 0) {
        sonAlarm.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciarOuPausar () {
    if (intervaloId){
        sonPause.play()
        zerar()
        return;
    }
    sonPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseImg.setAttribute('src','imagens/pause.png')
    iniciarOuPausarBT.textContent = "Pausar"
};

function zerar (){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBT.textContent = "Começar"
    startPauseImg.setAttribute('src','imagens/play_arrow.png')


}

startPauseButton.addEventListener('click',iniciarOuPausar);

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos*1000) 
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
;