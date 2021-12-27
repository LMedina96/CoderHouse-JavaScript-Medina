let idMonto = document.getElementById("idMonto")
let idIva = document.getElementById("idIva")
let idTotal = document.getElementById("idTotal")

calcularMonto = () => {
    idIva.value = "";
    idTotal.value = "";
    var monto = parseFloat(prompt("Ingresar monto del producto"));
    idMonto.value = monto;
}

calcularIva = () => {
    var totalIva = parseFloat(idMonto.value * 0.21);
    idIva.value = totalIva
}

calcularTotal = () => {
    idTotal.value = parseFloat(idMonto.value) + parseFloat(idIva.value);
}