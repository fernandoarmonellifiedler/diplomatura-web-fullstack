/* Introducción al ciclo de vida de los componentes

Los componentes en React tienen un ciclo de vida, una creación, los procesos de render y por último una destrucción. A continuación abordaremos el ciclo de vida de cada componente.

                  Montaje     Actualización     Desmontaje
                     ↓                               |
"Fase Render"   constructor     New props            |
                     |          setState()           |
                     |          forceUpdate()        |
                     ↓              ↓                |
                -------------------------------      |
                            render                   |
                -------------------------------      |
                     ↓              ↓                |
-------------   -------------------------------------|------
"Fase Commit"   React actualiza el DOM y referencias |
                     ↓              ↓                ↓
             componentDidMount componentDidUpdate componentDidUnmount


"Fase Render": Pura y sin efectos colaterales, puede ser pausada, abortada o reiniciada por React.
"Fase Commit": Puede operar sobre el DOM, ejecutar side-effects, agendar actualizaciones


Montaje
El montaje es el proceso por el cual el componente que creamos se incorpora en nuestra página web (DOM - Document Object Model). El proceso de montaje sigue los siguientes pasos.

1. Se llama al constructor del componente
    ○ Inicializamos el estado (si es necesario)
    ○ Realizamos los enlaces bind de los métodos que son llamados desde eventos (si es necesario)
2. Se llama al método render
    ○ No debemos actualizar el estado
    ○ Retornamos código JSX
    ○ Podemos utilizar this.props y this.state
3. Se llama al método componentDidMount (si existe) ○ Solicitamos registros a un servidor remoto

Actualización
Existen determinados eventos que provocan que un componente se vuelva a dibujar (llamar al método render). Los mismos son:
● Cambio de estado por medio de setState()
● Cambio de una propiedad de this.props
● Forzado de actualización por medio de forceUpdate()

Los pasos de la actualización de un componente son
1. Cambio del estado (setState), cambio de una o varias propiedades this.props, llamado a forceUpdate()
2. Se ejecuta el método render
3. Se ejecuta el método componentDidUpdate
    ○ Se pueden realizar peticiones adicionales
    ○ Si cambiamos el estado, provocará una nueva llamada a render y posterior llamada a componentDidUpdate, por lo que debemos verificar que no se realice un bucle infinito de llamadas (si ya fue actualizado, no debemos actualizarlo nuevamente)

Desmontaje
Cuando el componente deja de ser visualizado, el mismo es desmontado (se elimina del DOM), esto provoca la llamada a un único método particular componentWillUnmount.

En el método componentDidUnmount debemos liberar aquellos recursos que hayamos asignado explícitamente o suscrito.
*/