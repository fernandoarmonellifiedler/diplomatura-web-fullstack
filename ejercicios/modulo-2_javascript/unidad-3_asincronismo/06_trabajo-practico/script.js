/* Trabajo Práctico:
Modificar la tabla de meses desarrollada en la Unidad para que al recargar (o cargar por primera vez) la página, la tabla se empiece a dibujar de arriba hacia abajo con un movimiento perceptible (dar un tiempo entre el dibujo de una fila y la siguiente para que se perciba el movimiento).

Notas:
- para poder darle un intervalo a la creacion de cada fila preferi recrear la tabla con js. 
- de este modo el intervalo se agregó dentro de la funcion dibujar() en ciclo donde se crearon las filas
*/

var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
var dias = [31,28,31,30,31,30,31,31,30,31,30,31];

// titulo de la pagina
var titulo = document.querySelector("h1");
titulo.style.color="green";
// tabla
var divTabla = document.getElementById("div-tabla");

var tabla = document.createElement("table");
divTabla.appendChild(tabla);
// filas iniciales (Mes - Dias)    
var filaInicial = document.createElement("tr");
tabla.appendChild(filaInicial);
    
var colMesInicial = document.createElement("th");
var colMesInicialTexto = document.createTextNode("Mes");
colMesInicial.appendChild(colMesInicialTexto);

var colDiasInicial = document.createElement("th")
var colDiasInicialTexto = document.createTextNode("Dias");
colDiasInicial.appendChild(colDiasInicialTexto);

filaInicial.appendChild(colMesInicial);
filaInicial.appendChild(colDiasInicial);

// Funcion que crea cada una de las filas al interior de la tabla teniendo en cuenta el intervalo de tiempo insertado
function dibujar() {
    var i = 0;
    var recorrido = setInterval(() => {
        
        if (i < meses.length) {
            var filas = document.createElement("tr");

            var colMes = document.createElement("td");
            var colMesTexto = document.createTextNode(meses[i]);
            colMes.appendChild(colMesTexto);
            filas.appendChild(colMes);

            var colDias = document.createElement("td")
            var colDiasTexto = document.createTextNode(dias[i]);
            colDias.appendChild(colDiasTexto);
            filas.appendChild(colDias);
        
            tabla.appendChild(filas);
            i++
        } else {
            clearInterval(recorrido)
        }
        
    }, 100);
}

// seccion para los botones
var fila = document.getElementsByTagName("tr");
var divBotonera = document.getElementById("botonera");

// boton Modo Nocturno
var botonNocturno = document.createElement("button");
var botonNocturnoTexto = document.createTextNode("Nocturno");
botonNocturno.appendChild(botonNocturnoTexto);
divBotonera.appendChild(botonNocturno);

botonNocturno.addEventListener("click", function() {
    document.body.style.backgroundColor = "darkslategrey";

    for (let i = 1 ; i <= meses.length ; i++) {
        fila[i].style.color = "white";

        if (i%2 == 0) {
            fila[i].style.backgroundColor = "grey";
        } else {
            fila[i].style.backgroundColor = "black";
        }
    }
})

// boton Modo Diurno
var botonDiurno = document.createElement("button");
var botonDiurnoTexto = document.createTextNode("Diurno");
botonDiurno.appendChild(botonDiurnoTexto);
divBotonera.appendChild(botonDiurno);

botonDiurno.addEventListener("click", function() {
    document.body.style.backgroundColor = "lightslategrey";
    
    for (let i = 1 ; i <= meses.length ; i++) {
        fila[i].style.color = "black";

        if (i%2 == 0) {
            fila[i].style.backgroundColor = "palevioletred";
        } else {
            fila[i].style.backgroundColor = "pink";
        }
    }
} )
