console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jQuery ready we good');
    $('#submitButton').on('click', handleSubmit);
    $('#todo-list').on('click', '.complete-btn', choresDone)
    getToDo();
}

function getToDo() {
    console.log('in getToDos');

    $.ajax({
        method: 'GET', 
        url:'/todo'
    }).then(function (response) {
        console.log('ajax get complete')
        renderToDo(response);
    }).catch(function (error) {
        console.log('Ooops!', error);
    })
}

function renderToDo(toDoList){
    $('#todo-list').empty();

    for( let chores of toDoList) {
        $('#todo-list').append(`
        <tr id="${chores.id}" data-id="${chores.id}">
            <td>${chores.task}</td>
            <td><button class="delete-btn">Delete</button></td>
            <td><button class="complete-btn">Complete</button></td>

        </tr>
        `);
        if(chores.completed === true){
            $(`#${chores.id}`).css("background-color", "green");
        }
    }

}





function handleSubmit(){
    console.log('submit button working');

    

    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {
            taskToSend: $('#taskIn').val()
        }
            
    }).then(function (response) {
        console.log(response)
        $('#taskIn').val('')
        getToDo()
    }).catch(function(error) {
        console.log('POST error', error)
    })
};


function choresDone() {
    let idtoUpdate =  $(this).closest('tr').data('id');
    console.log(idtoUpdate);

    $.ajax({
        method: 'PUT', 
        url: `/todo/${idtoUpdate}`
    }).then(function (response) {
        console.log(response);
        getToDo();
    }).catch(function (error) {
        console.log(error);
    })
}