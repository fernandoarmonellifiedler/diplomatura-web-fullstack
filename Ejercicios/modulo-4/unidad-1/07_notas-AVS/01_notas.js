/* Notas AVS 26/12

- Sobre evaluación: tp integrador.

- M3 U4: sobre base de datos, hay diferentes tipos. relacionales o no relacionales.

- Mongoose establece la conexion. desde mongoDb sacamos el stream de conexion (const uri).
en mongo cuando se crea una base de datos o "coleccion". clusters > connect > etc > copiar uri para conectar con la base de datos.
- agregar funcion de conexion con base de datos.

Como hacer una API con mongo, ejemplo en el video:
- npm init
(instalar dependencias)
- npm install express
- npm i mongoose
- crear app.js
- hacer los require e iniciar el servidor


- metodo post y put recibis info en el encabezado (por la ruta) y en el body
- get y delete solo se recibe info en la ruta
- protocolo http nos da el metodo y la ruta
    POST /libro -> guardar
    GET /libro -> listado general
- GET tiene dos formas más
    GET /libro/:id -> solicitar un elemento
    GET /libro/:nombre -> para solicitar listado por nombre
- PUT y DELETE reciben siempre sobre un id
    PUT /libro/:id
    DELETE /libro/:id

- en node js:
    app.method('ruta', callback) {codigo a ejecutar cuando entra una peticion a este metodo y ruta};

- en base de datos la comunicación siempre será asincrona. Entonces es necesario elegir como trabajar ese asincronismo.
    - el más conveniente es el async/await 

- Cuando creamos un servidor API hay que tener en cuenta 2 cosas:
    1) manejo del asincronismo
    2) Manejo de errores y excepciones
    3) 

- Con respecto a los errores se usan try/catch
- en general hay 2 tipos de errores generales: errores que se pueden controlar y otros que no se pueden controlar pero si las consecuencias

- para poder recibir info en el body de una peticion hay que usar express.json
    app.use(express.json());
Esto se utiliza cuando estas usando una app cliente (angular, react, etc)
Existen otros casos donde se envian a traves de archivos estaticos info de un formulario. En ese caso se va a necesitar
    app.use(express.urlencoded());
Dependiendo del caso, express va a mapear la info a un obj javascript

- sobre archivos estaticos: habra una carpeta donde hay archivos que se mandan directamente, por ejemplo, una imagen, un html.
(como trabajaremos con clientes nunca enviaremos info desde un servidor y lo haremos desde React)

- si hace falta trabajar con mongo, se genera la uri y luego se conecta */

const uri = "mongodb+srv://...";

async function conectar() {
try{
await mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
})
console.log("Conectado a la base de datos metodo: mongoodb - async-await");
}
catch(e){
console.log(e);
}
};

conectar();

/*
- detalle: si mongoose no ubica la colección la va a crear
- lo importante en mongoose es trabajar con los esquemas y modelos
- crear un esquema con la estructura de la info que vas a guardar. y decir que tipo de dato es.
- importante: cuando se guarda una categoria no se guarda un tipo de dato sino una conexion , enlace a la otra coleccion (ej, categoria_id) y type: mongoose.Schema */

const CategoriaSchema = new mongoose.Schema({
    nombre: String
});

const LibroSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    categoria_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoria"
    }
});

const RecetaModel = mongoose.model("receta",  RecetaSchema);

/*
- entonces luego armo el modelo con el nombre de la coleccion, por ej, "categoria": CategoriaModel
y decis que este modelo corresponde  esta categoria */

const CategoriaModel = mongoose.model("categoria", CategoriaModel)

/*






*/