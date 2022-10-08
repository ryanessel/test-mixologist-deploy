const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const drinkSchema = new Schema({
    name: String,
    ingredients: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Ingredient"
            }
        ]
    },
    glassware: {
        type: [],
    },
    tools: {
        type: [],
    },
    likeCount: Number,
    //how to add a quantity to a specific liquor or mixer
    // quantity: String,
    instructions: String,
    description: String,
    image: String,
    url: String,
    price: Number,
    tags: [],
    }, {
        timestamps: true
    });


module.exports = model('Drink', drinkSchema);