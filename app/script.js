var canvas = document.querySelector('canvas');
var brush = canvas.getContext('2d');

//Variáveis dda bolinha
var xBolinha = 300;
var yBolinha = 200;
var raioBolinha = 10;
var velocidade = 6;
var velocidadeXBolinha = velocidade;
var velocidadeYBolinha = velocidade;

//Variáveis da raquete
var xRaquete = 5;
var yRaquete = 160;
var larguraRaquete = 8;
var alturaRaquete = 80;
var velocidadeRaquete = velocidade * 4;

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
    if(xBolinha - raioBolinha < xRaquete + larguraRaquete && yBolinha + raioBolinha > yRaquete && yBolinha + raioBolinha < yRaquete + alturaRaquete) {
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

var arrowUp = 38;
var arrowDown = 40;

document.onkeydown = movePlayer;

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
    colideRaquete();
}

setInterval(Atualiza, 20);