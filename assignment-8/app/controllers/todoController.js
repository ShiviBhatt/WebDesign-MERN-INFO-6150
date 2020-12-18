'use strict';

const todoService = require('./../services/todoService');



/*
 Creates a new todo item  in todo List and sets the response.
 */
exports.createTodoItem = (request, response) => {
    const todo = Object.assign({}, request.body);
    const result = (savedTodos) => {
        response.status(201);
        response.json(savedTodos);
    };
    const promise = todoService.save(todo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/*
 Sets response for todo  list search.
 */
exports.todoList = (request, response) => {
    const title = request.query.tile;
    const params = {};
    if(title) {
        params.title = title
    };
    const promise = todoService.search(params);
    const result = (todos) => {
        response.status(200);
        response.json(todos);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};


/*
  Returns todo item from a particular id response
 */
exports.getTodoItem = (request, response) => {
    const todoId = request.params.id;
    const result = (todo) => {
        response.status(200);
        response.json(todo);
    };
    const promise = todoService.get(todoId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/*
  Update a particular todo item from todoList resource
 */
exports.updateTodoItem = (request, response) => {
    const todoId = request.params.id;
    const updatedTodo = Object.assign({}, request.body);
    updatedTodo.id = todoId;
    let date = new Date();
    // updates the date as the user updates an item
    updatedTodo.updatedAt = date;
    const result = (todo) => {
        console.log("Shivi update " + todo);
        response.status(200);
        response.json(todo);
    };
    const promise = todoService.update(updatedTodo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/*
  Deletes a todo item resource.
 */
exports.deleteTodoItem = (request, response) => {
    const todoId = request.params.id;
    //console.log("totdo=>",todoId);

        const result = () => {
            response.status(200);
            response.json({
                message: "Successfully deleted todo." // message send for successfull sending Todo
            });
        };
        const error = () => {
            response.status(404);
            response.json({
                message: "Id not found."
            });
        }
        const promise = todoService.delete(todoId);
        //console.log(error)
        promise
            .then(result)
            .catch(renderErrorResponse(response));
};


/*
 Throws error if error object is present.
 */
let renderErrorResponse = (response) => {
    console.log(response.statusCode);
    const errorCallback = (error) => {
        console.log(error);
        if (error) {
            response.status(500); // status 500 check
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback; // error Call back
};