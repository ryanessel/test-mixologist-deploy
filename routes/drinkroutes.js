const express = require('express');
const router = express.Router();
const Drinks = require("../models/Drink.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary_ing.js');
const Ingredient = require("../models/Ingredient.model")
const Liquor = require("../models/Liquor.model")


//--------ROUTE TO DISPLAY DRINK LIST
router.get('/drinklist', (req, res, next) => {
    Drinks.find()
    .then((result)=>{
    res.render('drinks/drinklist', {drink: result});
})
})

//-------ROUTE TO DISPLAY CREATE DRINKS
router.get('/createdrink', (req, res, next) => {
    Ingredient.find()
    .then((resultIng)=>{
    Liquor.find()
    .then((resultLiq)=>{
        res.render('drinks/createdrink', {ing: resultIng, liquor: resultLiq});
    })
    }).catch(error => next(error));
})

router.post('/createdrink',uploadSys.single('drinkIMG'), (req, res, next)=>{

    let ingArray = []
    let liqArray = []
    let toolArray = []
    let glassArray = []

    for (i=0;i<req.body.ingN;i++){
        ingArray.push({ingredientObject: req.body[`ingObj${i}`], quantity:req.body[`ingQnt${i}`]})
    }

    for (i=0;i<req.body.liqN;i++){
        liqArray.push({liquorObject: req.body[`liqObj${i}`], quantity:req.body[`liqQnt${i}`]})
    }

    for (i=0;i<req.body.toolN;i++){
        toolArray.push(req.body[`toolObj${i}`])
    }

    for (i=0;i<req.body.glassN;i++){
        glassArray.push(req.body[`glassObj${i}`])
    }

    let img
    if(typeof req.file == 'undefined'){
        img = 'NoneSelected'
    } else {
       img = req.file.path
    };

    
    Drinks.create({
            name: req.body.name
            ,instructions: req.body.instructions
            ,description: req.body.description
            ,url: req.body.url
            ,image: img
            ,tags: req.body.tags
            ,ingredient: ingArray
            ,liquor: liqArray
            ,tools: toolArray
            ,glasswear: glassArray
            ,likeCount: 0 
        }).then((createdDrink) => {
                User.findByIdAndUpdate(req.session.currentlyLoggedIn._id,{$push: {drinksCreated: createdDrink._id}}, {new: true})
                .then((updatedUser) => {
                    req.session.currentlyLoggedIn = updatedUser;
    
                    console.log({seshUserIng: req.session.currentlyLoggedIn.drinksCreated, updatedUser});
                    res.redirect(`/drinkdetails/${createdDrink._id}`)
                })
            }).catch(error => next(error));
        })


//---------ROUTE TO DISPLAY DRINK DETAILS
router.get('/drinkdetails/:drinkId', (req, res, next) => {
    Drinks.findById(req.params.drinkId).populate([{model:'Ingredient', path:'ingredient.ingredientObject'},{model:'Liquor', path:'liquor.liquorObject'}])
    .then((drink)=>{
        console.log(drink)
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

 //----------------------------- EDIT DRINKS ROUTE
router.get('/drinks/:id/edit', (req, res, next) => {
    Drinks.findById(req.params.id).populate([{model:'Ingredient', path:'ingredient.ingredientObject'},{model:'Liquor', path:'liquor.liquorObject'}])
    .then(drinksFromDb => {
        console.log(drinksFromDb);
        res.render('drinks/editdrink', {drink:drinksFromDb});
}).catch(err => {console.log({err})});
})

router.post('/drinks/:id/edit', (req, res, next)=>{
    Drinks.findByIdAndUpdate(req.params.id, {
        name: req.body.name
            ,instructions: req.body.instructions
            // ,quantity: req.body.quantity
            ,description: req.body.description
            ,url: req.body.url
            // ,price: req.body.price
            ,image: img
            ,tags: req.body.tags
        
    }).then((response)=>{
        
        res.redirect('/createdrink');

    }).catch((err)=>{
        console.log(err);
    })

});

//----------------------------- CANCEL DRINKS ROUTE
router.get('/drinks/:id/cancel', (req,res,next) => {
    res.redirect(`/drinkdetails/${req.params.id}`)
})

  
module.exports = router;


