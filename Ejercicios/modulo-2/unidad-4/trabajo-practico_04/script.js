/* Consigna:
- Modificar el carrito desarrollado en la Unidad 2 para utilizar funciones arrow.

NOTAS:
- Reemplazé el loop for por forEach para recorrer el vector de productos
- Dentro del forEach utilizé una funcion arrow
- no consigo que funcione el findindex en el boton de agregar al carrito
*/

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

var carrito = [];
var carritoConPrecio = [];


function crearTabla() { 
    
    // A_CREANDO EL HEADER CON SU TITULO Y DESCRIPCION
    var header = document.createElement("header"); 
    header.setAttribute("style", "text-align: center;");

    var title = document.createElement("h1"); 
    var titleText = document.createTextNode("Carrito de compras"); 
    title.appendChild(titleText);
    header.appendChild(title);

    var descripcion = document.createElement("p");
    var descripcionText = document.createTextNode("Seleccione uno o más productos para agregar a su carrito de compras. Al finalizar presione el botón 'Comprar'.");
    descripcion.appendChild(descripcionText);
    header.appendChild(descripcion);
    var descripcion2 = document.createElement("p");
    var descripcionText2 = document.createTextNode("Solo puede comprar una unidad de cada producto.");
    descripcion2.appendChild(descripcionText2);
    header.appendChild(descripcion2);

    document.body.appendChild(header);

    // B_CREANDO LA TABLA
    var container = document.createElement("div"); // div container de la tabla
    var tabla = document.createElement("table"); // crear la tabla
    container.appendChild(tabla); 
    document.body.appendChild(container);
    
    // estilos de CSS para los elementos recien creados
    document.body.setAttribute("style", "margin: 0; padding: 0; text-align: center;")
    container.setAttribute("style", "max-width: 650px; display: flex; justify-content: space-between; margin: 0 auto;");
    tabla.setAttribute("style", "text-align: left; min-width: 300px;")

    // C_LOOP/CICLO FOR PARA CREAR CADA ELEMENTO DE LA TABLA SEGUN EL VECTOR "PRODUCTOS"
    productos.forEach(producto => {

        // crear una fila por cada producto del vector "productos"
        var fila = document.createElement("tr");
        tabla.appendChild(fila);

        // 1) nombre del producto
        var filaNombre = document.createElement("td"); 
        fila.appendChild(filaNombre);
        var filaNombreTexto = document.createTextNode(producto.nombre);
        filaNombre.appendChild(filaNombreTexto);

        // 2) precio del producto
        var filaPrecio = document.createElement("td"); // precio del producto
        fila.appendChild(filaPrecio);
        var filaPrecioTexto = document.createTextNode("$" + producto.precio);
        filaPrecio.appendChild(filaPrecioTexto);

        // 3) boton de "agregar al carrito"
        var boton = document.createElement("button");
        fila.appendChild(boton);
        var botonTexto = document.createTextNode("Agregar al carrito");
        boton.appendChild(botonTexto);

            boton.addEventListener("click", function() {
                if (!carrito.includes(" " + producto.nombre)) {
                    carrito.push(" " + producto.nombre); 
                    carritoConPrecio.push(producto.precio);

                    resumenTexto.textContent += " - "
                    resumenTexto.textContent += producto.nombre;
                    resumenTituloTexto.textContent = "Productos en el carrito:"
                } else {
                    window.alert("Solo puedes agregar una unidad de cada producto!"); 
                }
            });
    })

    // D_ DIV QUE EXHIBE EL BOTON DE COMPRA Y EL TOTAL DE LA COMPRA

    var resultado = document.createElement("div"); // crear div contenedora
    container.appendChild(resultado);
    resultado.setAttribute("style", "text-align = 'center'; min-width: 300px; max-width: 300px;")
    
    // boton de compra
    var botonComprar = document.createElement("button");
    var botonComprarTexto = document.createTextNode("Comprar");
    botonComprar.appendChild(botonComprarTexto);
    resultado.appendChild(botonComprar);
    botonComprar.setAttribute("style", "margin-top: 25px;");

        botonComprar.addEventListener("click", function() {
            var total = document.createElement("p"); // nuevo parrafo
            var totalTexto = document.createTextNode("Total de tu compra: $");
            total.appendChild(totalTexto);

            var listaFinal = document.createElement("p"); // nuevo parrafo
            var listaFinalTexto = document.createTextNode("Sus productos seleccionados: ");
            listaFinalTexto.textContent += carrito + " ";
            listaFinal.appendChild(listaFinalTexto);

            // sumar los valores contenidos en el vector carritoConPrecio
            var suma = 0;
            for (let j = 0 ; j < carritoConPrecio.length ; j++) {
                suma = suma + carritoConPrecio[j];
            };
            totalTexto.textContent += suma; // total

            resultado.appendChild(total);
            resultado.appendChild(listaFinal);

            resultado.removeChild(resumenTitulo); // eliminar textos previos
            resultado.removeChild(resumen);
            resultado.removeChild(botonComprar);
        });

    // texto-resumen de la compra previo a clickear en el boton "Comprar"
    var resumenTitulo = document.createElement("p");
    var resumenTituloTexto = document.createTextNode("Aqui verás el resultado de tu compra:");
    resumenTitulo.appendChild(resumenTituloTexto);
    resultado.appendChild(resumenTitulo);

    var resumen = document.createElement("p"); // aqui se iran acumulando los productos
    var resumenTexto = document.createTextNode("");
    resumen.appendChild(resumenTexto);
    resultado.appendChild(resumen);
}