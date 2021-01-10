/* Concepto de deploy

Deploy o despliegue de una aplicación es el proceso por el cual una aplicación pasa a 0estar productiva.

Ahora que tenemos nuestra aplicación lista para publicar en nuestro servidor de Internet, debemos realizar unos pasos previos para poder publicar la misma definitivamente.

Los pasos principales que debemos realizar para publicar nuestra aplicación son:

1. Validar que pase todos los casos de testeo de manera correcta
2. Verificar la seguridad de nuestra aplicación
3. Hacer los cambios necesarios para el entorno productivo
4. Subir la aplicación al servidor productivo
5. Iniciar la aplicación en el servidor productivo
6. Verificar el funcionamiento de la aplicación

-------------------------
Preparación de un proyecto NodeJS para el deploy

1) Validar casos de testeo
La manera más sencilla de verificar que nuestra aplicación pase los testeos es correr los mismos de forma manual, por línea de comandos, y en caso que todos los testeos hayan pasado de manera correcta, podemos garantizar que la aplicación funciona correctamente (para los casos de testeo que hayamos definido)

Existen herramientas de automatización de disparo de los tests y despliegue de la aplicación, las mismas se encuentran fuera de los alcances de este curso, pero recomendamos analizar las mismas y su funcionamiento, ya que se obtendrán ventajas
significativas con su uso.

Estas herramientas son las llamadas CI (Continuous Integration / Integración continua) y entre las más populares podemos destacar:

● Jenkins: https://jenkins.io
● Travis CI: https://travis-ci.com
● Hudson CI: http://hudson-ci.org
● Bamboo: https://www.atlassian.com/software/bamboo
● TeamCity: https://www.jetbrains.com/teamcity/
● GitLab CI: https://about.gitlab.com/product/continuous-integration/


2) Verificar la seguridad
La seguridad en nuestras aplicaciones es esencial, debemos proteger nuestra aplicación ante ataques maliciosos. Es importante poder proteger todo el trabajo que hemos hecho, y la seguridad de nuestros usuarios que nos confían sus datos.

Existen varias herramientas que ayudan a validar la seguridad de nuestra aplicación, las cuales ampliaremos en la sección 2 de esta Unidad.


3) Hacer los cambios necesarios para el entorno productivo
Existen algunos cambios, aunque sea mínimos, que debemos realizar en nuestra aplicación para poder publicarla en otro equipo. Entre los cambios más comunes podemos destacar los siguientes:

● Cambiar la configuración de los accesos a los datos (base de datos)
● Cambiar la configuración de los equipos contra los cuales nos conectamos (en caso de ser necesario)
● Cambiar la configuración de los directorios de los cuales depende nuestra aplicación y se encuentran por fuera de la misma (ej: si accedemos a un directorio particular del equipo, por fuera del directorio de nuestra aplicación)

Para facilitar el cambio de configuración entre el equipo en el cual se desarrolla y el servidor en el cual correrá la aplicación podemos utilizar paquetes que nos facilitarán el trabajo. Uno de estos paquetes es dotenv el cual permite usar un archivo de configuración con nombre “.env”.
Este archivo se debe encontrar en el directorio raíz de nuestro proyecto y no debemos incorporarlo en el control de versiones (Ej: GIT). Al no incorporarlo en el control de versiones nos aseguramos que no sobre-escribiremos la configuración de ningún equipo en el cual se corra la aplicación.

Comencemos instalando el paquete
npm install --save dotenv

Una vez instalado, debemos crear el archivo .env el cual contiene toda la configuración de nuestro proyecto en el formato clave=valor*/

PUERTO = 3000
DB_HOST = "localhost"
DB_COLLECTION = "curso_nodejs_intermedio"
MEMCACHED_SERVER = "localhost"
MEMCACHED_SECRET = "clave-muy-secreta-01-memcached"

