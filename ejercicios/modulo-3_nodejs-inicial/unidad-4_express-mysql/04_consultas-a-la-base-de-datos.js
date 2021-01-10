// Consultas a la base de datos desde Express

app.post('/login', function(req, res) {

    if (!req.body.usuario || !req.body.clave) {
        res.render('login', {error: 'No envió los datos'});
        // res.send('No envió los datos')
        return;
    }

    connexion.query('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [req.body.usuario, req.body.clave],
        function(error, registros, campos) {
            if (error) {
                res.send('Error al hacer el query');
                return;
            }

            if (registros.length == 1) {
                req.session.usuario.id = registros[0].id; //creamos la variable de session
                res.send('Ya se encuentra logueado');
            } else {
                res.send('Error en el logueo');
            }
        });
});