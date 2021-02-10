var canvas = document.querySelector('canvas');
var brush = canvas.getContext('2d');

criaRetangulo(black,0,0,600,400);




// Funções de formas

function criaRetangulo(cor,xInicial,yInicial,xFinal,yFinal) {
    brush.fillStyle = cor;
    brush.fillRect(xInicial,yInicial,xFinal,yFinal);
}