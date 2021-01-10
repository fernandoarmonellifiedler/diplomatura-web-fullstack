/* Views

La capa de presentación (vista) “conoce” al modelo que va a mostrar, pero el modelo no
“conoce” a la vista. La vista es invocada por el controlador con los datos que obtuvo del
modelo.

En cuanto a la vista, es menester aclarar que puede tratarse tanto de mensajes JSON por
ejemplo, o bien templates creados con un motor como Handlebars, etc. La vista es la información
a responder al cliente que la ha solicitado. La forma que tome dicha información depende de cada
proyecto.

Las vistas son las representaciones de la información que el sistema responde a sus
clientes. Están íntimamente relacionadas con los modelos aunque no necesariamente
haya una vista por cada modelo, en realidad, habrá tantas vistas como respuestas de
información se requiera.

Las vistas pueden ser desde JSONs hasta motores de templates. Depende del proyecto
la forma que tomarán las vistas. Por ejemplo, en un proyecto con cliente ReactJs, las
vistas serán JSONs.

Las vistas pueden contener datos de más de un modelo, por ejemplo, si se requiere
responder con la información de una factura, la vista contendrá tanto la información del
encabezado de la factura (de un modelo) como los diferentes ítems de la factura (alojados
en otro modelo)
*/