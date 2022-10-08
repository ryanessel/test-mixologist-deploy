const express = require('express');
const router = express.Router();
const Drinks = require("../models/Drinks.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary_ing.js');
const Ingredients = require("../models/Ingredients.model")
const Liquors = require("../models/Liquors.model")


//--------ROUTE TO DISPLAY DRINK LIST
router.get('/drinklist', (req, res, next) => {
    Drinks.find()
    .then((result)=>{
    res.render('drinks/drinklist', {drink: result});
})
})

//-------ROUTE TO DISPLAY CREATE DRINKS
router.get('/createdrink', (req, res, next) => {
    Ingredients.find()
    .then((resultIng)=>{
    Liquors.find()
    .then((resultLiq)=>{
        res.render('drinks/createdrink', {ing: resultIng, liquor: resultLiq});
    })
    }).catch(error => next(error));
})

router.post('/createdrink',uploadSys.single('DrinkIMG'), (req, res, next)=>{

    let img
    if(typeof req.file == 'undefined'){
        img = 'NoneSelected'
    } else {
       img = req.file.path
    };

    Drinks.create({
            name: req.body.name
            // ,tools: req.body.tools
            // ,ingredients: req.body.ingredients
            // ,liquors: req.body.liquors
            // ,glasswear: req.body.glasswear
            ,instructions: req.body.instructions
            // ,quantity: req.body.quantity
            ,description: req.body.description
            // ,url: req.body.url
            // ,price: req.body.price
            ,image: img
            // ,tags:
        }).then((createdDrink) => {
            console.log({createdDrink})
            User.findByIdAndUpdate(req.session.currentlyLoggedIn._id,{$push: {drinksCreated: createdDrink._id}}, {new: true})
            .then((updatedUser) => {
                req.session.currentlyLoggedIn = updatedUser;

                console.log({seshUserIng: req.session.currentlyLoggedIn.drinksCreated, updatedUser});
                res.redirect(`/drinkdetails/${createdDrink._id}`)
            }).catch((err) => console.log(err))

    })
    .catch(error => next(error));
})



//---------ROUTE TO DISPLAY DRINK DETAILS
router.get('/drinkdetails/:drinkId', (req, res, next) => {
    Drinks.findById(req.params.drinkId)
    .then((drink)=>{
        res.render('drinks/drinkdetails', {drink: drink});
    }).catch((err)=>{
        console.log(err);
    })
})

//----- DELETE INGREDIENT ROUTE

router.post('/drinks/:id/delete', (req, res, next)=>{

    Drinks.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/drinklist');
    })
    .catch((err)=>{
        console.log(err);
    })
  
  });
  
module.exports = router;


