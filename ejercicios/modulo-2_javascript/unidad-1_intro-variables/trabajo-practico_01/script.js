/* Consigna: Desarrollar un programa que muestre por consola todos los meses con 31 días y todos los
meses con 30 días. */

var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var diasDelMes = [31,28,31,30,31,30,31,31,30,31,30,31];

var mesesCon30Dias = []
var mesesCon31Dias = []

for (let i = 0 ; i < meses.length; i++) {
    if (diasDelMes[i] === 30) {
        //console.log(meses[i] + " tiene " + diasDelMes[i] + " dias.");
        mesesCon30Dias.push(" " + meses[i]);
    } else if (diasDelMes[i] === 31) {
        mesesCon31Dias.push(" " + meses[i]);
    }
}
console.log("Los meses con 30 dias son:" + mesesCon30Dias)
console.log("y los meses con 31 dias son:" + mesesCon31Dias)