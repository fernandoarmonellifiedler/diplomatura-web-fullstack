/* Introducción a JSON

Es un formato de datos basado en texto que sigue la sintaxis de objeto de JavaScript,
popularizado por Douglas Crockford. Aunque es muy parecido a la sintaxis de objeto
literal de JavaScript, puede ser utilizado independientemente de JavaScript, y muchos
ambientes de programación poseen la capacidad de leer (analizar y procesar) y generar
JSON.
Los JSON son cadenas - útiles cuando se quiere transmitir datos a través de una red.
Debe ser convertido a un objeto nativo de JavaScript cuando se requiera acceder a sus
datos. Ésto no es un problema, dado que JavaScript posee un objeto global JSON que
tiene los métodos disponibles para convertir entre ellos.
JSON es una cadena cuyo formato recuerda al de los objetos literales JavaScript. Es
posible incluir los mismos tipos de datos básicos dentro de un JSON que en un objeto
estándar de JavaScript - cadenas, números, vectores, booleanos, y otros literales de
objeto.

Ejemplo de JSON
Analicemos un documento JSON de MercadoLibre */

const MercadoLibre = {
    "id": "ITEM_CONDITION",
    "name": "Condición del ítem",
    "tags": {
        "hidden": true
    },
    "hierarchy": "ITEM",
    "relevance": 2,
    "value_type": "list",
    "values": [
        {
            "id": "2230284",
            "name": "Nuevo"
        },
        {
            "id": "2230581",
            "name": "Usado"
        },
        {
            "id": "2230582",
            "name": "Reacondicionado"
        }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
}

/* En este documento se pueden apreciar un objeto el cual contiene varias propiedades. Los tipos de propiedades incluyen casi todos los tipos de datos disponibles:

● Cadena (String)
● Entero (Integer)
● Booleano
● Objeto
● Vector

Veamos algunos ejemplos de los tipos de datos indicados

Tipo de dato | Propiedad
String         name, hierarchy, value_type, id, etc
Entero         relevance
Booleano       hidden
Objeto         {"hidden": true }
               { "id": "2230284","name": "Nuevo"}
Vector         [
               {"id": "2230284","name": "Nuevo"},
               {"id": "2230581","name": "Usado"},
               {"id": "2230582","name": "Reacondicionado"}
               ]

*/