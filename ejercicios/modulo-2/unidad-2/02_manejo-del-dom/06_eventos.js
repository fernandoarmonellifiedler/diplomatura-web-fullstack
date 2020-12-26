/* Eventos disponibles:
- Los eventos que tenemos disponibles para interactuar con el usuario son los siguientes:

● onClick: se produce cuando el usuario hace click sobre una etiqueta HTML (por ejemplo un botón). 
Por ejemplo: Cuando el usuario hace click sobre Botón, se muestra un alerta con el mensaje “Presionó botón”. 

<script>
    function presionoBoton() {
        alert('Presiono botón');
    }
</script>

<body>
        ...
<button onClick="presionoBoton()">Botón</button>
...
</body>
*/

/*● onChange: se produce cada vez que el usuario cambia el contenido de una
etiqueta del tipo input (y abandona el campo de entrada)

<script>
    function cambioInput() {
        console.log("Cambio el valor");
    }
</script>

<body>
...
<input type="text" onChange="cambioValor()">
...
</body>
*/

/*● onFocus: se produce cada vez que el usuario ingresa a una etiqueta del tipo input

<script>
    function accedioAlElemento() {
        console.log("Accedió al elemento");
    }
</script>

<body>
...
<input type="text" onFocus="accedioAlElemento()">
...
</body>


*/

/*● onSubmit: se produce cuando el usuario envía un formulario

<script>
    function envioFormulario() {
        console.log('Envio formulario');
    }
</script>

<body>
...
<form onsubmit="envioFormulario()">
...
</form>
...
</body>
*/

/*● onScroll: que se produce cada vez que el usuario se desplaza en la página
(siempre y cuando exista un desplazamiento de la barra de scroll lateral)
 */


/* Parámetros a los eventos:
- Cuando se produce un evento, también tenemos la posibilidad de acceder al contexto del mismo (en donde se ejecutó el mismo). Por ejemplo:
● El input en el cual se produjo el evento, y al valor
● El formulario en el cual se produjo el submit
● El botón que fue presionado

- Estas operaciones principalmente se realizan sobre el evento onChange, cuando queremos acceder al valor que el usuario introdujo en el campo de entrada (input).

Veamos un ejemplo con el evento OnChange:

<script>
    function cambioInput(e) {
        console.log("Cambio el valor del input y ahora es " + e.target.value);
    }
</script>

<body>
...
<input type="text" onChange="cambioValor(event)">
...
</body>

- Ahora cuando el usuario cambia el valor del campo de entrada, y abandona el mismo, se ejecuta el método onChange, el cual llama a la función cambioInput. La función, en el parámetro e, recibe la información del contexto en el cual se ejecutó el evento, siendo e.target el campo que originó el evento. Para acceder a la propiedad value (el valor que
tiene el input) podemos utilizar e.target.value*/

/* Ejemplo con OnSubmit y preventDefault()

    <script>
        function envioFormulario(e) {
            console.log('Envio formulario');
            e.preventDefault();
        }
    </script>
</head>

<body>
    <form onsubmit="envioFormulario(event)">
        <input type="text">
        <button type="submit">Enviar</button>
    </form>

- De manera predeterminada, luego de ejecutarse el código de la función onSubmit se envía el formulario al servidor. Pero en varias oportunidades deseamos que el formulario no se envíe o que se envíe solo si pasa determinadas validaciones. Para prevenir que el formulario sea enviado al servidor, se hace uso de preventDefault(). Este evento, no continúa el circuito normal de enviar la información al servidor, sino que evita ese paso.
*/