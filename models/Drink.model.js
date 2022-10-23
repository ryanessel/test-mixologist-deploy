const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const drinkSchema = new Schema({
    name: String,
    ingredient:
         [{
            ingredientObject:{
                type: Schema.Types.ObjectId,
                ref: "Ingredient"
            },
            quantity:{
                type: String
            },
            htmlID:{
                type:String
            }
          }],

    liquor:
        [{ 
            liquorObject:{
                type: Schema.Types.ObjectId,
                ref: "Liquor"
        }, 
        quantity:{
            type: String
        },
        htmlID:{
            type:String
        }
        }],
    glasswear: 
        [{
            glasswearObj:{
                type:String
            },
            htmlID:{
                type:String
            }
    }],
    tool: 
    [{
        toolObj:{
            type:String
        },
        htmlID:{
            type:String
        }
    }],
    likeCount: Number,
    instructions: String,
    description: String,
    image: String,
    url: String,
    tags: String,
    }, {
        timestamps: true
    });


module.exports = model('Drink', drinkSchema);