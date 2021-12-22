/*Pedimos la cantidad de repeticiones 'Ciclo For' */
const cant = parseInt(prompt('Ingrese la cantidad de niveles que quiere que tenga el árbol'));

/*Creamos el bucle for por la cantidad de niveles*/
for (let i = 1; i <= cant; i++){
    console.log('x'.repeat(i))
}

/*Pedido de datos de la cantidad de repeticiones 'Ciclo While'*/
const alt = parseInt(prompt("Ingrese la cantidad de altura que quiere que tenga la bandera"))
let j = 1

/*Creación de bucle para la cantidad de niveles de la bandera*/
while(j <= alt){
    console.log('|');
    j++; 
}
console.warn('Si ve la altitud de la bandera como acumulado puede corregirlo en el boton de "configuración" --> [DESACTIVAR] "Agrupar mensajes similares en la consola" ');

alert("Mira la consola con F12 :D");