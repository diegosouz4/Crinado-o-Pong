const canvas = document.querySelector('canvas');
const brush = canvas.getContext('2d');

//Variáveis Jogabilidade
const velocidade = 5;
const arrowUp = 38;
const arrowDown = 40;

//Variáveis dda bolinha
let xBolinha = 300;
let yBolinha = 200;
const raioBolinha = 10;
let velocidadeXBolinha = velocidade;
let velocidadeYBolinha = velocidade;

//Variáveis da raquete
const larguraRaquete = 8;
const alturaRaquete = 80;
const velocidadeRaquete = velocidade * 4;

//Variáveis Jogador
let xRaquete = 5;
let yRaquete = 160;

//Variáveis Oponente
let xOponente = 587;
let yOponente = 160;
let velocidadeYOponente;

//funções da Bolinha
function criaBolinha() {
    brush.fillStyle = 'white';
    brush.beginPath();
    brush.arc(xBolinha,yBolinha,raioBolinha,0,2 * Math.PI);
    brush.fill();
}

function moveBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function colideBordas() {
    if(xBolinha+ raioBolinha > canvas.width || xBolinha - raioBolinha < 0)  {
        velocidadeXBolinha *= -1;
    }
    if(yBolinha + raioBolinha > canvas.height || yBolinha - raioBolinha < 0)  {
        velocidadeYBolinha *= -1;
    }
}

function reiniciaBolinha() {
    if(xBolinha - raioBolinha < - raioBolinha || xBolinha + raioBolinha > canvas.width + raioBolinha || yBolinha - raioBolinha < - raioBolinha || yBolinha + raioBolinha > canvas.height + raioBolinha ) {
        xBolinha = 300;
        yBolinha = 200;
    }
}

function colideRaquete() {
    if(xBolinha - raioBolinha < xRaquete + larguraRaquete && yBolinha - raioBolinha > yRaquete && yBolinha + raioBolinha < yRaquete + alturaRaquete) {
        velocidadeXBolinha *= -1;
    }
    if(xBolinha + raioBolinha > xOponente && yBolinha - raioBolinha > yOponente && yBolinha + raioBolinha <= yOponente + alturaRaquete) {
        velocidadeXBolinha *= -1;
    }
}

// funções do player
function criaPlayer() {
    criaRetangulo('white',xRaquete,yRaquete,larguraRaquete,alturaRaquete);
}

function movePlayer(event) {
    if(event.keyCode == arrowUp ) {
        yRaquete -= velocidadeRaquete;
    }
    if(event.keyCode == arrowDown) {
        yRaquete += velocidadeRaquete;
    }
}

document.onkeydown = movePlayer;

//Funções do Oponente

function criaOponente() {
    criaRetangulo('white', xOponente, yOponente, larguraRaquete, alturaRaquete);
}

function moveOponente() {
    velocidadeYOponente = yBolinha - yOponente - alturaRaquete / 2 -30;
    yOponente += velocidadeYOponente;
}

// funções genéricas
function limpaTela() {
    brush.clearRect(0,0,600,400);
}

function criaRetangulo(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.fillStyle = cor;
    brush.fillRect(xInicial,yInicial,xFinal,yFinal);
}

criaRetangulo('black',0,0,600,400);

// Função Atualiza

function Atualiza() {
    limpaTela();
    criaBolinha();
    moveBolinha();
    colideBordas();
    reiniciaBolinha();
    criaPlayer();
    criaOponente();
    moveOponente();
    colideRaquete();
}

setInterval(Atualiza, 20);