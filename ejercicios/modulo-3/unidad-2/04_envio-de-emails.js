/* Envío de emails:
Instalamos el paquete
npm install nodemailer --save

Creamos el objeto de opciones de envío: */
var mailOptions = {
    from: 'tucorreo@gmail.com',
    to: 'mi-amigo@yahoo.com',
    subject: 'Asunto del Correo',
    text: mensaje
};

// Enviamos el mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
});

// en app.js

var express = require('express');

// requerimos el paquete
var nodemailer = require('nodemailer');
var app = express();

// creamos el objetode transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tuconstraseña'
    }
});

var mensaje = 'Hola desde nodejs...';