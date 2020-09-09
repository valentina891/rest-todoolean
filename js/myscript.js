// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3027/todos
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){
    $.ajax({

        url: 'http://157.230.17.132:3027/todos',
        method: 'GET',
        success: function(risposta){
            // console.log(risposta);
            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);

            for (var i = 0; i < risposta.length; i++) {

                // var context = risposta[i];
                var context = {
                    testo: risposta[i].text,
                    id: risposta[i].id
                }
                var html = template(context);
                $('.toDo-list').append(html);

            }
        },
        error: function() {
            alert('Errore!');
        }
    });
});
