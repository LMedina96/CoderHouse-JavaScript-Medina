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
registrarse = () => {
    let usuario = prompt ("Ingrese su nombre de usuario");
    let password = prompt ("Ingrese su contraseña");
    let confirmPassword = prompt ("Por favor reingrese su contraseña");

    while (password !== confirmPassword){
        alert ("¡Las contraseñas no coinciden!")
        confirmPassword = prompt ("Por favor reingrese su contraseña");
    }

    if (usuario != "" && password != "" && confirmPassword != ""){
        localStorage.setItem("usuario", usuario)
        localStorage.setItem("password", password)
    }else{
        alert("Hay campos vacios, por favor vuelva a iniciar el proceso")
    }
}

//Inicio de sessión chequeando la el usuario guardado en LocalStorage
iniciarSession = () => {
    usuario = prompt ("Ingrese su nombre de usuario");
    password = prompt ("Ingrese su contraseña");

    if (usuario == localStorage.getItem("usuario") && password == localStorage.getItem("password")){
        document.getElementById("bienvenida").innerHTML = `<h2> Bienvenido ${usuario} </h2>`;
        document.getElementById("navBar").style = "display: none";
    }else{
        alert("Los datos no coinciden con la cuenta creada anteriormente")
    }
}

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

        let nuevoRegistro = document.createElement("li")
        nuevoRegistro.innerHTML = 
        `Articulo: ${idArticulo.value}</br>
        Cantidad: ${idCantidad.value}</br>
        Total: ${idTotal.value}`
    
        document.getElementById("historial").appendChild(nuevoRegistro);
    
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

$("input").focus(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "2px 2px 34px -5px rgba(0,0,0,1)";
    caja.style.transition = "all 1s";
})

$("input").blur(() => {
    let caja = document.getElementById("calculator");
    caja.style.boxShadow = "0 0 0 0";
    caja.style.transition = "all 1s";
})

//Función para ordenar el objeto según el monto total en la consola
ordenarObjeto = () => {
    informe.sort(function compareNumbers(a, b) {
        return b.montoTotal - a.montoTotal;
    }); 
    console.info("Ordenando precios de mayor a menor...")
    console.table(informe);
}

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