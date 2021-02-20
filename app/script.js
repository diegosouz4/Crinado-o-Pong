const canvas = document.querySelector('canvas');
const brush = canvas.getContext('2d');

//Variáveis Jogabilidade
const velocidade = 4;
const arrowUp = 38;
const arrowDown = 40;

//Variáveis placar
let meusPontos = 0;
let pontosOponente = 0;

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
let xOponente = 595;
let yOponente = 160;
let velocidadeYOponente;

//Variáveis de som
const somPonto = new Audio("/app/som/point.wav");
const somColisaoRaquete = new Audio("/app/som/hit.wav");
const somTorcida = new Audio("/app/som/torcida.wav");
const somDeFundo = new Audio("/app/som/base.wav");

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
    if(xBolinha + raioBolinha > 595|| xBolinha - raioBolinha < 5)  {
        velocidadeXBolinha *= -1;
    }
    if(yBolinha + raioBolinha > canvas.height - 5 || yBolinha - raioBolinha < 5)  {
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
        tocaSom(somColisaoRaquete,false);
    }
    if(xBolinha + raioBolinha > xOponente - larguraRaquete && yBolinha - raioBolinha > yOponente && yBolinha + raioBolinha <= yOponente + alturaRaquete) {
        velocidadeXBolinha *= -1;
        tocaSom(somColisaoRaquete,false);
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
    criaRetangulo('white', xOponente, yOponente, -larguraRaquete, alturaRaquete);
}

function moveOponente() {
    velocidadeYOponente = yBolinha - yOponente - alturaRaquete / 2 -30;
    if(meusPontos > pontosOponente) {
        velocidadeYOponente += 30;
    }
    if(pontosOponente > meusPontos) {
        velocidadeYOponente -= 30;
    }
    yOponente += velocidadeYOponente;
    console.log(velocidadeYOponente);
}

//Funções do placar
function mostraPlacar() {
    criaRetangulo('#fb8500',210, 10, 60, 40);
    criaStroke('white',210, 10, 60, 40);
    criaTexto('white','center','middle',meusPontos,240,32);
    criaTexto('white','center','middle',"VS",300,32);
    criaRetangulo('#fb8500',330,10,60,40);
    criaStroke('white',330,10,60,40);
    criaTexto('white','center','middle',pontosOponente,360,32);
}

function marcaPonto() {
    if(xBolinha - raioBolinha < 5 && xBolinha - raioBolinha > 0) {
        pontosOponente++;
        tocaSom(somPonto,false);
        tocaSom(somTorcida,false);
    }
    if(xBolinha + raioBolinha > 595 && xBolinha + raioBolinha < 600) {
        meusPontos++;
        tocaSom(somPonto,false);
        tocaSom(somTorcida,false);
    }
}

function finalizaJogo() {
    if(meusPontos > 3 ) {
        somDeFundo.pause();
        alert('Você ganhou o Jogo! Gostaria de Jogar novamente?');
        jogarNovamente();
    }
    if(pontosOponente > 3){
        somDeFundo.pause();
        alert('Você Perdeu! Gostaria de Jogar novamente?');
        jogarNovamente();
    }
}

function jogarNovamente() {
    meusPontos = 0;
    pontosOponente = 0;
    xBolinha = 300;
    yBolinha = 200;
    yRaquete = 160;
    tocaSom(somDeFundo,true);
}

// funções genéricas
function limpaTela() {
    brush.clearRect(0,0,600,400);
}

function criaRetangulo(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.fillStyle = cor;
    brush.fillRect(xInicial,yInicial,xFinal,yFinal);
}

function criaStroke(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.strokeStyle = cor;
    brush.strokeRect(xInicial,yInicial,xFinal,yFinal);
}

function criaTexto(cor,alinhamento,baseline,texto,x,y) {
    brush.fillStyle = cor;
    brush.textBaseline = baseline;
    brush.textAlign = alinhamento;
    brush.font = "20px Sans-serif";
    brush.fillText(texto,x,y);
}

function tocaSom(som,loop) {
    som.play();
    som.loop = loop;
}


criaRetangulo('black',0,0,600,400);
tocaSom(somDeFundo,true);

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
    mostraPlacar();
    marcaPonto();
    finalizaJogo();
}

setInterval(Atualiza, 20);