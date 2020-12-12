/* Instalación de NodeJS
https://nodejs.org/es/download/

Gestor de paquetes NPM
Gestor de módulos para NodeJS. Se instala automáticamente con el NodeJS.
Para conocer la versión de node y npm que tenemos instalado (y así también saber si
están instalados) usar desde la terminal, los siguientes comandos:

Instalación de módulos con npm
Hay 2 formas de instalar módulos: local o globalmente
Localmente (recomendado)
El módulo deseado se instalará localmente en el proyecto que estemos trabajando, en
una carpeta llamada node_modules.

$npm install [nombre_modulo]

La carpeta node_modules se crea automáticamente al instalar un módulo.

Globalmente
Algunos módulos/aplicaciones, se pueden instalar para usarse desde cualquiera de
nuestros proyectos.

 $npm install -g [nombre_modulo]

No es muy recomendable porque si actualizamos la versión del módulo/aplicación por un
proyecto, estaremos afectando a todos los demás.

Ver la documentación de un módulo
(siempre que tenga el archivo .md creado):

$npm docs [nombre_modulo]

Se abre el navegador y va a la página de la documentación del módulo.
Utilizar los módulos

Desde el proyecto en Node.js

var modulo = require('modulo'); .
Package.json
NPM - package.json

Es un archivo fundamental para trabajar mejor y más fácil con npm.
Ventajas de usar package.json en nuestros proyectos
● No tenemos que instalar módulos uno a uno ya que se van a descargar de forma
automática.
● Facilita la instalación de nuestra aplicación a otros desarrolladores.
● Todos los archivos y documentación de una determinada aplicación se almacena en un solo lugar.

Se debe crear en el raiz de nuestro proyecto. La estructura quedará
app.js
package.json
node_modules

Estructura básica de package.json
No es necesario instalar de a uno los diferentes módulos. Sólo se debe ejecutar por línea
de comandos:

$npm install

Entonces:
1. NPM lee las dependencias incluídas en el archivo package.json
2. Instala automáticamente los módulos necesarios

A su vez, al compartir nuestra aplicación, no será necesario copiar la carpeta
node_modules ya que se podrá generar automáticamente.

Creación de una aplicación
NPM - Correr una aplicación - Nivel básico
1. Crear la carpeta donde va a estar nuestro proyecto
2. Escribir en un archivo, el programa a ejecutar. Nombrarlo con extensión .js
3. En la consola ejecutar node nombre_archivo.js y oprimir la tecla Enter
1. Crear la carpeta donde va a estar nuestro proyecto
2. Ejecutar el comando $npm init -f .
Esto creará en la carpeta, el archivo package.json que tendrá la siguiente forma:
3. Escribir en un archivo, el programa a ejecutar. Nombrarlo con extensión .js
4. Modificar package.json de la siguiente manera: (imagen)
5. En la consola, en la carpeta del proyecto, ejecutar el comando npm start .

Introducción e instalación de Express
Express.js es un framework para Node.js que sirve para ayudarnos a crear aplicaciones
web en menos tiempo ya que nos proporciona funcionalidades como el enrutamiento,
opciones para gestionar sesiones y cookies, y un largo etc…

Instalación
Suponiendo que ya está instalado nodejs y npm
> npm install --save express

Inclusión de Express en una aplicación NodeJs

‘use strict’
var express = require('express');
var app = express();
*/