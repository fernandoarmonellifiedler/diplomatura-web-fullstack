/* Consigna:
- Como se puede apreciar, se trata de un vector con 20 posiciones. Cada posición tiene un objeto que posee nombre y precio. Para acceder a cada uno de ellos se utiliza la siguiente notación:

productos[<numero_de_posicion>].nombre para acceder al nombre
productos[<numero_de_posicion>].precio para acceder al precio.

Ejemplo:
for(let i = 0; i <20 ; i++) {
console.log(productos[i].nombre);
console.log(productos[i].precio);
}

Desarrollar un “carrito de compras” donde el usuario presione sobre cada producto y el mismo quede guardado en el carrito. Luego, al oprimir el botón “Comprar”, calcular el importe final y mostrar los productos comprados junto con el total a pagar. Solo puede comprar una unidad de cada producto.*/

var productos = [
    {
        nombre: "harina",
        precio: 35
    },
    {
        nombre: "pan",
        precio: 25
    },
    {
        nombre: "papa",
        precio: 52
    },
    {
        nombre: "palta",
        precio: 55
    },
    {
        nombre: "fideos",
        precio: 85
    },
    {
        nombre: "aceite",
        precio: 350
    },
    {
        nombre: "sopa",
        precio: 86
    },
    {
        nombre: "mermelada",
        precio: 108
    },
    {
        nombre: "porotos",
        precio: 69
    },
    {
        nombre: "lentejas",
        precio: 85
    },
    {
        nombre: "mandarina",
        precio: 43
    },
    {
        nombre: "banana",
        precio: 79
    },
    {
        nombre: "leche de almendras",
        precio: 145
    },
    {
        nombre: "papel higiénico",
        precio: 147
    },
    {
        nombre: "lavandina",
        precio: 55
    },
    {
        nombre: "alcohol en gel",
        precio: 123
    },
    {
        nombre: "shampoo",
        precio: 400
    },
    {
        nombre: "arroz",
        precio: 66
    },
    {
        nombre: "harina",
        precio: 35
    },
    {
        nombre: "salsa de tomate",
        precio: 35
    }
]

var header = document.getElementById("header")
header.setAttribute("style", "text-align: center;")

function crearTabla() {
    // para crear tabla
    var container = document.createElement("div");
    var tabla = document.createElement("table");
    
    var resultado = document.createElement("div");
    var botonComprar = document.createElement("button");
    var botonComprarTexto = document.createTextNode("Comprar");
    var resumen = document.createElement("div");
    var resumenTexto = document.createTextNode("Aqui verás el resultado de tu compra");
    
    // apends
    document.body.appendChild(container);
    container.appendChild(tabla);
    document.body.appendChild(resultado);
    botonComprar.appendChild(botonComprarTexto);
    resumen.appendChild(resumenTexto);
    resultado.appendChild(botonComprar);
    resultado.appendChild(resumen);

    // style
    document.body.setAttribute("style", "margin: 0; padding: 0; text-align: center;")
    container.setAttribute("style", "max-width: 600px; margin: 0 auto;");
    tabla.setAttribute("style", "text-align: left;")
    resultado.setAttribute("id", "div-resultado");
    resultado.style.textAlign = "center";
    botonComprar.setAttribute("id", "boton-comprar");
    

    // para crear cada elemento de la tabla
    for(let i = 0 ; i < productos.length ; i++) {
        
        /* create */
        // filas y columnas
        var fila = document.createElement("tr");
        var filaNombre = document.createElement("td");
        var filaPrecio = document.createElement("td");
        var filaStatus = document.createElement("td");
        filaStatus.setAttribute("id", "status" + i);
        var filaNombreTexto = document.createTextNode(productos[i].nombre);
        var filaPrecioTexto = document.createTextNode(productos[i].precio);
        var filaStatusTexto = document.createTextNode("producto disponible");
        var filaStatusTexto2 = document.createTextNode("producto disponible");


        // botones
        var boton = document.createElement("button");
        var botonTexto = document.createTextNode("Agregar al carrito");
        boton.id = productos[i].nombre;
        boton.setAttribute("onClick", "agregarProductos(id)")

        /* appends */
        // filas y columnas
        tabla.appendChild(fila);
        fila.appendChild(filaNombre);
        fila.appendChild(filaPrecio);
        filaNombre.appendChild(filaNombreTexto);
        filaPrecio.appendChild(filaPrecioTexto);
        
        fila.appendChild(boton);
        boton.appendChild(botonTexto);

        fila.appendChild(filaStatus);
        filaStatus.appendChild(filaStatusTexto);
    }
}

var carrito = [];

function agregarProductos(nombre) {

}


/* 
        // filas y columnas
        var fila = document.createElement("tr");
        var filaNombre = document.createElement("td");
        var filaPrecio = document.createElement("td");
        var filaStatus = document.createElement("td");
        filaStatus.setAttribute("id", "status" + i);
        var filaNombreTexto = document.createTextNode(productos[i].nombre);
        var filaPrecioTexto = document.createTextNode(productos[i].precio);
        var filaStatusTexto = document.createTextNode("producto disponible");
*/