/* Definición de base de datos, tablas, campos, índices
y claves foráneas

Tablas
Las bases relacionales se componen de relaciones, más comúnmente llamadas tablas.
Una tabla es lo que su nombre indica, un cuadro de doble entrada en el cual se relacionan
datos. Es bastante parecido a cuando uno guarda información en una planilla de cálculo:
allí también lo hace en tablas compuestas por Columnas y Filas.
Veamos la siguiente tabla, que muestra el ranking mundial de Tenis (seguramente está
desactualizada)

Ranking

puesto | nombre | apellido | edad | nacionalidad
   1     Roger    Federer    25     Suizo
   2     Rafael   Nadal      20     Español
   3     Nicolay  Davydenko  25     Ucraniano
   4     James    Blake      26     Estadounidense
   5     Ivan     Ljubicic   27     Ucraniano
   6     Andy     Roddick    24     Estadounidense
   7     Tommy    Robredo    24     Español
   8     David    Nalbandian 24     Argentino
   9     Mario    Ancic      22     Croata
   10    Fernando González   26     Chileno

La tabla tiene un nombre (Ranking), columnas que contienen distintos tipos de datos, y
filas, que corresponden una a cada tenista ingresado.

Columnas
Cada columna dentro de una tabla tiene un nombre único y almacenan diferente
información cada una.
En nuestra tabla Ranking, no serviría de mucho tener dos columnas llamadas “apellido”, a
no ser que las usemos para almacenar el primer y segundo apellido de los tenistas. Pero
en ese caso, deberíamos llamarlas con un nombre acorde a lo que contienen: “primer
apellido” y “segundo apellido”.
Además, cada Columna (también denominadas Campo) tiene asociado un Tipo de Dato.
Es lo mismo que las variables, si vamos a almacenar texto en un campo, tiene que ser un
campo de tipo texto. En cambio, si queremos almacenar un número, tendremos que usar
un campo de tipo numérico.

Filas
Cada fila en la tabla Ranking representa a un tenista diferente. Como las filas dependen
de una tabla, todas van a tener la misma estructura, pero contenidos diferentes entre sí.
Otra vez, no tiene ningún sentido tener dos filas de Federer en nuestra tabla porque
tendrían exactamente los mismos datos.
A las filas se las suele llamar Registros.

Valores
Cada fila consiste de un grupo de valores, los cuales corresponden a cada una de las
columnas. Como cada uno corresponde a una columna, su tipo de dato es el indicado por
la columna en cuestión.

Claves
Como dijimos antes, cada registro (o fila) tiene que tener información diferente, porque
dos registros iguales serían generar datos de más en la BD. Ahora bien, tenemos que
tener una manera de seleccionar solamente a un registro específico.
Veamos esto con la siguiente tabla:

(ejemplo de una tabla)

Si alguien nos preguntara si tenemos el teléfono del cliente Pablo Martínez, porque
ocurrió un problema en la entrega de un producto en su domicilio y hay que contactarse
con él, le preguntaríamos a la base de datos:
- ¿Cuál es el teléfono del cliente con nombre Pablo y apellido Martínez?

La respuesta sería una tabla con los siguientes datos:

(ejemplo de una tabla)

La respuesta que nos devolvió la BD es totalmente válida, los dos registros cumplen con la condición de que le pedimos: el cliente Pablo Martínez. Si se fijan, en la tabla hay dos Pablo Martínez: Uno en la primera y otro en la sexta fila.

Para arreglar esto, tendríamos que preguntar cuál es la dirección del Pablo Martínez del que se necesita el teléfono y volver a generar la consulta, especificando un poco más:
- ¿Cuál es el teléfono del cliente con nombre Pablo, apellido Martínez y dirección
Rivadavia 2564?
Ahora la respuesta sería una tabla con los siguientes datos:

(ejemplo de una tabla)

Bien, logramos conseguir sólo el dato que nos hacía falta, pero tuvimos que usar muchas condiciones para lograr que la BD nos devolviera un registro único.

Es para evitar este tipo de situaciones que se usan los capos Clave: son campos
(columnas) cuyo contenido va a ser único a lo largo de toda la tabla.
A fin de evitar que los valores que se vayan a almacenar en este tipo de campo se
dupliquen, por lo general se usan campos numéricos que la base de datos maneja
cuidándose siempre de asignar un número no usado anteriormente. Un claro ejemplo de
esto en la vida real es el DNI, el número de la tarjeta de crédito, las cuentas bancarias,
etc.

¿Cómo aplicamos esto a nuestra tabla de clientes? Lo que podemos hacer es agregar un
campo clave denominado “nro_cliente” que represente un Número Único de Cliente, el
cual utilizaremos para referirnos unívocamente a cada uno de ellos. Entonces la tabla
quedaría así:

(ejemplo de una tabla con una columna con numeros para cada cliente)

Veamos la siguiente tabla de Órdenes de Compra:

(ejemplo de una tabla)

Si analizamos la estructura de esta tabla, nos encontramos con dos campos clave:
nro_pedido y nro_cliente. Con “nro_pedido” lo que logramos es identificar unívocamente al pedido realizado, y con “nro_cliente”, podemos ubicar al cliente que realizó la compra.
Si queremos saber quién compró “50 Resmas A4”, sólo hace falta ver el Número de
Cliente que está en la columna “nro_cliente” y luego ir a la tabla Clientes para ver a quien le corresponde ese número, que en este caso es “Silvia Lanzillotta”.


Claves Primarias y Claves Foráneas

Dentro de los campos clave, podemos diferenciar dos tipos:
● Primarias
    o Son campos clave que identifican unívocamente registros que están dentro
de la tabla.
● Foráneas
    o Son campos clave que permiten referenciar unívocamente a un registro que
está dentro de otra tabla.

En el caso de la tabla “Ordenes”:
● nro_pedido es una Clave Primaria: En este caso, el campo clave identifica a cada orden de compra, por lo tanto es
para registros que están dentro de la tabla.

● nro_cliente es una Clave Foránea: En cambio, este campo se usa para saber qué cliente es el que realizó la orden de compra, es decir, nos sirve para identificar sin lugar a dudas el cliente de entre todos los de la tabla “Clientes”.

Algo interesante para aclarar es que no tiene por qué haber sólo una
clave primaria o foránea.

Esquemas
El conjunto de todos los diseños de las tablas de una BD se llama Esquema. Vendría a
ser algo así como un plano de la Base. En el Esquema de la BD se muestran todas las
tablas, junto con sus campos y claves primarias y/o foráneas.
Los esquemas pueden mostrarse mediante diagramas informales (como los que usamos
arriba para indicar la relación entre Ordenes y Clientes), Diagramas de Entidad-Relación, o mediante texto:

Clientes (nro_cliente, nombre, apellido, dirección, teléfono)
Órdenes (nro_pedido, nro_cliente, descripción, importe)

Con subrayado se indica la clave primaria y en cursiva la clave foránea.*/