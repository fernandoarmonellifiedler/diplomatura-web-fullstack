/* Paso a paso del video

// Preparando entorno de trabajo
- npm init (en la carpeta donde vamos a trabajar)
- npm i express
- npm i mysql
- crear app.js y en la app:
    - require express
    - require mysql
- como tendremos que recibir info en el body del formulario:
    - 1) usando urlencoded
    - 2) usando JSON (como en este ejemplo)

app.use(express.json())

- esto permite el mapeo de la peticion json a object js

- agregamos al final app.listen para crear el puerto y poder testear nuestra app

---------------------------------
Conexion a MySQL
- incluir la conexion con la base de datos

const conexion = mysql.createConnection({
    host...
})

- y luego establecer la conexion con:

conexion.connect();

- dentro de la funcion connect agregamos la callback para responder en caso de error

---------------------------------
Creación de la base de datos en phpMyAdmin
- creamos nueva base de datos y agregamos columnas. 
    - 1er col: id y autoincremental
    - 2da col: nombre / tipo VARCHAR y guardamos
- creamos nueva categoria para los productos con id, nombre, descripcion y categoria_id (que va a hacer la conexion con la tabla de ctaegorias)
- creamos una nueva tabla "listaencabezado" que será el encabezado con id y nombre
- finalmente, una nueva tabla "listaitems" con id, cantidad, producto_id (conecta con la tabla "productos") y listaencabezado_id (para saber a que lista corresponden los productos)

- luego de crear la categoria, con listas, etc, creamos las relaciones entre ellas. 
    - "producto" > estructura > vista de relaciones
    - alli en "columna" seleccionamos "categoria_id" - nombre de base de datos 
    - y en "tabla" colocamos con cual se relaciona. En este caso la tabla "categorias" con su columna "id" y guardamos

    (atención: una vez relacionadas es importante saber que cada producto de la tabla "productos" deberá tener una "categoria_id" existente de antemano en la tabla "categorias")

- en "listaitems" tenemos que hacer 2 relaciones: una con producto_id y otra con listaencabezado_id

- en VS Code, modificamos la const conexión para que en database esté el nombre de la base de datos que acabamos de crear "listacompras"


---------------------------------
Desarrollo de la logica de negocio
- Iremos de lo más necesario, la lista de Categorias, luego a la lista de productos y finalmente la lista de compras

--- Categoria de productos ---
- Dentro de la categoria de productos vamos a necesitar:
    - GET para devolver todas las categorias
    - GET + id para devolver solo una categoria
    - POST para guardar una categoria nueva
    - PUT para modificar una cat existente
    - DELETE para borrar una categoria existente

(Para productos y listas iremos haciendo lo mismo)

- Tendremos que primero definir la ruta
- ruta /categoria

    app.get('/categoria', (req, res) => {
        ...
    });

- Una vez dentro, es importante primero estar atento a los errores, eventos inesperados. Para ello, la estructura TRY/CATCH.
    - try: si llegan los datos esperados (dentro del funcionamiento normal)
    - catch: si no llegan, pasos a ser tomados en cuenta


--- Lista de Productos ---
- ruta /productos


--- Lista de Compras ---
- ruta /lista


// ==========================================
Como transformar el uso de callbacks con mysql para la conexion usando asyc/await (tomando el ejemplo del PDF, pág 15)

- en app.js incluimos el componente "util" y agregar la siguiente linea de código posterior a la conexion:

    const qy = util.promisify(conexion.query).bind(conexion);

- Esto transforma la callback en una promesa para despues aplicarle el async/await

- ahora si volvemos al get que dejamos en "Desarrollo de la logica de negocio" y borramos la linea

    conexion.query(query); 

- solicitaremos todas las categorias y la almacenamos en una variable

    const respuesta = qy(query); 

- y pasaremos los mismos parametros que le pasabamos a la query

- ahora falta manejar el asincronismo de la solicitud a la base de datos. para ellos:
    - agregamos await antes de qy(query)

        const respuesta = await qy(query); 
    - y agregamos async antes de la funcion que esta en el 2do parametro de la app.get
- finalmente agregamos la respuesta 

    res.send({"respuesta": respuesta})

- en el catch agregamos la respuesta en caso de error

---------------------------------

Nota: hasta aqui todo funcionando OK. Surgió un problema que conseguí dejando el campo de password vacío
video detenido en 1:10:25
*/