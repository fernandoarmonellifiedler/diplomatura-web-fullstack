/* 
Dudas:
- ejemplos de errores NO inesperados
------------------------
- sobre patrón MVC:
    - en nuestro modelo no trabajamos con vista/views
    - en controller solo va a quedar 


Ejemplo con /libro:
- habrá un libroController y un libroService.
- además habra un conexion.js y libro.js (o libroModel)
- en cuanto a la vista podria haber libroView.js
- cada uno en una carpeta particular

en app.js (o index.js) vas a tener los require y la creacion del servidor

en controllers van las rutas y los metodos POST, GET, etc y arriba se incluye el service del libro.
aqui se hará la comprobacion primaria de los datos (datos obligatorios, por ejemplo), la info que te mandan.
lo que se espera del service aqui es su respuesta, si pudo o no guardar. se almacena todo en un obj y luego creamos la respuesta.
con un if comprobamos si la respuesta esta bien ("ok", true, 1) 

en el service se hace la logica del negocio, se va a fijar si persona_id o genero existe en la BD. 
primero se agrega el modelo y luego las funciones como function guardarLibro() que hará las comprobaciones (si existe categoria, si el nombre no se repite, etc).
si existe o no, con un if, lanzamos un error

en models se generarian todas las queries. por ejemplo para verificar si existe la persona se crea la function existePersona que recibe un id. adentro esta la query

------------------------
- error predeterminado en caso de que no sea ninguno de los planteados. Una forma puede ser:

catch(e) {
    console.log(e);
    const mensaje = e.message ? e.message : "error inesperado";
    res.status(413).send({message: mensaje});
}

------------------------
sobre testeos y deploy:

- lo que vemos en el pdf son applicaciones que se incluyen en el proyecto para crear programas paralelos de testeo
- tipos de testeos: unitario y de integracion.
    - en el primero se testea lo que hiciste. se generan casos de testeo de posibles situaciones y cuales son los resultados, entre ellos el caso esperado.
    - en el segundo
una vez realizado esto, con mocha y chai, se definen los casos como en la pag 14 del pdf. (nos muestra el caso de testeo)
https://gitlab.com/lorena.izzo/dna-mutation

------------------------
usando heroku y haciendo la instalacion en git
*/