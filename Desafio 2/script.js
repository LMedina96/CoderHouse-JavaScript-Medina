alert("¡Verificaremos si los datos ingresados son iguales!")

/*Pedido de datos al usuario*/
let req1 = parseFloat(prompt('Ingrese un numero'))
let req2 = parseFloat(prompt('Ingrese otro numero'))

/*Logica de comparación*/
if (req1 == req2){
    alert('Los numeros ingresados son correctos')
}else{
    alert('Los numeros ingresados no coinciden')
}