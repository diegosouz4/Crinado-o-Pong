var canvas = document.querySelector('canvas');
var brush = canvas.getContext('2d');

//Variáveis dda bolinha
var xBolinha = 300;
var yBolinha = 200;
var raioBolinha = 10;
var velocidade = 5;
var velocidadeXBolinha = velocidade;
var velocidadeYBolinha = velocidade;

criaRetangulo('black',0,0,600,400);

// Funções de formas

function criaRetangulo(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.fillStyle = cor;
    brush.fillRect(xInicial,yInicial,xFinal,yFinal);
}

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

// funções genéricas
function limpaTela() {
    brush.clearRect(0,0,600,400);
}

// Função Atualiza

function Atualiza() {
    limpaTela();
    criaBolinha();
    moveBolinha();
    colideBordas();
}

setInterval(Atualiza, 20);