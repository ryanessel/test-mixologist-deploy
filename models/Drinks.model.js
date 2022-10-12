const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const drinkSchema = new Schema({
    name: String,
    ingredients:
         [{
            ingredientObject:{
                type: Schema.Types.ObjectId,
                ref: "Ingredient"
            },
            quantity:{
                type: String
            }
          }],

    liquors:
        [{ 
            liquorsObject:{
                type: Schema.Types.ObjectId,
                ref: "Liquor"
        }, 
        quantity:{
            type: Number
        }
        }],
    glasswear: {
        type: [],
    },
    tools: {
        type: [],
    },
    likeCount: Number,
    instructions: String,
    description: String,
    image: String,
    url: String,
    price: Number,
    tags: String,
    }, {
        timestamps: true
    });


module.exports = model('Drink', drinkSchema);