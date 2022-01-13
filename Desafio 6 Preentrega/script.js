let idMonto = document.getElementById("idMonto");
let idMontoTotal = document.getElementById("idMontoTotal");
let idIvaTotal = document.getElementById("idIva");
let idTotal = document.getElementById("idTotal");
let idArticulo = document.getElementById("idArticulo");
let idCantidad = document.getElementById("idCantidad");
let informe = [];
let aux = 0;

class Informe{
    constructor(id, articulo, cantidad ,monto,montoTotal, ivaTotal, total){
        this.id = id;
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.monto = monto;
        this.montoTotal = montoTotal;
        this.ivaTotal = ivaTotal;
        this.total = total;
    }
}

calcularMonto = () => {
    idIvaTotal.value = "";
    idTotal.value = "";
    idMontoTotal.value = "";
    var monto = parseFloat(prompt("Ingresar monto del producto"));
    idMonto.value = monto;
    idMontoTotal.value = monto * idCantidad.value;
}

calcularIva = () => {
    var totalIva = parseFloat((idMonto.value * 0.21) * idCantidad.value);
    idIvaTotal.value = totalIva
}

calcularTotal = () => {
    idTotal.value = (parseFloat(idMonto.value) + parseFloat(idIvaTotal.value) * idCantidad.value);

    informe[aux] = new Informe(aux, idArticulo.value, idCantidad.value, idMonto.value, idMontoTotal.value, idIvaTotal.value, idTotal.value);
    console.table(informe);

    aux += 1;
}

ordenarObjeto = () => {
    informe.sort(function compareNumbers(a, b) {
        return b.monto - a.monto;
      }); 
      console.info("Ordenando precios de mayor a menor...")
      console.table(informe);
}