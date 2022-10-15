const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ingredientsSchema = new Schema({
    name: String,
    type: String,
    description: String,
    image: String,
    url: String,
    price: Number,
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    }, {
        timestamps: true
    });


module.exports = model('Ingredient', ingredientsSchema);