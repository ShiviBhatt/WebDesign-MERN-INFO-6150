'use strict';
const mongoose = require('mongoose'),
    Todo = mongoose.model('todo');

/*
 * Returns a promise for search results.
 */
exports.search = (params) => {
    const promise = Todo.find(params).exec();
    return promise;
};


/*
 * Saves the new todo object.
 */
exports.save = (todo) => {
    const newTodo = new Todo(todo); // New Todo
    return newTodo.save();
};
/*
 * Returns the todo object by id.
*/
exports.get = (todoId) => {
    const todoPromise = Todo.findById(todoId).exec(); // Promise
    return todoPromise;
};


/*
 * Updates an existing todo Item.
 */
exports.update = (updatedTodo) => {
    const promise = Todo.findByIdAndUpdate(updatedTodo.id, updatedTodo, {new: true}).exec(); // Promise
    return promise;
};

/*
 Deletes an existing todo Item.
 */
exports.delete = (todoId) => {
    const promise = Todo.findByIdAndRemove(todoId).exec();
    return promise;
};