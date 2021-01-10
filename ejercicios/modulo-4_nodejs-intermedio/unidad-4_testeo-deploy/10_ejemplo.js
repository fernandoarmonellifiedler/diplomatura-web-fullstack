/* Ejemplo:

Testeo: El velador

Carlos ha comprado un velador y en la casa de electrodomésticos le sugirieron probarlo apenas llegara a su casa, ya que el plazo máximo para devolverlo es de 48hs.

Apenas llega a su casa, Carlos abre la caja del velador, tomó las instrucciones y se dispone a leerlas para evaluar la forma de probarlo.

En sus instrucciones de uso se indica que debe ser conectado a 220 volt de corriente alterna y previamente ajustar una lamparita de máximo 100 W. La lamparita mínima sugerida es de 20 W. El tipo de toma es de 3 patas planas, estilo americano

Carlos decide entonces, escribir algunos casos de testeo para asegurarse de que su nuevo velador es lo que esperaba y funciona correctamente.

-------------------------
Caso de prueba 1: El velador funciona?

- Pantalla/Módulo/Caso de uso: Encender el velador
- Objetivo de la prueba: Encender el velador con una lamparita de 50 watt y el velador
conectado a 220 volt
- Prerrequisitos de la prueba:
● Contar con el velador
● Contar con la lamparita
● Que haya corriente eléctrica en un toma de 3 patas planas
- Procedimiento
● Apoyar el velador en una superficie plana
● Enroscar la lamparita en el velador
● Enchufar el velador en el tomacorriente
● Presionar el interruptor del velador
- Resultados esperados:
La lámpara se enciende
- Resultado obtenido:
De acuerdo a lo esperado
- Observaciones: ---
- Resultado de la prueba: aprobado

-------------------------
Deploy
1) Despliegue en Heroku
Es una plataforma como servicio de computación en la nube (SAAS) que soporta distintos lenguajes de programación, entre ellos NodeJS.

2) Instalación del cliente heroku
Para poder utilizar heroku debemos instalar un cliente (el cual se utiliza por medio de línea de comando) en nuestra computadora. Debemos ingresar a https://devcenter.heroku.com/articles/heroku-cli#other-installation-methods y seleccionar el método que se adapte a nuestro sistema operativo

3) Verificación que el cliente funciona correctamente
Como primer paso debemos verificar que el cliente de heroku se encuentra instalado y funcionando, para ello ejecutamos en la línea de comandos (cmd, símbolo del sistema, terminal)

heroku —version

4) Asociar el cliente a nuestra cuenta
Debemos asociar el cliente de heroku con nuestra cuenta, para ello ejecutamos

heroku login

5) Adaptar el proyecto a heroku
Debemos realizar algunos cambios en nuestro proyecto para que el mismo pueda correr en heroku.
Debemos verificar que nuestro archivo package.json contenga un script de start, y que el mismo inicie la aplicación. 

"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}

Debemos agregar una sección engines, en la cual le indiquemos con que versión de NodeJS deberá correr nuestra aplicación cuando la despleguemos en los servidores de Heroku.

"engines": {
    "node": "10.x"
}

También deberemos modificar nuestro archivo principal para permitir que Heroku defina en qué puerto escuchará nuestra aplicación.

app.listen(process.env.PORT || 3000, () => {
    console.log('App escuchando en puerto 3000')
})

La configuración del puerto es interna a Heroku y es necesaria por la forma en al cual despliega las aplicaciones. Independientemente del puerto en el cual sea asignada nuestra aplicación, accederemos a ella de manera tradicional sin necesidad de especificar un puerto.

6) Desplegar la aplicación
Para el despliegue de la aplicación debemos seguir una serie de pasos sencillos. En primer lugar, debemos incorporar nuestro código al sistema de control de versiones GIT.

git add .
git commit -m "Proyecto en GIT"

Debemos indicarle a heroku que vamos a desplegar este proyecto en su plataforma

heroku create

Y realizamos el despliegue final realizando un push (prestar especial atención a la sintaxis en la cual se indica heroku en vez de origin (como muchas veces se utiliza en git)

git push heroku master

Al finalizar la operación nos mostrará la URL de la aplicación en un formato

https://<nombre-app>.herokuapp.com/

Dicha URL es en la cual la aplicación se encuentra funcionando. De esta forma ya tenemos todo listo para usar nuestra aplicación.

7) Logs para detección de errores
Podemos acceder a los últimos logs que genera nuestra aplicación por medio del siguiente comando

heroku logs —tail

Esto nos permitirá ver los últimos logs y de esta forma detectar problemas o conocer el funcionamiento de nuestra aplicación.
*/