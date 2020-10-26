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

function crearTabla() {
    // para crear tabla
    var tabla = document.createElement("table");
    var container = document.createElement("div");
    document.body.appendChild(container);
    container.appendChild(tabla);

    // style
    container.setAttribute("style", "max-width: 600px; margin: 0 auto;");
    

    // para crear cada elemento de la tabla
    for(let i = 0 ; i < productos.length ; i++) {
        
        /* create */
        // filas y columnas
        var fila = document.createElement("tr");
        var filaNombre = document.createElement("td");
        var filaPrecio = document.createElement("td");
        var filaNombreTexto = document.createTextNode(productos[i].nombre);
        var filaPrecioTexto = document.createTextNode(productos[i].precio);

        // botones
        var boton = document.createElement("button");
        var botonTexto = document.createTextNode("Agregar al carrito");
        boton.id = productos[i].nombre;

        /* appends */
        // filas y columnas
        tabla.appendChild(fila);
        fila.appendChild(filaNombre);
        fila.appendChild(filaPrecio);
        filaNombre.appendChild(filaNombreTexto);
        filaPrecio.appendChild(filaPrecioTexto);

        //botones
        fila.appendChild(boton);
        boton.appendChild(botonTexto);
    }
}


/* 
setAttribute("id", function() {
            for (let j = 0 ; j < productos.lenght ; j++) {
                return "boton-" + j;
            }
        })
*/