/* AVS M5 U2

Hooks:
- Permite trabajar react bajo el paradigma funcional
- se pueden trabajar estados dentro de funciones

Sobre componentes:
- Usa src/component
- para cada componente 3 archivos
- para ubicar en la pantalla usa el figma
- mvc es otra forma de organizar. no se usaria aqui. puede llegar a tener un service para la logica de conexion pero en general no

src
    components
        contactForm
            contactForm.css
            contactForm.jsx
            index.js (para exportar el contenido de la carpeta)
    utilities
        customButton
            customButton.css
            customButton.jsx
            index.js

Clases:
- se van a  utilizar clases cuando dentro de tus componentes necesites trabajar variables globales (estados)
- el metodo render devuelve algo (como return en una funcion)
- el ciclo de vida de un componente.

----------------------------
porque usar funcion o clase en react?
- dependiendo de la necesidad de usar variables globales o estados
- en una funcion, como el return ya es llamado, si cambia alguna variable o dato no será actualizado en la pantalla (estados)

*/