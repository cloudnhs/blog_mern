const express = require('express');
const router = express.Router();

const userModel = require('../../model/user');

// @route   POST user/register
// @desc    user register
// @access  Public

router.post('/register', (req, res) => {
    const newUser = new userModel({
        username : req.body.username,
        email: req.body.email,
        password:req.body.password,
        avatar: req.body.avatar
    })

    newUser
        .save()
        .then(result => {
            res.json({
                message : 'successful sign up',
                userInfo: result
            })
        })
        .catch(err => {
            res.json({
                error : err.message
            })
        })
    
    // res.json({
    //     message : 'registed user'
    // })
})


// @route   POST user/login
// @desc    user login
// @access  Public

router.post('/login', (req, res) => {
    res.json({
        message : 'user login'
    })
})




// @route   GET user/current
// @desc    current user
// @access  Private

router.get('/current', (req, res) => {
    res.json({
        message : 'current user'
    })
})



module.exports = router;