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

ordenarObjeto = () => {
    informe.sort(function compareNumbers(a, b) {
        return b.monto - a.monto;
      }); 
      console.info("Ordenando precios de mayor a menor...")
      console.table(informe);
}

$("#buttonTotal").click(() => {
    idTotal.value = 
    parseFloat(idMontoTotal.value) + parseFloat(idIvaTotal.value);

    informe[aux] = new Informe(aux, idArticulo.value, idCantidad.value, idMonto.value, idMontoTotal.value, idIvaTotal.value, idTotal.value);
    console.table(informe);

    let nuevoRegistro = document.createElement("li")
    nuevoRegistro.innerHTML = 
    `Articulo: ${idArticulo.value}</br>
    Cantidad: ${idCantidad.value}</br>
    Total: ${idTotal.value}`

    document.getElementById("historial").appendChild(nuevoRegistro);

    aux += 1;

    console.log("Registro añadido con jQuery correctamente")
})

$("#historial").hover(() => {
    let historial = document.getElementById("historial");
    historial.style.boxShadow = "10px 10px 12px 0px rgba(0,0,0,0.75)"
    
},
() =>{
    historial.style.boxShadow = "0 0 0 0"
})

$("input").focus(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "10px 10px 12px 0px rgba(0,0,0,0.75)";
})

$("input").blur(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "0 0 0 0";
})