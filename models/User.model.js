const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    image: String,
    imageName: String,
    active: Boolean,
    drinksCreated: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Drink"
            }
        ]
    },
    ingredientsCreated: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Ingredient"
            }
        ]
    },
    favoritedDrinks: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Drink"
            }
        ]
    },
    }, {
        timestamps: true
    });


module.exports = model('User', userSchema);