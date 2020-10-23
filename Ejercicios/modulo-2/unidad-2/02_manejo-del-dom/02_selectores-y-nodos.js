/* Acceso directo a los nodos:
- Hay 2 métodos para acceder a un nodo específico: acceso a través de sus nodos padre y acceso directo.
- El acceso a los nodos, su modificación y su eliminación sólo es posible cuando el árbol DOM ha sido construido completamente, es decir, después de que la página se cargue por completo.

- Hay 3 funciones para acceder directamente a un nodo:
● getElementsByTagName(nombreEtiqueta)
● getElementsByClassName(nombreAtributo)
● getElementById(id) 

Crear un nodo
Recordar que cada elemento genera 2 nodos.
4 pasos:
1. Creación de un nodo de tipo Element que represente al elemento.
2. Creación de un nodo de tipo Text que represente el contenido del elemento.
3. Añadir el nodo Text como nodo hijo del nodo Element.
4. Añadir el nodo Element a la página, en forma de nodo hijo del nodo correspondiente al lugar en el que se quiere insertar el elemento.

Implica utilizar 3 funciones DOM:
● createElement(etiqueta): crea un nodo de tipo Element que representa al elemento cuya etiqueta se pasa como parámetro.
● createTextNode(contenido): crea un nodo de tipo Text que almacena el contenido textual de los elementos.
● nodoPadre.appendChild(nodoHijo): añade un nodo como hijo de otro nodo.

Se debe utilizar al menos dos veces con los nodos habituales: en primer lugar se añade el nodo Text como hijo del nodo Element y a continuación se añade el nodo Element como hijo de algún nodo de la página.

Ejemplo para la creación de un párrafo: */

// Crear nodo de tipo Element
var parrafo = document.createElement("p");

// Crear nodo de tipo Text
var contenido = document.createTextNode("Hola Mundo!");

// Añadir el nodo Text como hijo del nodo Element
parrafo.appendChild(contenido);

// Añadir el nodo Element como hijo de la página
document.body.appendChild(parrafo);

/* Eliminar un nodo:
Usar la función removeChild(nodo) que debe ser invocada desde el elemento padre.
Para acceder al padre de un nodo: nodoHijo.parentNode */

// <p id="provicional">...</p>

var parrafo = document.getElementById("provicional");
parrafo.parentNode.removeChild(parrafo)

/* Propiedades de un nodo:
- Para acceder al valor se indica el nombre del atributo HTML detras del nombre del nodo. Por ejemplo: */

// <a id="enlace" href="http://www...com">Enlace</a>
var enlace = document.getElementById("enlace");
alert(enlace.href); // muestra http://www...com