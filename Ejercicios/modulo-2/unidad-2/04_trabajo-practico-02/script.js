/* Consigna:
- Como se puede apreciar, se trata de un vector con 20 posiciones. Cada posición tiene un objeto que posee nombre y precio. Para acceder a cada uno de ellos se utiliza la siguiente notación:

productos[<numero_de_posicion>].nombre para acceder al nombre
productos[<numero_de_posicion>].precio para acceder al precio.

Ejemplo:
for(let i = 0; i <20 ; i++) {
console.log(productos[i].nombre);
console.log(productos[i].precio);
}

- Desarrollar un “carrito de compras” donde el usuario presione sobre cada producto y el mismo quede guardado en el carrito. Luego, al oprimir el botón “Comprar”, calcular el importe final y mostrar los productos comprados junto con el total a pagar. Solo puede comprar una unidad de cada producto.*/

var productos = [
    {nombre: "harina", precio: 35},
    {nombre: "pan", precio: 25},
    {nombre: "papa", precio: 52},
    {nombre: "palta", precio: 55},
    {nombre: "fideos", precio: 85},
    {nombre: "aceite", precio: 350},
    {nombre: "sopa", precio: 86},
    {nombre: "mermelada", precio: 108},
    {nombre: "porotos", precio: 69},
    {nombre: "lentejas", precio: 85},
    {nombre: "mandarina", precio: 43},
    {nombre: "banana", precio: 79},
    {nombre: "leche de almendras", precio: 145},
    {nombre: "papel higiénico", precio: 147},
    {nombre: "lavandina", precio: 55},
    {nombre: "alcohol en gel", precio: 123},
    {nombre: "shampoo", precio: 400},
    {nombre: "arroz", precio: 66},
    {nombre: "harina2", precio: 35},
    {nombre: "salsa de tomate", precio: 35}
]

var carrito = []; // array/vector que contendrá los elementos seleccionados para la compra
var carritoConPrecio = [];


