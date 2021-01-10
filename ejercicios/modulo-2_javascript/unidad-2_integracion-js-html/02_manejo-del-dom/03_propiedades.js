/* Propiedades más utilizadas:
- Para propiedades CSS: se accede mediante el atributo style. */

// <img id="imagen" style="margin:0; border:0; src="logo.png">
var imagen = document.getElementById("imagen")
alert(imagen.style.margin)

/* Para propiedades CSS con nombre compuesto, se accede eliminando los guiones (-).
● font-weight → fontWeight
● line-height → lineHeight
● border-top-style → borderTopStyle
● list-style-image → listStyleImage 
Por ejemplo: */

// <p id="parrafo" style="font-weight: bold;">...</p>
var parrafo = document.getElementById("parrafo");
alert(parrafo.style.fontWeight); // muestra "bold"


/*- Para atributo HTML class: se accede de forma diferente porque “class” es palabra reservada en JavaScript.
DOM utiliza className para referiste a class de HTML. Ejemplo:*/

// <p id="parrafo" class="normal">...</p>
var parrafo2 = document.getElementById("parrafo");
alert(parrafo2.class); // muestra "undefined"
alert(parrafo2.className); // muestra "normal"