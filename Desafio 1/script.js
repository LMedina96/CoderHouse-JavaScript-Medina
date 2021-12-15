/*Pedido de datos*/
let nombre = prompt("¿Cual es su nombre?")
let apellido = prompt ("¿Cual es su apellido?")

/*Definicion de variables constantes*/
const bienvenida = "Bienvenido "
const clase = " a la clase de JavaScript"
const comision = " comision 28120"

/*Muestra de mensajes por alert y console.log*/
console.log(bienvenida + nombre + " " + apellido + clase + comision)
alert(bienvenida + nombre + " " + apellido + clase + comision)

/*Pedido de edad*/
let edad = parseInt(prompt("¿Cuantos años tienes?"))
let calculo = edad + 28

/*Muestra la edad en el 2050*/
console.log("En el 2050 tendrás " + calculo + " años de edad")
alert("En el 2050 tendrás " + calculo + " años de edad")