/* Cada equipo en el cual se correrá la aplicación deberá tener su propio archivo .env con sus parámetros particulares dependiendo de la configuración.

En nuestro proyecto debemos inicializar dotenv. Para ello importamos el paquete e inicializamos el módulo llamando al método config. */

const dotenv = require('dotenv');
dotenv.config();

// Para usar la configuración del archivo .env solo debemos agregar process.env.<nombre de la clave>. Por ejemplo para usar el PUERTO en la inicialización del servidor Express

app.listen(process.env.PUERTO, function () {
console.log(`Iniciando la aplicación en http://localhost:${process.env.PUERTO}`);
});

// Para la configuración especificada en el ejemplo se sustituirá en tiempo de ejecución por
app.listen(3000, function () {
console.log(`Iniciando la aplicación en http://localhost:3000`);
});

/* Es una práctica habitual el incorporar en el control de versiones un archivo env_example o similar, el cual contenga los parámetros que acepta el archivo de configuración (aquellos parámetros que luego utilizamos en nuestra aplicación). Para que al momento de descargar el código en una nueva computadora, se copie el archivo env_example en .env y se modifique .env para que contenga los parámetros de configuración para el equipo en el cual se está corriendo la aplicación.

Puedes acceder al código de ejemplo en el repositorio https://github.com/cursos-utn/nodejs-intermedio/tree/m2_u3_configuracion en el cual se encuentra el archivo env_example de referencia. Recuerda que al momento de descargar el código en tu computadora, deberás crear el archivo .env con los parámetros de configuración que se encuentran en el archivo env_example (adaptandolo a tu equipo)


4) Subir la aplicación al servidor productivo
Una vez que ya tenemos nuestra aplicación lista para subir al servidor, queda el paso crucial que es su subida propiamente dicho e inicio. Existen diferentes métodos para subir la aplicación a un servidor, algunos manuales y otros automatizados.

Por medio de los procesos manuales, debemos realizar una conexión con el servidor en el cual vamos a desplegar nuestra aplicación (por FTP, SFTP o cualquier otro método de conexión que disponga el servidor), seleccionar la carpeta en la cual correrá nuestra
aplicación, y subir todos los archivos de nuestra aplicación a dicho equipo. Este es un proceso manual, que nos llevará tiempo y que debemos tener especial cuidado para garantizar la correcta subida de toda la aplicación.

Para el proceso de subida automatizado, existen muchas herramientas que nos pueden ayudar en esta tarea, que es repetitiva (cada vez que debemos actualizar nuestra aplicación en el servidor, debemos realizar esta tarea). Las herramientas de Integración
Continua que mencionamos anteriormente, generalmente disponen de herramientas para poder subir la aplicación al servidor de manera automática.

Cuando veamos la sección 3 Process Managers, veremos que NodeJS ya cuenta con una herramienta que nos puede ayudar en este proceso.

Es importante recordar que no es necesario copiar la carpeta node_modules, siempre y cuando hayamos utilizado el archivo package.json para manejar las dependencias de nuestra aplicación. Solo debemos ejecutar el siguiente comando en el servidor, para
descargar todas las dependencias de nuestra aplicación:

npm install

Automáticamente descarga todas las dependencias de nuestra aplicación en el directorio node_modules de nuestro servidor.


5) Iniciar la aplicación en el servidor productivo
Con nuestra aplicación ya lista para comenzar a funcionar, solo nos resta iniciar la misma.
El inicio de la aplicación se puede realizar de forma manual por línea de comandos (suponiendo que nuestro archivo principal es el app.js)

node app.js

Debemos prestar especial atención a que si por algún motivo nuestra aplicación se cierra inesperadamente, la misma dejará de funcionar. En la sección 3 de Process Managers, veremos cómo podemos hacer para que ante una finalización inesperada de la aplicación, la misma se inicie automáticamente.


6) Verificar el funcionamiento de la aplicación
Debemos acceder por medio de nuestro navegador a la aplicación, en el servidor, para verificar que la misma haya iniciado correctamente y poder garantizar su funcionamiento. En caso que se haya producido algún error en los pasos anteriores, es muy probable que aquí nos encontremos con que nuestra aplicación muestra un mensaje de error, o presenta algún comportamiento inesperado. De ser ese el caso, debemos volver a verificar todos los pasos que hemos realizado para poder detectar en cual se produjo el error y solucionarlo.


7) Seguridad
Antes de publicar nuestra aplicación, debemos verificar la seguridad de la misma.
Recomendamos verificar los siguientes pasos antes de subir nuestra aplicación:

1. Verificar que estamos utilizando versiones actuales de los módulos (dependencias
de nuestra aplicación)
2. Usar HTTPS en lo posible, para garantizar que las conexiones son seguras
3. Usar cookies de manera segura (intentar no utilizar el nombre predeterminado)
4. Verificar que las dependencias sean seguras
5. Asegurar nuestra aplicación con paquetes especiales (Ej: Helmet)
6. Verificar avisos de seguridad

Verificación de seguridad en dependencias
Para verificar si las dependencias de nuestro proyecto son seguras (no tienen vulnerabilidades) podemos ejecutar el comando

npm audit

El cual nos indicará las vulnerabilidades encontradas en nuestro proyecto (con respecto a dependencias).

El mismo npm nos permite solucionar los inconvenientes de dependencias por medio de una simple línea de comando

npm audit fix

-------------------------
Helmet
Es un paquete que podemos instalar como dependencia de nuestra aplicación, el cual nos permite asegurar las aplicaciones que utilizan Express, modificando varios de los encabezados HTTP que usa Express de manera predeterminada.

¿Que hace Helmet?
Helmet es un paquete que actúa como middleware para nuestras aplicaciones Express, el cual provee modificadores al comportamiento predeterminado de Express.

Los encabezados que modifica Helmet en Express son:
● Content security policy: permite definir en qué sitios y contenido debe confiar el browser.
● DNS Prefetch Control: no permite que se resuelvan los nombres de dominio a IPs antes de tiempo (haciendo prefetch a los enlaces de un sitio web)
● Frameguard: indica al navegador que la página no debe ser utilizada dentro de un IFrame.
● HPKP - HTTP Public Pinning: se envia al browser la clave pública del certificado (HTTPS) para que el pueda evaluar si el certificado ha sido vulnerado.
● HSTS - Strict Transport Security: le indica al browser que siempre utilice la versión HTTPS del sitio web, y nunca visite la versión HTTP (si existe).
● IE No Open: previene a versiones viejas de Internet Explorer que abran un archivo HTML descargado en el contexto de la aplicación.
● No cache: le indica al browser que no realice caché de los archivos. Esto previene el uso de archivos viejos (ej: JavaScript desactualizados).
● Don’t Sniff Mime Type: Indica al browser que no intente detectar el MIME Type del contenido. Ej: evita que un archivo con extensión JPG que contiene código JS sea ejecutado
● Referrer Policy: Le indica al browser que no incluya el campo Referer (para evitar que detecten desde donde se realizan los enlaces)
● XSS Filter: Intenta prevenir un único tipo de ataque XSS. El browser no debería ejecutar el código dentro de <script> si concuerda con el query string

Instalación de Helmet
La instalación de Helmet es muy sencilla, como todos los paquetes de NodeJS.

npm install helmet --save

Uso de Helmet
Al igual que la instalación, su uso es bastante sencillo. Una vez que hemos instalado la dependencia, solo resta incluir helmet en nuestro proyecto (en el código de nuestro archivo inicial) */

var helmet = require('helmet');
app.use(helmet());

/* Debemos indicar que incluímos módulo helmet y luego indicarle a Express que use dicho módulo como un middleware. Helmet automáticamente se encargará del resto.
*/