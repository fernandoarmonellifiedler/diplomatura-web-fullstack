/* Ejemplo

Deploy utilizando Heroku

- Si no se está usando git

git init
heroku create <nombre en heroku> --buildpack mars/create-react-app
git add .
git commit -m "Start with create-react-app"
git push heroku master
heroku open

- Si se está usando git
heroku create <nombre en heroku> --buildpack mars/create-react-app
git remote add heroku https://git.heroku.com/app.git
git checkout -b rama-heroku
git push heroku rama-heroku:master
heroku open

- Qué hace?
1. Hace el build
2. Instala dependencias
3. Instala un servidor NGINX
4. Despliega la app a Heroku


----------------------------------
Manejo de configuración

Generalmente necesitamos diferentes configuraciones para
  ● Desarrollo
  ● Producción


Opción 1: Parámetros

// Windows
set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start
// Windows PS
($env:REACT_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)
// Linux y MAC
REACT_APP_NOT_SECRET_CODE=abcdef npm start


Opción 2: Cómo lo manejamos?

Con un archivo de configuración por entorno
  ● .env archivo para cualquier ambiente
Es un archivo que NO guardamos en el repositorio (tenemos un archivo por equipo - desarrollo/producción/...)


Estructura del archivo de configuración

PROPIEDAD=VALOR
PROPIEDAD2=VALOR2


Uso
Necesitamos instalar un paquete auxiliar para manejar el archivo de configuración (dotenv)

npm install --save dotenv

import dotenv from 'dotenv';
dotenv.config();
// Acceso
process.env.PROPIEDAD_EN_ARCHIVO_ENV


Deploy
Si desplegamos en Heroku, no necesitamos incluir el archivo .env en el despliegue.
Tiene una interfaz para asignar las variables de entorno
*/
