/* Redefinición de métodos básicos

constructor()
Solo creamos un constructor si
    ● Deseamos inicializar el estado del componente (usando this.state = {};)
    ● Deseamos enlazar (bind) los métodos que se llaman desde eventos al componente (para utilizar this)


render()
El método render() es obligatorio en los componentes
Consideraciones:
    ● NO se debe modificar el estado
    ● Devuelve siempre el mismo resultado cada vez que se lo invoca
    ● No interactúa directamente con el navegador
    ● Retorna JSX
    ● Puede hacer uso de this.props y this.state


componentDidMount()
Este método es utilizado para obtener registros de un servidor remoto o necesitemos inicializar alguna propiedad usando como referencia el espacio que ocupa el componente o algún elemento visual.

En caso de realizar un cambio en el estado, debemos llamar a this.setState();. Esto provocará que se ejecute el método render nuevamente.


componentDidUpdate()
Este método es llamado cuando se produjo una actualización del estado (no es llamado la primera vez, en el montaje)

Puede ser utilizado para hacer peticiones de red adicionales (Ej: si se seleccionó un nuevo cliente, las direcciones del nuevo cliente)

En caso de realizar una petición y actualización del estado, es importante incluir una condición (para no crear un bucle infinito)

componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
    }
}


componentWillUnmount
Es el método llamado antes de destruir el componente

En caso que hayamos realizado alguna suscripción o abierto una conexión persistente, aquí debemos cancelar todos los procesos que hayamos abierto*/