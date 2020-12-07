/* Introducción a bases de datos relacionales

Sobre las bases de datos
Las bases de datos son un área de la computación que recibió mucha atención debido a
sus múltiples aplicaciones: bibliotecas, automatización de oficinas, diccionarios
automatizados y en general cualquier programa orientado a mantener y recuperar
información.
A esta altura, uno puede preguntarse ¿Qué es lo interesante de usar una Base de Datos,
si yo la información también la puedo guardar en archivos de texto bien organizados? Lo
interesante de usar una base de datos como sistema para almacenar información en una
computadora, en vez de usar un simple archivo de texto en donde guardamos los datos
que nos interesan, es que a una base de datos se le pueden pedir datos.

Supongamos que en una Base de Datos (de ahora en más BD) tenemos un listado de
todos los teléfonos de las personas que viven en Capital Federal, y le hacemos las
siguientes preguntas:

● ¿Cuáles son los teléfonos de todas las personas de apellido Gómez?
    o Como respuesta nos va a dar los teléfonos de todos los Gómez de Capital Federal que tenga ingresados.
● Cuál es el nombre de la persona con el número de teléfono 0223-431-1343?
    o En este caso como respuesta obtendremos “vacío” ya que la característica indicada es de Mar del Plata, y esta BD sólo tiene disponible información sobre Capital Federal, por lo tanto no puede encontrar dato alguno que responda a nuestra consulta.

Estas preguntas a la BD, se realizan mediante un lenguaje llamado SQL (Structured Query Language – Lenguaje Estructurado de Consultas) y la BD nos va a responder con
datos o “vacío” si es que no encontró ningún dato que respondiera a nuestra pregunta.


Existen tres grandes tipos de Bases de Datos:
● Relacionales
● Orientadas a Objetos
● Lógicas

Si bien estos tres tipos de BD sirven para organizar la información y devolvernos
respuestas adecuadas a nuestras preguntas, el único tipo que realmente se usa en las
aplicaciones son las Bases de Datos Relacionales. La no utilización de los otros dos tipos
se debe a cuestiones avanzadas de programación porque el desarrollo de programas con
ellas es muy complicado.

Bases de Datos Relacionales
Este tipo de bases de datos consiste de varios elementos que hay que tener en cuenta:
● Tablas
    o Columnas
    o Filas
        ▪ Valores
● Campos Clave
    o Relaciones
● Esquemas
*/