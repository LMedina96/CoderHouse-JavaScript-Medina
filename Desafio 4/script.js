let fed = document.getElementById("feedback");

const calcCuotas = (valor) => {

    fed.innerHTML = "<ul> <li> El valor a 1 cuota es: $" + valor + "</li>" + 

    "<li> El valor a 3 cuotas es de: $" + (valor * 1.10).toFixed(2) +
    "</br> Valor de cada cuota: $" + ((valor * 1.10) / 3).toFixed(2) + "</li>" +

    "<li> El valor a 6 cuotas es de: $" + valor * 1.25 + "</br>Valor de cada cuota: $" + ((valor * 1.25) / 6).toFixed(2) + "</li>" + 

    "<li>El valor a 12 cuotas es de: $" + valor * 1.60 + "</br>Valor de cada cuota: $" + ((valor * 1.60) / 12).toFixed(2) + "</li></ul>";
}