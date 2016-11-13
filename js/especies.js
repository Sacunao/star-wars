var template = '<div class="col s12 m4">' +
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

var nameSpecies = function (response) {
    var string = "";
    $.each(response.results, function (i, selected) {
        var idSpecie= "";
        var urlSpecies = "//swapi.co/api/people/";
        $.each(selected.people, function (i, id) {
            idSpecie+= id.replace( urlSpecies, "");
        });
        string += plantilla
                   .replace("{{especie}}", selected.name)
                   .replace("{{num}}", idSpecie.substring(0, idSpecie.length-1));
    });
    $("#species").html('<option value="" disabled selected>Elige una especie</option>'+ string);   
};
$(document).ready(function(){
    $.getJSON("https://swapi.co/api/species/", nameSpecies);

    $("#padre").on("change", "#species", function(e) {
        var url = $(this).val().split("/"); 
        $("#resultado").html("");
        for (var i = 0; i < url.length; i++) {
            $.getJSON("https://swapi.co/api/people/" + url[i] + "/", function (response) {
                var characterSpecies = template.replace("{{name}}", response.name);
                $("#resultado").append(characterSpecies);
            });
        }
    });


    /*otro modo de llenar el select
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
        });
        $("#species").append(especies);
    }
        $.getJSON("http://swapi.co/api/species/", nameSpecies);*/

});



