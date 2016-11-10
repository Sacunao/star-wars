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

$(document).ready(function(){
    var formatResponse = function(response){          
        $("#total").text(response.results.length);
        var personajes  = "";
        $.each(response.results, function(i, personaje){
            personajes += template
                          .replace("{{name}}", personaje.name)
                          .replace("{{url}}", personaje.url);
        });
        $("#people").html(personajes);
        $("#next").attr("data-url", response.next);
        $("#previous").attr("data-url", response.previous);
        if(!response.next){
            $("#next").fadeOut();
        } else {
            $("#next").fadeIn()
        }

        if(!response.previous){
            $("#previous").fadeOut();
        } else {
            $("#previous").fadeIn();
        }
    };

    $.getJSON("http://swapi.co/api/people/", formatResponse);

    $("#next").click(function(event){
        event.preventDefault();
        var url = $(this).attr("data-url");  
        $.getJSON(url, formatResponse);  
    });

    $("#previous").click(function(event){
        event.preventDefault();
        var url = $(this).attr("data-url");  
        $.getJSON(url, formatResponse);  
    });

    $("#people").on("click",".about",function(event){
        event.preventDefault();
        alert("hola");
    });
});