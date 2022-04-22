const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { hash } = require('bcrypt');
const router = express.Router();
const User = require('../model').user
const tokenConfig = require('../config/token.config')

router.post('/login', (req,res)=>{
    const user = req.body.user
    const password = req.body.password

    User.findOne({username: user}).exec((err, user) => {
        if(err){
            return res.status(500).send({err: err})
        }
        if(user){
            const password_hash = user.password
            bcrypt.compare(password, password_hash, (err, value)=>{
                if(err){
                    return res.status(500).send({message: err})
                }
                if(value){
                    var token = jwt.sign({
                        user: user,
                    }, tokenConfig.secret, { expiresIn: 60 * 60 * 24});
                    return res.send({token: token})
                }
                return res.status(404).send({message: "Wrong password!"})
            })
        }else{
            User.findOne({email: user}).exec((err, user) => {
                if(err){
                    return res.status(500).send({err: err})
                }
                if(user){
                    const password_hash = user.password
                    bcrypt.compare(password, password_hash, (err, value)=>{
                        if(err){
                            res.status(500).send({message: err})
                            return
                        }
                        if(value){
                            var token = jwt.sign({
                                user: user,
                            }, tokenConfig.secret, { expiresIn: 60 * 60 * 24});
                            return res.send({token: token})
                        }
                        return res.status(404).send({message: "Wrong password!"})
                    })
                }else{
                    res.status(404).send({message: "User not found"})
                }
            })
        }
    })
})
module.exports = router