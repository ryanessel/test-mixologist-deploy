const express = require('express');
const router = express.Router();
const Ingredients = require("../models/Ingredients.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary_ing.js');


//--------ROUTE TO DISPLAY INGREDIENT LIST
router.get('/ingredientlist', (req, res, next) => {
    Ingredients.find()
    .then((result)=>{
        res.render('ingredients/ingredientlist',{ing: result});
    })
})

//-------ROUTE TO DISPLAY CREATE INGREDIENTS
router.get('/createIngredient', (req, res, next) => {
    res.render('ingredients/createingredient');
})

router.post('/createingredient',uploadSys.single('ingIMG'), (req, res, next)=>{

    let img
    if(typeof req.file == 'undefined'){
        img = 'NoneSelected'
    } else {
       img = req.file.path
    };

    Ingredients.create({
             name: req.body.name
            ,type: req.body.type
            ,description: req.body.description
            ,url: req.body.url
            ,price: req.body.price
            ,image: img
        }).then((createdIng) => {
            console.log({createdIng})
            User.findByIdAndUpdate(req.session.currentlyLoggedIn._id,{$push: {ingredientsCreated: createdIng._id}}, {new: true})
            .then((updatedUser) => {
                req.session.currentlyLoggedIn = updatedUser;

                console.log({seshUserIng: req.session.currentlyLoggedIn.ingredientsCreated, updatedUser});
                res.redirect(`/ingredientdetails/${createdIng._id}`)
            }).catch((err) => console.log(err))

    })
    .catch(error => next(error));
})

//---------ROUTE TO DISPLAY INGREDIENT DETAILS
router.get('/ingredientdetails/:id', (req, res, next) => {
    Ingredients.findById(req.params.id)
    .then((ing) => {
        res.render('ingredients/ingredientdetails',{ingredient: ing});
    }).catch((err)=>{
        console.log(err);
    })
})


//----- DELETE INGREDIENT ROUTE

router.post('/ingredients/:id/delete', (req, res, next)=>{

  Ingredients.findByIdAndRemove(req.params.id)
  .then((response)=>{
      res.redirect('/ingredientlist');
  })
  .catch((err)=>{
      console.log(err);
  })

});

module.exports = router;
