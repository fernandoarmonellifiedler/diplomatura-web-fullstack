var vector = [22,25,60,98,11,78,4,33,85,10]

var mayor, posicionMayor;
var menor, posicionMenor;

mayor = vector[0];
posicionMayor = 0;

menor = vector[0];
posicionMenor = 0;

for (let i = 0 ; i < 10 ; i++) {
    if (mayor < vector[i]) {
        mayor = vector[i];
        posicionMayor = i;
    }

    if (menor > vector[i]) {
        menor = vector[i];
        posicionMenor = i;
    }
}

console.log("El mayor es " + mayor + " y se encuentra en la posición " + posicionMayor);
console.log("El menor es " + menor + " y se encuentra en la posición " + posicionMenor);