const express = require('express');
const router = express.Router();


// @route   POST user/register
// @desc    user register
// @access  Public

router.post('/register', (req, res) => {
    res.json({
        message : 'registed user'
    })
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