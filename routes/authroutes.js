const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//================SIGN-UP
router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

router.post('/signup', (req, res, next)=>{
    const saltRounds = 12;
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(req.body.password, salt))
    .then(hashedPassword => {
      console.log(`Password hash: ${hashedPassword}`);
      User.create({
        username: req.body.username,
        password: hashedPassword,
    })
      res.redirect('/')
    })
    .catch(error => next(error));
});



module.exports = router;