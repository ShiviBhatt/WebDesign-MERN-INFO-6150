'use strict';

const todoController = require('./../controllers/todoController'); // todoController added

module.exports = (app) => {
    app.route('/todos')
        .get(todoController.todoList) // get todo List
        .post(todoController.createTodoItem); // post todo List


     app.route('/todos/:id')
         .get(todoController.getTodoItem) // get todo List based on ID 
         .put(todoController.updateTodoItem) // put todo List that is update
         .delete(todoController.deleteTodoItem); // delete todo List
};