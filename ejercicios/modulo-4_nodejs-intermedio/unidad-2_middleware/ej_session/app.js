// el ejemplo del pdf no esta funcionando. ejemplo actual de express-session npm
// Error: read ECONNRESET

const express = require('express');
const session = require('express-session');
const parseurl = require('parseurl')

const app = express();


// se crea la variable sesion
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname
    console.log(pathname)
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})


app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})


/* ejemplos del pdf no funcionan
// Crea req.session.contador
app.get('/crear', (req, res) => {
    res.sendStatus(req.session.contador)
});

// Uso de req.session.contador
app.get('/incrementar', (req, res) => {
    res.sendStatus(req.session.contador)
});
*/



// server
app.listen(3000, (req, res) => console.log("Server listening on port 3000"));