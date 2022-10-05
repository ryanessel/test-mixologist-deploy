const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ingredientsSchema = new Schema({
    name: String,
    type: String,
    description: String,
    image: String,
    url: String,
    createdBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
    },
    price: Number,
    }, {
        timestamps: true
    });


module.exports = model('Ingredient', ingredientsSchema);