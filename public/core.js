// public/core.js
// var scotchTodo = angular.module('scotchTodo', []);


function render(todos){
    $(".todos").children().not(".template").remove();
    const template = $(".todos").children(".template");

    todos.forEach((todo) => {
        // const node = $(".todos")[0].children[0].cloneNode(true)
        // node.querySelector(".text").innerText = todo.text;
        // $(".todos")[0].appendChild(node);
        const node = template.clone(true).show().removeClass("template")
        node.find(".text").text(todo.text);
        node.find(".id").text(todo._id);
        $(".todos").append(node);
    });
}
function getTodos(){
    fetch('/api/todos')
        .then((data) => data.json())
        .then((json) => {
            const todos = json;
            // $scope.todos = data;
            // const template = $(".todos").children();
            render(todos);
            // console.log(data);
        });
        /*
        .catch(function(data) {
            console.log('Error: ' + data);
        });
        */
}

function createTodo(){
    const text = $(".new-todo-text").val();
    fetch('/api/todos', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: text}),
        })
        .then(() => {
            getTodos();
        });
}

function deleteTodo(el){
    const id = $(el).closest(".todo").find(".id").text();
    fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            getTodos();
        });
}

getTodos();


function mainController($scope, $http) {
    $scope.formData = {};

    getTodos();
    /*
    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            // const template = $(".todos").children();
            show($scope.todos);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    */
    
    // when submitting the add form, send the text to the node API
    $scope.xxcreateTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
                getTodos();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.xxxdeleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
