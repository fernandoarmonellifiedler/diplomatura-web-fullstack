/* Trabajo Práctico:
Modificar la tabla de meses desarrollada en la Unidad para que al recargar (o cargar por primera vez) la página, la tabla se empiece a dibujar de arriba hacia abajo con un movimiento perceptible (dar un tiempo entre el dibujo de una fila y la siguiente para que se perciba el movimiento). */

var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
var dias = [31,28,31,30,31,30,31,31,30,31,30,31];

var titulo = document.querySelector("h1");
titulo.style.color="green";

var divTabla = document.getElementById("div-tabla");

var tabla = document.createElement("table");
divTabla.appendChild(tabla);
    
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

var divBotonera = document.getElementById("botonera");

var botonNocturno = document.createElement("button");
var botonNocturnoTexto = document.createTextNode("Nocturno");
botonNocturno.appendChild(botonNocturnoTexto);
divBotonera.appendChild(botonNocturno);
botonNocturno.addEventListener("click", function() {
    document.body.style.backgroundColor = "darkslategrey";

    for (let i = 1 ; i < meses.length ; i++) {
        tabla[i].style.color = "white";

        if (i%2 == 0) {
            tabla[i].style.backgroundColor = "grey";
        } else {
            tabla[i].style.backgroundColor = "black";
        }
    }
})

var botonDiurno = document.createElement("button");
var botonDiurnoTexto = document.createTextNode("Diurno");
botonDiurno.appendChild(botonDiurnoTexto);
divBotonera.appendChild(botonDiurno);
botonDiurno.addEventListener("click", function() {
    document.body.style.backgroundColor = "lightslategrey";
    
    for (let i = 1 ; i < meses.length ; i++) {
        tabla[i].style.color = "black";

        if (i%2 == 0) {
            tabla[i].style.backgroundColor = "palevioletred";
        } else {
            tabla[i].style.backgroundColor = "pink";
        }
    }
} )

/* 
var divBotonera = document.getElementById("botonera");

var botonNocturno = document.createElement("button");
var botonNocturnoTexto = document.createTextNode("Nocturno");
botonNocturno.appendChild(botonNocturnoTexto);
divBotonera.appendChild(botonNocturno);
botonNocturno.addEventListener("click", function() {
    document.body.style.backgroundColor = "darkslategrey";

    for (let i = 1 ; i < meses.length ; i++) {
        tabla[i].style.color = "white";

        if (i%2 == 0) {
            tabla[i].style.backgroundColor = "grey";
        } else {
            tabla[i].style.backgroundColor = "black";
        }
    }
})

var botonDiurno = document.createElement("button");
var botonDiurnoTexto = document.createTextNode("Diurno");
botonDiurno.appendChild(botonDiurnoTexto);
divBotonera.appendChild(botonDiurno);
botonDiurno.addEventListener("click", function() {
    document.body.style.backgroundColor = "lightslategrey";
    
    for (let i = 1 ; i < meses.length ; i++) {
        tabla[i].style.color = "black";

        if (i%2 == 0) {
            tabla[i].style.backgroundColor = "palevioletred";
        } else {
            tabla[i].style.backgroundColor = "pink";
        }
    }
} )
*/