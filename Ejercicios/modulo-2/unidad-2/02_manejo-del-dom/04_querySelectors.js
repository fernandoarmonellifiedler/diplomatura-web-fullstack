/* QuerySelector:
- Permite recorrer el documento de una forma más fácil que las opciones anteriores, pudiendo utilizar los selectores CSS.

document.querySelector(‘<selector CSS>’); Retorna solo la primer ocurrencia: */

document.querySelector('.menu');
document.querySelector('#id-principal .clase-secundaria');

//document.querySelectorAll: Retorna todas las ocurrencias.*/

document.querySelectorAll('<selector CSS>'); 