const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const userModel = require('../../model/user');

// @route   POST user/register
// @desc    user register
// @access  Public

router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        //password 암호화 실패
        if(err) {
            return res.status(500).json({
                error : err.message
            })           
        }else{
            // password 암호화 성공 후 db 저장
            const newUser = new userModel({
                username : req.body.username,
                email: req.body.email,
                password:hash,
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
                    });
                });
        }
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