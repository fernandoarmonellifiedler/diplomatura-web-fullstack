/* Trabajo pr�ctico del M�dulo 3 y 4 INTEGRADOR

TP Integrador Modulo 3 y 4: Where is my books?

Se trata de un proyecto de desarrollo backend en NodeJS, utilizando API Rest y base de datos MySQL para conocer si los libros del usuario se encuentran en su biblioteca o prestados. En caso de estar prestado, a quien se los presto.


Se requiere conocer: 

1) De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser unico. Todos los datos son requeridos.

2) De los generos de los libros, solo los nombres, el campo nunca puede ser vacio o nulo y no pueden repetirse las categorias.

3) De los libros, el nombre, una descripcion, su categoria y la persona a la cual se le ha prestado el libro. Para representar que un libro se encuentra en la biblioteca se puede utilizar cualquiera de las siguientes estrategias: null para libros en la biblioteca en el campo de persona_id, que el usuario se encuentre ingresado como una persona mas.


Atención:
- Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.

- Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.

----------------------------------------------
Sobre presentación del trabajo:

Se evaluara la correcta implementacion, el uso de try/catch, async-await, cors, express, validacion de los datos solicitados, manejo de errores.

El tp se realizara en grupos de 5 o 6 personas que seran elegidas al azar por el campus

La entrega se realizara en formato ZIP y se deberan incluir: package.json, package-lock.json, app.js NO INCLUIR node_modules (va a descontar puntaje el envio de esta carpeta).

Solo 1 entrega por equipo. Se debe incluir un archivo txt con el numero de grupo y el nombre y apellido de los integrantes.


===============================================

            Documentacion de API: 

================== CATEGORIA ==================

GET '/categoria'
retorna:
    status 200  y [{id:numerico, nombre:string}]
    status: 413 y []

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/categoria

body(JSON): {}

----------------------------------------------
GET '/categoria/:id'
retorna:
    status 200 y {id: numerico, nombre:string}

    status: 413, {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/categoria/id

body(JSON): {}

----------------------------------------------
POST '/categoria'
recibe: {nombre: string}
retorna:
    status: 200, {id: numerico, nombre: string}

    status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"

--------
Datos requeridos para la petición:

Ruta: POST localhost:3000/categoria

body(JSON): 
{
    "nombre_categoria": "string"
}

----------------------------------------------
DELETE '/categoria/:id'
retorna:
    status 200 y {mensaje: "se borro correctamente"}

    status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"

No se debe implementar el PUT

--------
Datos requeridos para la petición:

Ruta: DELETE localhost:3000/categoria/id

body(JSON): {}


================== LIBRO ==================
GET '/libro'
devuelve:
    200 y [{id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}]
    
    status 413, {mensaje: <descripcion del error>} "error inesperado"

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/libro

body(JSON): {}

----------------------------------------------
GET '/libro/:id'
devuelve:
    200 e {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}

    status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro"

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/libro/id

body(JSON): {}

----------------------------------------------
POST '/libro'
recibe:
    {nombre:string,descripcion:string, categoria_id:numero, persona_id:numero/null}

devuelve:
    status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
    
    status 413,{mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"

--------
Datos requeridos para la petición:

Ruta: POST localhost:3000/libro

body(JSON):
{   
   "nombre_libro": "string",
   "descripcion": "string",
   "categoria_id": numero,
   "persona_id": numero/null
}
----------------------------------------------
PUT '/libro/:id'
recibe:
    {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}

devuelve:
    status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} modificado
    
    413, {mensaje: <descripcion del error>} "error inesperado",  "solo se puede modificar la descripcion del libro"

--------
Datos requeridos para la petición:

Ruta: PUT localhost:3000/libro/id

body(JSON):
{   
   "nombre_libro": "string",
   "descripcion": "string",
   "categoria_id": numero,
   "persona_id": numero/null
}

----------------------------------------------
PUT '/libro/prestar/:id':
recibe: {id:numero, persona_id:numero}

devuelve:
    200 y {mensaje: "se presto correctamente"}
    
    status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva", "no se encontro el libro", "no se encontro la persona a la que se quiere prestar el libro"

--------
Datos requeridos para la petición:

Ruta: PUT localhost:3000/libro/prestar/id

body(JSON):
{   
   "persona_id": numero/null
}

----------------------------------------------
PUT '/libro/devolver/:id'
recibe:
    {}
    
devuelve:
    200 y {mensaje: "se realizo la devolucion correctamente"}
    
    status 413, {mensaje: <descripcion del error>} "error inesperado", "ese libro no estaba prestado!", "ese libro no existe"

--------
Datos requeridos para la petición:

Ruta: PUT localhost:3000/libro/devolver/id

body(JSON): {}

----------------------------------------------
DELETE '/libro/:id'
devuelve:
    200 y {mensaje: "se borro correctamente"}
    
    status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro", "ese libro esta prestado no se puede borrar"

--------
Datos requeridos para la petición:

Ruta: DELETE localhost:3000/libro/id

body(JSON): {}


================== PERSONA ==================
GET '/persona'
retorna:
    status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}]
    
    status 413 y []

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/persona

body(JSON): {}

----------------------------------------------
GET '/persona/:id'
retorna:
    status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string}
    
    status 413 , {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

--------
Datos requeridos para la petición:

Ruta: GET localhost:3000/persona/id

body(JSON): {}

----------------------------------------------
POST '/persona'
recibe: 
    {nombre: string, apellido: string, alias: string, email: string}

retorna:
    status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string}
    
    status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"

--------
Datos requeridos para la petición:

Ruta: POST localhost:3000/persona

body(JSON):
{
    "nombre": "string",
    "apellido": "string",
    "alias": "string",
    "email": "string"
}

----------------------------------------------
PUT '/persona/:id'
recibe:
    {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar.

retorna:
    status 200 y el objeto modificado
    
    status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

--------
Datos requeridos para la petición:

Ruta: PUT localhost:3000/persona/id

body(JSON):
{
    "nombre": "string",
    "apellido": "string",
    "alias": "string",
    "email": "string"
}

----------------------------------------------
DELETE '/persona/:id'
retorna:
    200 y {mensaje: "se borro correctamente"}
    
    413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

--------
Datos requeridos para la petición:

Ruta: DELETE localhost:3000/persona/id

body(JSON): {}

*/