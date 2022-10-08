const express = require('express');
const router = express.Router();
const Drinks = require("../models/Drinks.model")
const User = require("../models/User.model")
const uploadSys = require('../config/cloudinary_ing.js');


//--------ROUTE TO DISPLAY DRINK LIST
router.get('/drinklist', (req, res, next) => {
    res.render('drinks/drinklist');
})

//-------ROUTE TO DISPLAY CREATE DRINKS
router.get('/createdrink', (req, res, next) => {
    res.render('drinks/createdrink');
})

//---------ROUTE TO DISPLAY DRINK DETAILS
router.get('/drinkdetails', (req, res, next) => {
    res.render('drinks/drinkdetails');
})

module.exports = router;