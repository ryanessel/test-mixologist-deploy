const express = require('express');
const router = express.Router();
const Ingredients = require("../models/Ingredients.model")
const uploadSys = require('../config/cloudinary.js');

router.get('/ingredientlist', (req, res, next) => {
    res.render('ingredients/ingredientlist');
})



router.get('/createingredient', (req, res, next) => {
    res.render('ingredients/createingredient');
})

router.post('/createingredient', (req, res, next)=>
{
   Ingredients.create({
    name:
    type:
    description:
    image:
    url:
    price:
   })
})



router.get('/ingredientdetails', (req, res, next) => {
    res.render('ingredients/ingredientdetails');
})

module.exports = router;
