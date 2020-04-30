const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/auth');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.pass, 10)
        .then(hashPass => {
            const user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                phone: req.body.phone,
                gender: req.body.gender,
                email: req.body.email,
                pass: hashPass
            });
            user.save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: 'User Saved',
                    })
                })
                .catch(err => {
                    let errorMsg = err.message.split(':')
                    console.log(errorMsg[2])
                    res.status(500).json({
                        message: errorMsg[2]
                    })
                })
        })
        .catch(hashErr => {
            console.log("Error in hashing ", hashErr)
        })
})

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User Not Found"
                })
            }
            bcrypt.compare(req.body.pass, user.pass)
                .then(compareRes => {
                    if (!compareRes) {
                        return res.status(401).json({
                            message: "Login Failed"
                        })
                    }
                    var token = jwt.sign(
                        {
                            email: user.email,
                            id: user._id
                        },
                        'this-is-my-secret-passcode',
                        {
                            expiresIn: '1h'
                        });
                    res.status(200).json({
                        message: 'Login Successfull',
                        token: token,
                        expiresIn: 3600,
                        fname: user.fname,
                        lname: user.lname
                    })
                })
                .catch(err => {
                    res.status(401).json({
                        message: "Login Failed"
                    })
                })
        })
        .catch(err => {
            res.status(401).json({
                message: "Login Failed"
            })
        })
})

module.exports = router;