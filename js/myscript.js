// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3027/todos
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){

    getElement();

    $(document).on('click', '.delete', function(){
        var cliccato = $(this);
        // console.log(cliccato);
        var id = cliccato.parent().attr('data-id');
        deleteElement(id);
    });

    $('.inserisci').click(function(){
        var addItem = $('#add-item').val();
        // console.log(addItem);
        createElement(addItem);
    });

    $(document).on('click', 'span.testo', function(){
        $(this).addClass('hidden');
        $(this).siblings('input').removeClass('hidden');
    });

    $(document).on('keyup', '.edit-item', function(){
        if (event.keyCode == 13 || event.which == 13){
            var editItem = $(this).val();
            console.log(editItem)
            var id = $(this).parent().attr('data-id');
            console.log(id)
            editElement(editItem, id);
        }
    });
});




//******FUNZIONI*******//

function editElement(data, id){
    $.ajax({
        url: 'http://157.230.17.132:3027/todos/' + id,
        method: 'PUT',
        data: {
            text: data,
        },
        success: function(risposta){
            // console.log(risposta)
            $('.toDo-list').html('');
            getElement();
        },
        error: function() {
            alert('Errore!');
        }
    });

}

function createElement(data){
    $.ajax({
        url: 'http://157.230.17.132:3027/todos/',
        method: 'POST',
        data: {
            text: data
        },
        success: function(risposta){
            // console.log(risposta)
            $('.toDo-list').html('');
            getElement();
        },
        error: function() {
            alert('Errore!');
        }
    });
}

function deleteElement(data){
    $.ajax({
        url: 'http://157.230.17.132:3027/todos/' + data,
        method: 'DELETE',
        success: function(risposta){
            // console.log(risposta)
            $('.toDo-list').html('');
            getElement();
        },
        error: function() {
            alert('Errore!');
        }
    });
}


function getElement(data){
    $.ajax({

        url: 'http://157.230.17.132:3027/todos',
        method: 'GET',
        success: function(data){
            // console.log(risposta);
            getList(data);

        },
        error: function() {
            alert('Errore!');
        }
    });
}

function getList(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        // var context = risposta[i];
        var context = {
            testo: data[i].text,
            id: data[i].id
        }
        var html = template(context);
        $('.toDo-list').append(html);
    }
}
