/* Preparación de un proyecto React para el deploy

Debemos ejecutar el comando

npm run build

Creará la carpeta build lista para subir a un servidor estático (Apache / NGINX)

----------------------------------
Archivo de configuración


<Directory "/var/www/html">
  ...
  AllowOverride All
  ...
</Directory>

.htaccess (en la carpeta del proyecto)
  Options -MultiViews
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]

  location / {
    root /usr/share/nginx/html; // Carpeta en donde está la web
    try_files $uri /index.html;
  }






*/