/* 1. Funciones anónimas
- En JavaScript es muy habitual trabajar con funciones, y hasta pasar una función como
parámetro a otra función. Un ejemplo de ellos es la función setInterval, la cual ejecuta una
función cada X milisegundos.
La función setInterval tiene el siguiente prototipo
setInterval(<función a llamar cada X milisegundos>, <X milisegundos);
Ejemplo: Esto llamará a la función mostrarFechaHora cada 1 segundo (1000 milisegundos)
 */

//function mostrarFechaHora() {
//    console.log(new Date());
//}
//setInterval(mostrarFechaHora, 1000);

/* Otra forma de escribir el mismo código es la siguiente: En vez de definir una función mostarFechaHora, se incluye el código de la función directamente en el llamado de setInterval(). Al pasar la función, estamos realizando el mismo proceso que el definir una función con un nombre y pasarla como parámetro. Es importante destacar que al pasar una función directamente como parámetro, no se incluye nombre de la misma setInterval(function()...). Este tipo de funciones, son llamadas funciones anónimas. */

//setInterval(function() {
//    console.log(new Date());
//}, 1000);

/* Ejemplo de funciones anónimas: Recorrer vectores
- Disponemos de diferentes alternativas para recorrer vectores en JavaScript, una de las
más utilizadas es forEach. La operación forEach es un método de todos los vectores, y
por lo tanto podemos utilizarlo para cualquier vector que utilicemos. El método forEach
recibe como parámetro una función que será llamada una vez por cada elemento del
vector (pasándole como parámetro el valor del elemento). Por ejemplo: */

var edades = [10,33,12,74,22,84,44];
edades.forEach(function(unElemento) {
console.log(unElemento);
});

/*
La salida por pantalla del código será
10
33
12
74
22
84
44
Llamándose a la función function(unElemento) {} una vez por cada elemento que exista en
el vector. Para el ejemplo mostrado, la función será llamada 7 veces.
 */

//========================================================================

/* 2. Funciones Arrow
- Se sustituye function() {} por ()=>{}
Tomando como referencia el código anterior, convertido a función arrow, el mismo queda
de la siguiente forma: */

//setInterval(() => {
//    console.log(new Date());
//}, 1000);

/* Ejemplo de funciones arrow: 
1) Encontrar la posición de un elemento en el vector (findIndex)
- Muchas veces deseamos encontrar la posición de un elemento dentro de un vector solo
teniendo una propiedad del elemento que estamos buscando (no todo el elemento
completo). Por ejemplo, si tenemos un listado de personas, puede ser que solo tengamos
el ID de la persona que deseamos encontrar, pero no todos los datos de la misma. En
estos casos, podemos utilizar el método findIndex() cuyo prototipo es el siguiente:

<vector>.findIndex(item => {
return <condición que se debe cumplir para haber encontrado el elemento>
})
Supongamos que tenemos el siguiente vector: */

var tareas = [
    {
    "id": 1,
    "title": "delectus aut autem",
    },
    {
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    },
    {
    "id": 3,
    "title": "fugiat veniam minus",
    }
];

// Y deseamos encontrar la posición de la tarea cuyo id es igual a 2. Utilizando findIndex llegaríamos al siguiente código:

var posicion = tareas.findIndex(item => {
    return item.id==2;
})
console.log(posicion); // posición tiene el valor 1, ya que es el segundo elemento del vector.

/*2) Eliminar elementos del vector (splice):
- Cuando deseamos reducir un vector a menos cantidad de elementos, por ejemplo, si tenemos 10 elementos, pero sólo deseamos quedarnos con los primeros 5 elementos, podemos usar el método splice. El cual tiene el siguiente prototipo

<vector>.splice(<desde>);
<vector>.splice(<desde>, <cantidad>);

- Para el primer caso, splice elimina del vector los elementos desde la posición indicada
<desde> hasta la finalización del vector.
- Para el segundo caso, splice elimina los elementos desde la posición <desde> y desde
esa posición eliminará <cantidad> elementos.

- Adicionalmente el método splice puede ser utilizado para agregar un elemento al vector,
en una posición determinada. Para ello, utilizamos la siguiente sintaxis
<vector>.splice(<posición>, 0, <nuevo elemento>);
En la posición <posición> se agrega <nuevo elemento> */

/*3) Convertir un vector (map)
- Si deseamos convertir los elementos de un vector, aplicarle alguna transformación, para ello disponemos del método map. El cual permite convertir una estructura A al formato de la estructura B. Si queremos sumar 1 a todos los valores que tenemos en un vector origen, podemos realizar una función map que realice la transformación. */

var edades = [10,33,12,74,22,84,44];
edades = edades.map(unItem => {
    return unItem+1;
})
console.log(edades); //[ 11, 34, 13, 75, 23, 85, 45 ]

// La función map, es especialmente útil cuando deseamos modificar el contenido de un vector JSON de objetos (JSON) a otro formato. Si deseamos convertir el vector de personas al formato {nombre_completo: ‘’, edad: 0} debemos aplicarle una transformación al vector original

var personas = [
    { nombre: 'Juan', apellido: 'Perez', edad: 40},
    { nombre: 'Maria', apellido: 'Gonzalez', edad: 33}
]

personas = personas.map(unItem => {
    return {
        nombre_completo: unItem.nombre + ' ' + unItem.apellido, edad: unItem.edad
    }
})

console.log(personas);
/* retorna:
[
    { nombre_completo: 'Juan Perez', edad: 40 },
    { nombre_completo: 'Maria Gonzalez', edad: 33 }
]
*/

/* Trabajo Práctico:
Modificar el carrito desarrollado en la Unidad 2 para utilizar funciones arrow. */