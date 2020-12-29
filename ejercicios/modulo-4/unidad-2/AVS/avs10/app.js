const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express();
app.use(express.json());

const port = process.env.PORT ? process.env.PORT : 3000;

// hago de cuenta que trabajo con mongo
app.post('/registro', async (req, res)=>{
    try{
        //Paso 1: verifico que el nombre de usuario no exista
        const userExiste = await usuario.find({user: req.body.user});

        if(userExiste.lenght > 0) {
            throw new Error('usuario existe');
        }

        // Paso 2: encripto la contraseña
        var claveEncriptada = await bcrypt.hash(req.body.pass, 10);

        const persona = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            user: req.body.user,
            pass: claveEncriptada
        }

        //Paso 3: guardar el usuario
        const response = await usuario.create(persona);

        res.send({mensaje: "registro correcto"});

    }
    catch(e) {
        console.log(e);
    }

})


app.post('/login', async (req, res)=>{
    try{
        if(!req.body.user || !req.body.pass ) {
            res.send({error: "no mandaste todos los datos"});
            return;
        }

        const usuario = await usuario.find({user: req.body.user});

        if(usuario.lenght == 0) {
            throw new Error('usuario inexistente');
        }

        if(!bcrypt.compareSync(req.body.pass, usuario[0].pass)){
            throw new Error("Fallo el login");
        }

        const tokenData = {
            nombre: usuario[0].nombre,
            apellido: usuario[0].apellido,
            user_id: usuario[0]._id
        }        
        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })        
        res.send({token});
    
    }
    catch(e){
        console.log(e);
    }
});

app.get('/producto', (req, res) => {
   
    let token = req.headers['authorization']
    
    if(!token){
        console.log('error');
        return;
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret', (err, user) => {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
          console.log('esto es user ', user)
        res.send({
          message: 'Awwwww yeah!!!!'
        })
      }
    })
});










app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto '+ port);
})