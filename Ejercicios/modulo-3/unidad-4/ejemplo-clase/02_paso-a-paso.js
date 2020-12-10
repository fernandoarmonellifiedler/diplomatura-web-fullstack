/* ---------------------------------
GET + id para devolver solo una categoria

    app.get('/categorias/:id', callback)

- :id es porque recibiremos el id en la ruta. Irá a una variable llamada id dentro de req.params

- dentro del get siempre tendremos un catch similar asi que lo copiamos.
- dentro del try haremos la consulta

- como el id queda almacenado dentro de req.params, entonces la query será:

    const query = 'SELECT * FROM categorias WHERE id = ?';
    (? es como un comodin)

- En general luego se parecen mucho, la diferencia sera en la const respuesta donde qy recibe dos parametros: la query y tambien un array con todos los datos que tienen que reemplazar en orden con ?.
    - como el unico dato que mandamos fue id y se encuentra en req.params...

    const respuesta = await qy(query, [req.params.id]);

- colocamos un console.log(respuesta) para ver la estructura de respuesta cuando hacemos un select para luego en el POST saber como preguntar acerca de su propia respuesta
    - vemos que retorna un array vacio

---------------------------------
POST para guardar una categoria nueva

- en principio, es un post igual al primer get. solo modificamos el try
- como el metodo es POST estaremos recibiendo por el body (req.body.nombre)
- debemos ante todo verificar el dato. validamos con if:

    if (req.body.nombre) {...}

- el problema es que luego el codigo puede extenderse demasiado haciendo uso del if/else. En vez de eso validamos si req.body.nombre NO se encuentra y tiramos el error al catch.
    - Eso se hace usando throw new Error

    try {
            if (!req.body.params) {
                throw new Error('Falta enviar el nombre');
            }
        }

- una vez validado puede ocurrir que se envíe el nombre de una categoria que ya existe. necesitamos consultarlo con la base de datos a traves de una query
- luego en la respuesta enviamos qy con dos parametros, la query y el dato adentro de un array

    let query = 'SELECT id FROM categorias WHERE nombre = ?';

    let respuesta = await qy(query, [req.body.nombre.toUpperCase()]); // agregamos upperCase para evitar diferencia de tipeo

- sabiendo que el get de /categorias/:id devuelve como respuesta un array, vamos a preguntar si el length del array es 0 o no. Si no es cero quiere decir que encontro una categoria con ese nombre (para no volver a cargarla).
    - creamos un if para determinar el length del array y si es mayor que 0 colocamos un nuevo throw new Error

    if (respuesta.length > 0) {
        throw new Error('Esa categoria ya existe');
    };


Habiendo hecho las comprobaciones, guardamos la categoria.
- reutilizamos la variable query con un INSERT

    query = 'INSERT INTO categorias (nombre) VALUE (?)';
    respuesta = await qy(query, [req.body.nombre.toUpperCse()]);

- enviamos la informacion. console.log para ver como es la respuesta y agregamos res.send...

    console.log(respuesta); // podemos borrarlo luego
    res.send({'respuesta': respuesta})

- Para probar: en Postman hacemos un POST en categorias y en el body seleccionamos 'raw' (fila) y en text 'JSON'

{
    "nombre": "lacteos"
}

*PROBLEMA: convertir req.body.nombre en una variable para poder aplicar el toUpperCase(). 
- igualmente no funcionó asi que de momento omitimos la conversión a upperCase y continuamos con el ejemplo

- Recibimos de respuesta un JSON. Si queremos devolver al cliente solo el id modificamos el res.send... por 

    res.send({ 'respuesta': respuesta.insertId })

---------------------------------
PUT/update para modificar una categoria existente

- PUT es un metodo combinado. En el header se manda el id y en el body se manda el dato a cambiar
- verificamos igual que antes si se mando el nombre y si ya se encuentra en la base de datos.
    - para este segundo caso creamos un query usando SELECT

    let query = 'SELECT * FROM categorias WHERE nombre = ?';

- en realidad la verificacion debe ser si hay algun otro nombre que sea igual ('lacteos' por ejemplo) pero que tenga diferente id al que estamos agregando.
    Es decir, en la condicion, que el nombre sea igual y que el id sea distinto del otro dato. Entonces:

    let query = 'SELECT * FROM categorias WHERE nombre = ? AND id <> ?';

- en la respuesta el qy tendra dos parametros, uno el query y el otro un array. Solo que en este caso el array tendra dos datos:
    - 1) el nombre, que viene por el body (req.body)
    - 2) el id, que viene por el encabezado (req.params)

    let respuesta = qy(query, [req.body.nombre, req.params.id]);

- luego verificamos si el length de la respuesta es mayor que 0 para ver si ya existe un dato que cumpla con tal requisito. Si existe, como antes, creamos un throw new Error.

    if (respuesta.length > 0) {
        throw new Error('El nombre de la nueva categoría ya existe');
    }

- caso contrario, el cambio se permite por lo que se reutiliza la variable query y respuesta como en el caso anterior

    query = 'UPDATE categorias SET nombre = ? WHERE id = ?';

    respuesta = qy(query, [req.body.nombre, req.params.id]);

- agregamos res.send...

PROBAMOS en Postman: seleccionamos metodo PUT.
- en la url va el id: localhost:3000/categorias/2
- en el body el nombre a actualizar

- ERROR: intentamos agregar lacteos al id 2 lo cual arrojaria un error ya que lacteos ya tiene id 1. Pero no devolvió error y permitió actualizar.
    - probamos console.log luego de declarar la variable respuesta. devuelve el mensaje de que la promise esta pendiente. se nos olvidó de agregar el await

- Ya funcionando, en vez de retornar el objeto JSON completo retornamos, por ejemplo, "affectedRows"

    res.send({ 'respuesta': respuesta.affectedRows })

---------------------------------
DELETE para borrar una categoria existente

- en este caso tambien irá id en la ruta
- el DELETE es complejo ya que al borrar es necesario que no hayan datos enlazados. No es posible borrar una categoria si hay productos que pertenecen a la misma. Entonces:
    -1) o se verifica que la categoria no tenga ningun producto asociado
    -2) o se hace un "borrado lógico": poner un campo extra dentro de la tabla para decir si se ha borrado o no y en todo caso evitar colocar dicha categoria en el listado que se retorne
- En este caso iremos por el ejemplo 1. Entonces debemos verificar si en la categoria no existe ningun producto (tabla producto) que tenga esa categoria asociada. Si es asi, podrá borrarse.

    let query = 'SELECT * FROM producto WHERE categoria_id = ?'

- verificamos si hay algun producto en el que coincide el id (categoria_id = ?) con el que es provisto en la ruta ('/categorias/:id')
- seguidamente, en la variable respuesta colocamos el req.params.id que es el provisto en la ruta del metodo.

    let respuesta = await qy(query, [req.params.id]);

- Si obtenemos respuesta (porque el array es mayor que 0) devolvemos un throw new Error.

- Habiendo pasado la primer verificacion sigue un nuevo query, esta vez con el DELETE.

    query = 'DELETE FROM categorias WHERE id = ?';

- finalmente agregamos la respuesta y el res.send...

---------------------------------
Extra: enlaces en la base de datos.

- evitar hacer llegar un error hasta la base de datos.
- verificar si la categoria existe previamente en la tabla de "categorias" para poder guardar un producto

- siguiendo para la tabla de "productos":

    app.post('/productos', (req, res) => {}

- donde tendremos tambien try/catch.
- Verificamos siempre por la negativa si los datos insertados son correctos o si han sido ingresados los datos obligatorios.En este caso, el nombre y categoria_id.

    if (!req.body.nombre || req.body.categoria_id) {
        throw new Error("No enviaste los datos obligtorios (nombre y categoria)");
    };

- verificamos luego, con una query si esa categoria existe en la tabla de categorias.

    let query = 'SELECT * FROM categorias WHERE id = ?';
    let respuesta = await qy(query, [req.body.categoria_id]);

- verificamos la respuesta, en este caso si es igual a 0 significa que no encontró la categoria y debe arrojarse un error.

    if (respuesta == 0) {
        throw new Error("Categoria no encontrada");
    };

- Ahora, si la categoria existe se podria verificar si el producto existe (por el nombre). Y luego un if para verificar la respuesta.

    query = 'SELECT * FROM productos WHERE nombre = ?';
    respuesta = await qy(query, [req.body.nombre]);
    if (respuesta.length > 0) {
        throw new Error("Ese nombre de producto ya existe");
    };

- Una ultima verificacion. Como descripción no es obligatoria, si existe la vamos a almacenar en una variable para luego proceder a insertarla en la tabla junto a los otros datos.

    let descripcion = '';
    if (req.body.descripcion) {
        descripcion = req.body.descripcion;
    };

- Habiendo pasado las comprobaciones, haremos el guardado

    query = 'INSERT INTO productos (nombre, descripcion, categoria_id) VALUES (?, ?, ?)';

- creamos la respuesta con todos los datos necesarios. Atención que descripcion no es un dato del body sino una variable. 

    respuesta = await qy(query, [req.body.nombre, descripcion, req.body.categoria_id]);

    res.send({'respuesta': respuesta.insertId});

PRUEBA: vamos a Postman para probar agregar un nuevo producto con POST y en el body colocamos:

{
    "nombre": "leche",
    "descripcion": "leche la armonia",
    "categoria_id": 1
}
*/