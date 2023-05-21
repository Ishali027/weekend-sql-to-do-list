console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('jQuery ready we good');
    $('#submitButton').on('click', handleSubmit);
    $('#todo-list').on('click', '.complete-btn', choresDone);
    $('#todo-list').on('click', '.delete-btn', choresDelete);
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

function choresDelete (){
    const idtoDelete = $(this).closest('tr').data('id');
    console.log(idtoDelete);
    swal({
        title: "Are you sure?",
        text: "Are you sure you got it done??",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Damn, took you long enough!", {
            icon: "success",
          });
          $.ajax({
            method: 'DELETE',
            url: `/todo/${idtoDelete}`
        }).then(function (response) {
            console.log(response);
            getToDo();
        }).catch(function (error) {
            console.log(error);
        })
        } else {
          swal("Your imaginary file is safe!");
        }
      });

    }