function crearTabla() { // esta funcion crea todo el html que va en el body
    
    // A_CREANDO EL HEADER CON SU TITULO Y DESCRIPCION
    var header = document.createElement("header"); // crea el header
    header.setAttribute("style", "text-align: center;"); // estilo del header

    var title = document.createElement("h1"); // crea titulo
    var titleText = document.createTextNode("Carrito de compras"); // crea texto del titulo
    title.appendChild(titleText); // el texto del titulo se coloca como child dentro del titulo
    header.appendChild(title); // se agrega el titulo (h1) dentro del header

    var descripcion = document.createElement("p"); // se repiten los pasos para la descripcion
    var descripcionText = document.createTextNode("Seleccione uno o más productos para agregar a su carrito de compras. Al finalizar presione el botón 'Comprar'.");
    descripcion.appendChild(descripcionText);
    header.appendChild(descripcion);
    var descripcion2 = document.createElement("p");
    var descripcionText2 = document.createTextNode("Solo puede comprar una unidad de cada producto.");
    descripcion2.appendChild(descripcionText2);
    header.appendChild(descripcion2);

    document.body.appendChild(header); // se agrega finalmente el header al body del documento HTML

    // B_CREANDO LA TABLA
    var container = document.createElement("div"); // se agrega una div como container de la tabla
    var tabla = document.createElement("table"); // se crea la tabla
    container.appendChild(tabla); // se inserta la tabla dentro del div "container"
    document.body.appendChild(container); // se coloca el contenedor dentro del body del documento
    
    // estilos de CSS para los elementos recien creados
    document.body.setAttribute("style", "margin: 0; padding: 0; text-align: center;")
    container.setAttribute("style", "max-width: 650px; display: flex; justify-content: space-between; margin: 0 auto;");
    tabla.setAttribute("style", "text-align: left; min-width: 300px;")

    // C_LOOP/CICLO FOR PARA CREAR CADA ELEMENTO DE LA TABLA SEGUN EL VECTOR "PRODUCTOS"
    for(let i = 0 ; i < productos.length ; i++) {

        // se crea una fila por cada producto del vector "productos"
        var fila = document.createElement("tr"); // esto crea cada fila de la tabla (<tr>). Cada fila tendrá 4 columnas <td>
        tabla.appendChild(fila); // se agrega cada fila a la tabla

        // 1) nombre del producto
        var filaNombre = document.createElement("td"); 
        fila.appendChild(filaNombre);
        var filaNombreTexto = document.createTextNode(productos[i].nombre);
        filaNombre.appendChild(filaNombreTexto);

        // 2) precio del producto
        var filaPrecio = document.createElement("td"); // precio del producto
        fila.appendChild(filaPrecio);
        var filaPrecioTexto = document.createTextNode("$" + productos[i].precio);
        filaPrecio.appendChild(filaPrecioTexto);

        // 3) boton de "agregar al carrito"
        var boton = document.createElement("button");
        fila.appendChild(boton);
        var botonTexto = document.createTextNode("Agregar al carrito");
        boton.appendChild(botonTexto);

            boton.addEventListener("click", function() {
                if (!carrito.includes(productos[i].nombre)) { // si el carrito no tiene el producto seleccionado (! = negación) entonces:
                    carrito.push(" " + productos[i].nombre); // ... lo agrega al vector del carrito
                    carritoConPrecio.push(productos[i].precio) // (agregué un segundo vector solo para sumar los precios al final)

                    resumenTexto.textContent += " - " // estos son pequeños ajustes para exhibir los valores al final con espacio entre ellos
                    resumenTexto.textContent += productos[i].nombre;
                    resumenTituloTexto.textContent = "Productos en el carrito:"
                } else { //sino no hace nada y emite un alerta de que no se pueden agregar más productos
                    window.alert("Solo puedes agregar una unidad de cada producto!"); 
                }
            });

        /* TRECHO DE CODIGO DESCARTADO
        // 4) status de compra del producto
        var filaStatus = document.createElement("td"); // status de compra: producto disponible / producto no disponible
        fila.appendChild(filaStatus);
        var filaStatusTexto = document.createTextNode("producto disponible");
        filaStatus.appendChild(filaStatusTexto);
        //filaStatus.setAttribute("id", [i]); // se utiliza .setAttribute() para darle un id al status de compra. La idea es poder cambiar este status luego
        filaStatus.id = productos[i].nombre;
        */
    }

    // D_ DIV QUE EXHIBE EL BOTON DE COMPRA Y EL TOTAL DE LA COMPRA
     
    var resultado = document.createElement("div"); // creando la div contenedora
    container.appendChild(resultado); // se agrega la div a la div "container"
    resultado.setAttribute("style", "text-align = 'center'; min-width: 300px; max-width: 300px;")// estilo de la <div>
    
    // boton de compra
    var botonComprar = document.createElement("button");
    var botonComprarTexto = document.createTextNode("Comprar");
    botonComprar.appendChild(botonComprarTexto);
    resultado.appendChild(botonComprar);
    botonComprar.setAttribute("style", "margin-top: 25px;"); // estilo del boton

        botonComprar.addEventListener("click", function() { // evento y funcion para calcular el total
            var total = document.createElement("p"); // al clickear se crea un nuevo parrafo
            var totalTexto = document.createTextNode("Total de tu compra: $");
            total.appendChild(totalTexto);

            var listaFinal = document.createElement("p"); // aqui tambien se crea un nuevo parrafo
            var listaFinalTexto = document.createTextNode("Sus productos seleccionados: ");
            listaFinalTexto.textContent += carrito + " "; // se exhibe el vector conteniendo los productos
            listaFinal.appendChild(listaFinalTexto);

            // ciclo for para sumar los valores contenidos en el vector con los precios acumulados
            var suma = 0;
            for (let j = 0 ; j < carritoConPrecio.length ; j++) {
                suma = suma + carritoConPrecio[j];
            };
            totalTexto.textContent += suma; // este parrafo exhibe el total

            resultado.appendChild(total); // se agrega el total a la <div> "resultado"
            resultado.appendChild(listaFinal); // se agrega el total a la <div> "resultado"

            resultado.removeChild(resumenTitulo); // y se eliminan los textos que ennumeraban los productos seleccionados
            resultado.removeChild(resumen);
        });

    // finalmente, este es el texto que resume la compra previo a clickear en el boton "Comprar"
    var resumenTitulo = document.createElement("p");
    var resumenTituloTexto = document.createTextNode("Aqui verás el resultado de tu compra:");
    resumenTitulo.appendChild(resumenTituloTexto);
    resultado.appendChild(resumenTitulo);

    var resumen = document.createElement("p"); // aqui se iran acumulando los productos
    var resumenTexto = document.createTextNode("");
    resumen.appendChild(resumenTexto);
    resultado.appendChild(resumen);
}