let idMonto = document.getElementById("idMonto");
let idIva = document.getElementById("idIva");
let idTotal = document.getElementById("idTotal");
let informe = [];
let informeTotal = [];
let aux = 0;

class Informe{
    constructor(monto, iva, total){
        this.monto = monto;
        this.iva = iva;
        this.total = total;
    }
}

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

    informe[aux] = new Informe(idMonto.value, idIva.value, idTotal.value);
    console.log(informe);

    informeTotal.push(idTotal.value);
    informeTotal.sort();
    console.log('Valores totales ordenados: ', informeTotal);

    aux += 1;
}