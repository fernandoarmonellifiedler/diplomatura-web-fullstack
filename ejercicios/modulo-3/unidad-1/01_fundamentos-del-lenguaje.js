/* Fundamentos del lenguaje

¿Qué es NodeJS?
Node.js® es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Node.js usa un modelo de operaciones E/S sin bloqueo y orientado a eventos, que lo hace liviano y eficiente. El ecosistema de paquetes de Node.js, npm, es el ecosistema más grande de librerías de código abierto en el mundo.

Ventajas:
● Uso del mismo lenguaje en el cliente (JS) y en el servidor
● Reutilizacion de codigo (cliente y servidor)
● Usa el motor V8 de Chrome
● Entrada/Salida sin bloqueo
● Orientado a eventos
● Liviano
● Gran cantidad de paquetes

Uso del mismo lenguaje en el cliente y en el servidor
Una de las ventajas principales de NodeJS es la posibilidad de utilizar un único lenguaje de programación para hacer el desarrollo del frontend (JavaScript) y del backend (JavaScript en NodeJS). Lo cual reduce los tiempos de capacitación, disminuye las equivocaciones en sintaxis por cambio de lenguajes, y la posibilita tener un mayor manejo de toda la aplicación a desarrollar.

Reutilización de código
Al ser el mismo lenguaje que se utiliza en el cliente y el servidor (JavaScript), vamos a poder disponer de funciones que son aplicables (y código en general) que podremos utilizar tanto en el cliente de nuestra aplicación, como en el servidor. Esto reduce los tiempos de desarrollo, y mejora el mantenimiento de la aplicación.

Usa el motor V8 de Chrome
Es la tecnología sobre la cual corre NodeJS, la cual está ampliamente probada, es ágil y tiene varios años de desarrollo y madurez. Lo cual le da robustez, y velocidad a las aplicaciones desarrolladas en NodeJS.

Entrada/Salida sin bloqueo
Todas las operaciones que hacen uso de dispositivos (lectura en disco, consulta de
información a través de Internet, etc) no bloquean a la aplicación, es decir, la aplicación sigue funcionando sin ningún tipo de ralentización. Este es uno de los principales motivos por los cuales NodeJS tiene una performance destacable frente a otras tecnologías para desarrollo de aplicaciones backend (servidoras).

Orientado a eventos
Todo el desarrollo en NodeJS está orientado a eventos que “disparan” una acción, lo cual hace que usemos el mismo concepto en toda la aplicación. Cuando desarrollamos en
JavaScript, lado cliente, por ejemplo podemos tener un evento que es el onClick (cuando el usuario hace click), el cual “disparará” el código que nosotros especifiquemos. En NodeJS es similar, tenemos eventos que se “disparan” cuando el usuario hace una petición (como en la mayoría de las tecnologías server side), pero también se “disparan” eventos cuando se termina de leer una petición a otro equipo, cuando obtenemos un dato de una base de datos, etc.

Liviano
Uno de los puntos fuertes de NodeJS es lo “liviano” que es, esto quiere decir que con
pocos requerimientos de Hardware podemos desplegar una aplicación en NodeJS.
Muchas grandes empresas ya han comenzado a migrar sus desarrollos desde tecnologías
más “pesadas” como JAVA/GRAILS/RUBY a NodeJS, y han tenido una considerable
reducción en la cantidad de equipamiento necesaria para servir a sus clientes.

Gran cantidad de paquetes
Hoy en día existen muchas tecnologías para el desarrollo de aplicaciones, y una
característica muy importante para elegir una tecnología es la cantidad de paquetes
(bibliotecas, código reutilizable) que ya se encuentra desarrollado para la tecnología que se desea utilizar. NodeJS sobresale en este aspecto, ya que cuenta con miles de paquetes que realizan desde funciones muy sencillas hasta complejas, todo al alcance del desarrollador. Ya sea que se necesite de compilar código LESS a CSS, o que se necesite realizar operaciones complejas de autenticación de usuarios, seguramente existe un paquete en NodeJS que hace lo que estamos necesitando.
