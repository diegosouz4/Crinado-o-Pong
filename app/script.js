var canvas = document.querySelector('canvas');
var brush = canvas.getContext('2d');

criaRetangulo(black,0,0,600,400);




// Funções de formas

function criaRetangulo(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.fillStyle = cor;
    brush.fillRect(xInicial,yInicial,xFinal,yFinal);
}

function criaBola(cor,x,y,raio) {
    brush.fillStyle = cor;
    brush.beginPath();
    brush.arc(x,y,raio,0,2 * Math.PI);
    brush.fill();
}






// Função Atualiza

function draw() {

}

setInterval(draw, 20);