
/* Ejemplo en JS
- En el JS utilizamos un setInterval para ir cambiando el src de la imagen. Lo hacemos de modo indefinido y cada mil milisegundos, es decir, una vez por segundo.

setInterval(); Hace "algo" (funcion) cada tanto tiempo
setTimeOut(); Hace "algo" (funcion) despues de transcurrido un tiempo

nota: los tiempos se calculan en milisegundos
*/

var titulo = document.querySelector("h1");
var texto = document.querySelector("p");
var tbody = document.querySelector("tbody");

var imagen = document.querySelector("img");
var imagenes = ["img1.jpeg", "img2.jpeg", "img3.jpeg"]

var i = 0;

setInterval(() => {
    imagen.src = "image/"+imagenes[i];
    i = i + 1;

    if(i == 3) {
        i = 0;
    }

}, 1000);