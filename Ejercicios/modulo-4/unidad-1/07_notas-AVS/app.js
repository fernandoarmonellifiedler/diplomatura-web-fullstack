const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());


const uri = "mongodb+srv://lorenaizzo:xAZMgnKmq6q8AeqC@feelings-o88nv.mongodb.net/recepedia?retryWrites=true&w=majority";

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

const CategoriaSchema = new mongoose.Schema({
    nombre: String;
});

const CategoriaModel = mongoose.model("categoria", CategoriaModel)

const LibroSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    categoria_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoria"
    }
});

const RecetaModel = mongoose.model("receta",  RecetaSchema);


app.get('/libro', (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(413).send({mensaje: e.message});
    }
});








app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})