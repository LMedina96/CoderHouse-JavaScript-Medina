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

            $("#infoContainer").html(`
            <section id="info">
            <h3>${response.name}</h3>
            <img src='${response.sprites.front_default}' />
            <ul>
            <li>ID: ${response.id}</li>
            <li>Tipo: ${response.types[0].type.name}</li>
            <li>Peso: ${(response.weight) * 0.45 } Kilogramos </li>
            <li>Altura: ${((response.height) * 0.30).toFixed(2)} Metros </li>
            </ul>
            </section>
            `)

        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {

        if (jqXHR.status == 404) {
          alert('No se encontro el pokemon en la base de datos');
        }})
})
