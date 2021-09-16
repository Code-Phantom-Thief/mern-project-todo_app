const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    author: {
        type: String,
        minlength: 3,
        maxlength: 30,
        default: 'Code Phantom Thief'
    },
    uid: {
        type: String
    },
    isComplete: {
        type: Boolean
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', TodoSchema);