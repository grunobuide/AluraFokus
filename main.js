const hmtl = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");


curtoBt.addEventListener('click', () => alterarContext('descanso-curto'));
focoBt.addEventListener('click', () => {alterarContext('foco')}); 
longoBt.addEventListener('click', () => {alterarContext('descanso-longo')});


function alterarContext (contexto){
    hmtl.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`imagens/${contexto}.png`);
};
