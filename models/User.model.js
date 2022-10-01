const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    image: String,
    imageName: String,
    active: Boolean,
    }, {
        timestamps: true
    });


module.exports = model('User', userSchema);