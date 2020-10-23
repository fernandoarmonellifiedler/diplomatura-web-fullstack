/* DOM = Document Object Model
Una página HTML normal es una sucesión de caracteres, esto lo hace muy difícil de
manipular.
Los navegadores web transforman automáticamente las páginas HTML en una estructura
más eficiente de manipular: DOM
Para que? Para poder modificar con JavaScript el HTML!!!!
DOM transforma todos los documentos en un conjunto de elementos llamados nodos.
Los nodos están interconectados y representan los contenidos de la página web y la
relación entre ellos.
Por su aspecto, la unión de todos los nodos se llama “árbol de nodos” 

Ejemplo: La transformación de cualquier etiqueta HTML genera 2 nodos:
- Primero nodo de tipo Elemento
- Segundo nodo de tipo Texto

Tipos de nodos:
La especificación completa de DOM define 12 tipos de nodos pero habitualmente se
pueden manejar solamente 4 o 5 tipos de nodos:
● Document, nodo raíz del que derivan todos
● Element, cada una de las etiquetas. Único nodo que puede contener atributos y del
que pueden derivar otros nodos.
● Attr, se define uno para cada par atributo=valor
● Text, contiene el texto encerrado por una etiqueta
● Comment, representa los comentarios incluidos en la página.
*/