const express = require('express');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const router = express.Router();
const User = require('../model').user
const salt_rounds = require('../config/salt.config').salt_rounds

router.post('/register' ,(req,res) => {
    const register_data = req.body.data;

    bcrypt.hash(register_data.password, salt_rounds, (err, hash) => {
        if(err){
            res.status(500).send({err: err})
            return
        }
        User.findOne({username: register_data.username}, (err, obj)=>{
            if(err) return res.status(500).send({err: err})
            if(obj) {
                if(obj.email === register_data.email && obj.phone === register_data.phone){
                    return res.status(400).send({message: 'Username, email, and phone number already exists!'})
                }else if(obj.email === register_data.email){
                    return res.status(400).send({message: 'Username and email already exists!'})
                }else if(obj.phone === register_data.phone){
                    return res.status(400).send({message: 'Username and phone number already exists!'})
                }
                return res.status(400).send({message: 'Username already exists!'})
            }
            User.findOne({email: register_data.email}, (err, obj)=>{
                if(err) return res.status(500).send({err: err})
                if(obj){
                    if(obj.phone === register_data.phone){
                        return res.status(400).send({message: 'Email and phone number already exists!'})
                    }
                    return res.status(400).send({message: 'Email already exists!'})
                } 
                
                User.findOne({phone: register_data.phone}, (err, obj)=>{
                    if(err) return res.send({err: err})
                    if(obj) return res.status(400).send({message: 'Phone number already exists!'})
                    register_data.password = hash
                    const user = new User(register_data)
                    user.save().then(savedUser => {
                    if(savedUser === user){
                        res.status(200).send({message: "You are succesfully registered!"})
                    }else{
                        res.status(400).send({message: "Failed saving user!"})
                    }
                }) 
                })
            }) 
        })
    })
})

router.post('/register/existsUser', (req,res) => {
    const user = req.body.username;
    User.findOne({username: user}).exec((err,user) => {
        if(err){
            return res.status(500).send({message: "Some internal server error happened please contact owner."})
        }
        if(user){
            return res.status(201).send({message: "User exists already."})
        }
        return res.send({message: 'User does not exists'})
    })
})
router.post('/register/existsEmail', (req,res) => {
    const email = req.body.email;
    User.findOne({email: email}).exec((err,user) => {
        if(err){
            return res.status(500).send({message: "Some internal server error happened please contact owner."})
        }
        if(user){
            return res.status(201).send({message: "User exists already."})
        }
        return res.send({message: 'User does not exists'})
    })
})
router.post('/register/existsPhone', (req,res) => {
    const phone = req.body.phone;
    User.findOne({phone: phone}).exec((err,user) => {
        if(err){
            return res.status(500).send({message: "Some internal server error happened please contact owner."})
        }
        if(user){
            return res.status(201).send({message: "User exists already."})
        }
        return res.send({message: 'User does not exists'})
    })
})

module.exports = router