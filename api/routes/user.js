const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


const userModel = require('../../model/user');

// @route   POST user/register
// @desc    user register
// @access  Public


router.post('/register', (req, res) => {
    
    const {email, password, username} = req.body;

    userModel
        .findOne({email : email})
        .then(user => {
            // user의 email이 등록되어 있을 경우 error를 반환한다
            if(user){
                return res.json({
                    message : 'email already exists'
                });
            }else{
                // user의 email이 없는 경우에는 db에 저장한다.
                // password 암호화
                bcrypt.hash(password, 10, (err, hash) => {
                    //password 암호화 실패
                    if(err) {
                        return res.status(500).json({
                            error : err.message
                        })           
                    }else{
            
                        // const avatar = gravatar.url(req.body.email, {
                        const avatar = gravatar.url(email, {
                            s: '200', //size
                            r: 'pg', // Rating
                            d: 'mm'  // Default
                        });
            
            
                        // password 암호화 성공 후 db 저장
                        const newUser = new userModel({
                            username,
                            email,
                            password: hash,
                            avatar: avatar
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
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            });
        });


    
    
    
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