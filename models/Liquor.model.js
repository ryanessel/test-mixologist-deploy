const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const liquorsSchema = new Schema({
    name: String,
    brand: String,
    type: String,
    flavor: String,
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


module.exports = model('Liquor', liquorsSchema);