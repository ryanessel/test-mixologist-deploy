const express = require('express');
const router = express.Router();
const Ingredients = require("../models/Ingredients.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary.js');


//--------INGREDIENT LIST
router.get('/ingredientlist', (req, res, next) => {
    res.render('ingredients/ingredientlist');
})

//-------CREATE INGREDIENTS
router.get('/createingredient', (req, res, next) => {
    res.render('ingredients/createingredient');
})


//TEST FURTHER, CAN YOU UPLOAD INGREDIENT WITHOUT IMAGE
router.post('/createingredient', uploadSys.single('drinkIMG'), (req, res, next)=>
{
    let imageFileName;
    if(typeof req.file.originalname !== 'undefined'){
        imageFileName = req.file.originalname
    } else {
        imageFileName = 'None'
    }
    User.findById(req.session.currentlyLoggedIn._id)
    .then((theUser) =>{
        Ingredients.create({
             name: req.body.name
            ,type: req.body.type
            ,description: req.body.description
            ,image: imageFileName
            ,url: req.body.url
            ,price: req.body.price
            ,createdBy: theUser
        })
        res.redirect('/ingredientdetails')
    })
    .catch(error => next(error));

})


router.get('/ingredientdetails', (req, res, next) => {
    res.render('ingredients/ingredientdetails');
})


module.exports = router;
