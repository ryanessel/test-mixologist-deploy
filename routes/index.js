const express = require('express');
const router = express.Router();
const Ingredient = require("../models/Ingredient.model")
const Liquor = require("../models/Liquor.model")

router.get('/', (req, res, next) => {
    res.render('index',{layout: false});
})


router.get('/api/ingredients', (req, res, next) =>{
    Ingredient.find()
    .then((result) =>{
        res.json(result)
    }).catch(err => {
        (res.json(err))
    })      
})

router.get('/api/liquors', (req, res, next) =>{
    Liquor.find()
    .then((result) =>{
        res.json(result)
    }).catch(err => {
        (res.json(err))
    })      
})

module.exports = router;