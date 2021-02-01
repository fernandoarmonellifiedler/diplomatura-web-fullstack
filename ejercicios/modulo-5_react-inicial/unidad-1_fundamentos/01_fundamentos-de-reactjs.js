/* Fundamentos de ReactJS

Definición
Es una biblioteca JavaScript para construir interfaces de usuario, creada por Facebook para su plataforma, y actualmente utilizada por grandes empresas y proyectos como Instagram, New York Times, Netflix (para algunas de sus versiones), WhatsApp web, y Dropbox.

Beneficios
React es un framework muy popular el cual compite con Angular (Google) y Vue. La popularidad de React se puede ver reflejada en la cantidad de consultas que se han realizado en Stack Overflow sobre la tecnología durante los últimos años.

El ser una herramienta popular, implica que existe mayor cantidad de usuarios y por ende es utilizado en proyectos diversos permitiendo con mayor seguridad poder encontrar la respuesta a un problema que se nos presente en una implementación.
Además de la popularidad, React es un framework muy rápido, sobrepasando en los tests a Angular. Esto hace que sea una herramienta muy interesante para poder ofrecer una mejor experiencia de uso al usuario.
React se basa en HTML y JavaScript, por lo que con conocimiento de esas dos tecnologías hay mucho camino que ya tenemos recorrido en el proceso de aprendizaje en React.

--------------------------------
Fundamentos del lenguaje

Componentes
React está basado en componentes. Entendemos componentes como pequeños fragmentos visuales, que la suma de los mismos integran una aplicación.

Como ejemplo, tenemos un componente principal App, el cual tiene 2 componentes hijos (CommentForm y CommentList).
A su vez, el componente CommentList, tiene un componente hijo (Comment).
Cada componente se encarga de como se mostrará un pequeño fragmento de la página.
● El componente Comment se encarga de como se verá un único comentario.
● El componente CommentList se encarga de como se mostrará la lista de comentarios, y delega la visualización de cada comentario al componente Comment.
● El componente CommentForm se encarga de ofrecer al usuario un formulario de ingreso de comentarios.

En el caso de un post en Instagram, por ejemplo, Aquí podemos identificar algunos posibles componentes:
● La tarjeta (card) que contiene toda la información
● La imágen principal
● Botones (me gusta, comentar, compartir)
● Comentarios
○ Un comentario
● Input (campo de texto) para agregar un comentario
*/