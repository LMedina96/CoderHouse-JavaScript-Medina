let idMonto = document.getElementById("idMonto");
let idMontoTotal = document.getElementById("idMontoTotal");
let idIvaTotal = document.getElementById("idIva");
let idTotal = document.getElementById("idTotal");
let idArticulo = document.getElementById("idArticulo");
let idCantidad = document.getElementById("idCantidad");

let informe = [];
let informeJson;
let aux = 0;

let pokemonCaptchaNombre;

getRandomArbitrary = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}

//Registro y guardado de datos en LocalStorage
$("#btnRegistro").click(() =>{
    $("#formularioRegistro").delay(500).slideDown(500);
    $("#menuRegistro").slideUp(500);
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

        $("#menuRegistro").delay(500).slideDown(500);
        $("#formularioRegistro").slideUp(500);
        $("#mensajeRegistroExitoso").delay(500).slideDown(500); 

        document.getElementById("idUsuario").value = "";
        document.getElementById("idContrasenia").value = "";
        document.getElementById("idConfirmarContrasenia").value = "";
    }
})

//Inicio de sessión chequeando la el usuario guardado en LocalStorage
$("#btnLogueo").click(() => {

    $("#login").delay(500).slideDown(500);
    $("#menuRegistro").slideUp(500);
    $("#errorInicioSessionIncorrecto").slideUp(500);

    let getPokemon = getRandomArbitrary(1, 150); 

    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${getPokemon}`, function(response, status){
        if(status == "success"){
            console.log(status)
            console.log(response)

            $("#imagenCaptcha").html(`
            <h2>Captcha</h2>
            <h4 class="pepito">"${response.name}"</h4>
            <img src='${response.sprites.front_default}' />
            `)
        }

        pokemonCaptchaNombre = response.name;
    })
})

$("#btnIniciarSession").click(() => {
    
    let usuarioLogin = document.getElementById("idUsuarioLogueo").value
    let passwordLogin = document.getElementById("idContraseniaLogueo").value
    
    pokemon = document.getElementById("inputCaptcha").value;
    pokemon = pokemon.toLowerCase() 

    if(usuarioLogin == localStorage.getItem("usuario") && passwordLogin == localStorage.getItem("password") && pokemon == pokemonCaptchaNombre){
        document.getElementById("bienvenida").innerHTML = `<h2> Bienvenido ${usuarioLogin} </h2>`;
        $("#login").slideUp(500);
    }else{
        $("#errorInicioSessionIncorrecto").slideDown(500);
    }

})

//Boton btnCancelar
$(".btnCancelar").click (() => {
    $("#menuRegistro").delay(500).slideDown(500);
    $("#formularioRegistro").slideUp(500);
    $("#login").slideUp(500);
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
$("#ButtonGenerarTicket").click(() => {
    if (idArticulo.value == "" || idCantidad.value == "" || idMonto == ""){
        alert("Por favor completa todos los campos necesarios");
    }else{
        calcularMonto();
        calcularIva();
        idTotal.value = 
        parseFloat(idMontoTotal.value) + parseFloat(idIvaTotal.value);
        document.getElementById("btnGenerarTicket").style = "border: 1px solid black";
    }
})

//Función para calcular el monto total
$("#buttonTotal").click(() => {

    if (idMontoTotal.value == ""){
        alert("Por favor genere el ticket primero");
        document.getElementById("ButtonGenerarTicket").style = "border: 1px solid red";
    }else{
        informe[aux] = new Informe(aux, idArticulo.value, idCantidad.value, idMonto.value, idMontoTotal.value, idIvaTotal.value, idTotal.value);
        console.table(informe);
    
        informeJson = JSON.stringify(informe);

        //Añadir registro al DOM usando jQuery con un slideDown}
        $(`
        <li class='liArticulo'>
            Articulo: ${idArticulo.value}</br>
            Cantidad: ${idCantidad.value}</br>
            Total: ${idTotal.value}
        </li>
        `).hide().appendTo(historial).slideDown('slow')

    
        aux += 1;
    
        idArticulo.value = "";
        idCantidad.value = "";
        idIvaTotal.value = "";
        idTotal.value = "";
        idMontoTotal.value = "";
        idMonto.value = "";
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


  let pokeApi = "https://pokeapi.co/api/v2/pokemon/";

  class Pokemon {
      constructor(nombre, numero, img){
          this.nombre = nombre;
          this.numero = numero;
          this.img = img;
      }
  }
  
  $("#buscador").click(() => {
  
      pokemon = document.getElementById("buscadorPokemon").value;
      pokemon = pokemon.toLowerCase()
  
      $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, function(response, status){
          if(status == "success"){
              console.log(status)
              console.log(response)
  
              $("#imagenCaptcha").html(`
              <h3>${response.name}</h3>
              <img src='${response.sprites.front_default}' />
              `)
  
          }
      })

  })