// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    cin: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    type:{
        type: String
    }
}, {
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Username or Email already in use.' });
module.exports = mongoose.model('User', userSchema)