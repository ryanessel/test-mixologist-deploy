const express = require('express');
const router = express.Router();
const Liquors = require("../models/Liquors.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary_ing.js');


//--------ROUTE TO DISPLAY LIQUOR LIST
router.get('/liquorlist', (req, res, next) => {
    Liquors.find()
    .then((result)=>{
        res.render('liquors/liquorlist',{liquor: result});
    })

})

//---------ROUTE TO DISPLAY LIQUOR DETAILS
router.get('/liquordetails', (req, res, next) => {
    res.render('liquors/liquordetails');
})

//-------ROUTE TO DISPLAY CREATE LIQUOR
router.get('/createLiquor', (req, res, next) => {
    res.render('liquors/createliquor');
})

router.post('/createliquor',uploadSys.single('liquorIMG'), (req, res, next)=>{

    let img
    if(typeof req.file == 'undefined'){
        img = 'NoneSelected'
    } else {
       img = req.file.path
    };

    Liquors.create({
            name: req.body.name
            ,brand: req.body.brand
            ,type: req.body.type
            ,flavor: req.body.flavor
            ,description: req.body.description
            ,url: req.body.url
            ,price: req.body.price
            ,image: img
        }).then((createdLiquor) => {
            //console.log({createdLiquor})
            User.findByIdAndUpdate(req.session.currentlyLoggedIn._id,{$push: {liquorsCreated: createdLiquor._id}}, {new: true})
            .then((updatedUser) => {
                req.session.currentlyLoggedIn = updatedUser;
                //console.log({seshUserIng: req.session.currentlyLoggedIn.liquorsCreated, updatedUser});
                res.redirect(`/liquordetails/${createdLiquor._id}`)
            }).catch((err) => console.log(err))

    })
    .catch(error => next(error));
})


//---------ROUTE TO DISPLAY LIQUOR DETAILS
router.get('/liquordetails/:id', (req, res, next) => {
    Liquors.findById(req.params.id)
    .then((ing) => {
        res.render('liquors/liquordetails',{liquor: ing});
    }).catch((err)=>{
        console.log(err);
    })
})

//----- DELETE INGREDIENT ROUTE

router.post('/liquors/:id/delete', (req, res, next)=>{

    Liquors.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/liquorlist');
    })
    .catch((err)=>{
        console.log(err);
    })
  
  });

   //----------------------------- EDIT LIQUOR ROUTE
 router.get('/liquors/:id/edit', (req, res, next) => {
    Liquors.findById(req.params.id)
    .then(liquorsFromDb => {
        console.log(liquorsFromDb);
        res.render('liquors/editliquor', liquorsFromDb);
}).catch(err => {console.log({err})});
})

router.post('/liquors/:id/edit',uploadSys.single('liquorIMG'), (req, res, next)=>{

    Liquors.findById(req.params.id)
    .then((result)=>{
        let img
        if(typeof req.file == 'undefined'){
            img = result.image
        } else {
           img = req.file.path
        };

        Liquors.findByIdAndUpdate(req.params.id, {
            name: req.body.name
                ,brand: req.body.brand
                ,type: req.body.type
                ,flavor: req.body.flavor
                ,description: req.body.description
                ,url: req.body.url
                ,price: req.body.price
                ,image: img
            
            }).then(()=>{
                res.redirect(`/liquordetails/${req.params.id}`);
        })

    }).catch((err)=>{
        console.log(err);
    })

});

//----------------------------- CANCEL LIQUOR ROUTE
router.get('/liquordetails/:id/cancel', (req,res,next) => {
    res.redirect(`/liquordetails/${req.params.id}`);
})

module.exports = router;