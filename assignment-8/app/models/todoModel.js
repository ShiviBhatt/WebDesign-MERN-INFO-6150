'use strict';
const mongoose = require('mongoose'); // mongo DB
const Schema = mongoose.Schema; // Schema

/*
  Mongoose schema for ToDo object todo Item details
 */
let TodoSchema = new Schema({
        title: {
            type: String,
            required: "Title is missing"
        },
        description: {
            type: String,
            required: "Description is missing"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        status : {
            type: Boolean,
            default: false
        },
        dueDate: {
            type : String,
            required: "Due Date is Missing"
        },
        dueTime: {
            type: String,
            required: "Due Time is Missing"
        }
    },
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id
TodoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// To Ensure virtual fields are serialised
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('todo', TodoSchema);