let idMonto = document.getElementById("idMonto");
let idMontoTotal = document.getElementById("idMontoTotal");
let idIvaTotal = document.getElementById("idIva");
let idTotal = document.getElementById("idTotal");
let idArticulo = document.getElementById("idArticulo");
let idCantidad = document.getElementById("idCantidad");

let informe = [];
let informeJson;
let aux = 0;

//Registro y guardado de datos en LocalStorage
$("#btnRegistro").click(() =>{
    $("#formularioRegistro").show();
    $("#menuRegistro").hide();
})

$("#btnRegistrarse").click (() => {

    let usuarioValue = document.getElementById("idUsuario").value;
    let contraseniaValue = document.getElementById("idContrasenia").value;
    let confirmarContraseniaValue = document.getElementById("idConfirmarContrasenia").value;

    if (usuarioValue == "" || contraseniaValue == "" || confirmarContraseniaValue == ""){
        document.getElementById("errorCamposVacios").style = "display: block";
        document.getElementById("errorContraseniasDesiguales").style = "display: none";
    }else if (contraseniaValue != confirmarContraseniaValue){
        document.getElementById("errorCamposVacios").style = "display: none";
        document.getElementById("errorContraseniasDesiguales").style = "display: block";
    }else{
        localStorage.setItem("usuario", usuarioValue)
        localStorage.setItem("password", contraseniaValue)

        $("#menuRegistro").show();
        $("#formularioRegistro").hide();
        $("#mensajeRegistroExitoso").show(); 

        document.getElementById("idUsuario").value = "";
        document.getElementById("idContrasenia").value = "";
        document.getElementById("idConfirmarContrasenia").value = "";
    }
})

//Inicio de sessión chequeando la el usuario guardado en LocalStorage
$("#btnLogueo").click(() => {

    $("#login").show();
    $("#menuRegistro").hide();
    $("#errorInicioSessionIncorrecto").hide();
})

$("#btnIniciarSession").click(() => {
    let usuarioLogin = document.getElementById("idUsuarioLogueo").value
    let passwordLogin = document.getElementById("idContraseniaLogueo").value

    if(usuarioLogin == localStorage.getItem("usuario") && passwordLogin == localStorage.getItem("password")){
        document.getElementById("bienvenida").innerHTML = `<h2> Bienvenido ${usuarioLogin} </h2>`;
        $("#login").hide();
    }else{
        $("#errorInicioSessionIncorrecto").show();
    }

})

//Creación del objeto informe
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

//Funcion para ingresar monto del producto
calcularMonto = () => {
    idMontoTotal.value = idMonto.value * idCantidad.value;
}

//Función para calcular IVA con el valor del monto y la cantidad del producto
calcularIva = () => {
    var totalIva = parseFloat((idMonto.value * 0.21) * idCantidad.value);
    idIvaTotal.value = totalIva
}

//Generación del ticket en el DOM
generarTicket = () => {
    if (idArticulo.value == "" || idCantidad.value == "" || idMonto == ""){
        alert("Por favor completa todos los campos necesarios");
        document.getElementById("datosACompletar").style = "border: 1px solid red";
    }else{
        calcularMonto();
        calcularIva();
        idTotal.value = 
        parseFloat(idMontoTotal.value) + parseFloat(idIvaTotal.value);
        document.getElementById("datosACompletar").style = "border: 1px solid black";
        document.getElementById("btnGenerarTicket").style = "border: 1px solid black";
    }
}

//Función para calcular el monto total
$("#buttonTotal").click(() => {

    if (idMontoTotal.value == ""){
        alert("Por favor genere el ticket primero");
        document.getElementById("btnGenerarTicket").style = "border: 1px solid red";
    }else{
        informe[aux] = new Informe(aux, idArticulo.value, idCantidad.value, idMonto.value, idMontoTotal.value, idIvaTotal.value, idTotal.value);
        console.table(informe);
    
        informeJson = JSON.stringify(informe);

        //Añadir registro al DOM usando jQuery
        $("#historial").append(
            `
            <li>
                Articulo: ${idArticulo.value}</br>
                Cantidad: ${idCantidad.value}</br>
                Total: ${idTotal.value}
            </li>
            `
        )
    
        aux += 1;
    
        idArticulo.value = "";
        idCantidad.value = "";
        idIvaTotal.value = "";
        idTotal.value = "";
        idMontoTotal.value = "";
        idMonto.value = "";

        document.getElementById("btnGenerarTicket").style = "border: 1px solid black";
    }
})

//Efectos aplicados con jQuery
$("#historial").hover(() => {
    let historial = document.getElementById("historial");
    historial.style.boxShadow = "5px 5px 6px 0px rgba(0,0,0,0.75)";
    historial.style.transition = "all 1s";
    
},
() =>{
    historial.style.boxShadow = "0 0 0 0"
})

$("#body input").focus(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "2px 2px 34px -5px rgba(0,0,0,1)";
    caja.style.transition = "all 1s";
})

$("#body input").blur(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "0 0 0 0";
    caja.style.transition = "all 1s";
})


//Exportar en Json la información del registro
function export2txt() {  
    if(informe != ""){
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(informe, null, 2)], {
          type: "text/plain"
        }));
        a.setAttribute("download", "InformeJson.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }else{
        alert("No se puede descargar un informe vacio");
    }
  }