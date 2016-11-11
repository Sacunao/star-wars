var template = '<div class="col s12 m6">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content amber white-text">' +
                            '<p>Hi, my name is <strong>{{name}}</strong></p>' +
                        '</div>' +
                        '<div class="card-action">' +
                            '<a data-show-url="{{url}}" class="about">Detalle personaje</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'; 

var plantilla = '<option value="{{num}}">{{especie}}</option>';

$(document).ready(function(){
    var formatResponse = function(response){          
        var personajes  = "";
        $.each(response.results, function(i, personaje){
            personajes += template
                          .replace("{{name}}", personaje.name)
                          .replace("{{url}}", personaje.url);
        });
        $("#people").html(personajes);
    };

    var nameSpecies = function(response){        
        var especies  = "";
        $.each(response.results, function(i, especie){
            var string = "";
            for(var i = 0, l = especie.people.length; i < l; i++){
                string += especie.people[i].substr(-3);
            }
            
            especies += plantilla
                        .replace("{{num}}", string)
                        .replace("{{especie}}", especie.name);

            var mostrarPersonajes = function(response){
                for(var i = 0, l = response.length; i < l; i++){
                    $.getJSON(url + string, formatResponse);
                }
             }

             var url = "http://swapi.co/api/people/";

             $("#padre").on("change", ("#species"), mostrarPersonajes);
        });
        $("#species").append(especies);
    }
    
    $.getJSON("http://swapi.co/api/species/", nameSpecies);

});



