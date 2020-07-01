const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    // email 유무체크
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            //console.log(user)  //null값을 회신
            if(!user) {
                return res.json({
                    error: 'user not found'
                })
            }else{
            //비밀번호 체크
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    console.log(result)
                    if(err || result ===false) {
                        return res.status(400).json({
                            message: "password incorrect"
                        });
                    }else{
                        //json web token 생성
                        const token = jwt.sign(
                            {
                                email : user.email,
                                userId: user._id
                            },
                            process.env.SECRET,
                            {expiresIn: "1h"}
                        );    
                        
                        res.status(200).json({
                             message: "successful login",
                             userInfo: token
                         })
                    }
                } ) 
            }
        })
    // res.json({
    //     message : 'user login'
    // })
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