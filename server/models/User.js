const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:30
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', UserSchema);