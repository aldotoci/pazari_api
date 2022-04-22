const express = require('express')
const router = express.router
const jwt = require('jsonwebtoken')
const {secret} = require('../config/token.config')

router.post('**', (req,res,next)=> {
    const token = req.headers['x-access-token']

    if(token && token !== null){
        jwt.verify(token, secret, (err, decoded)=> {
            if(err){
                return res.status(403).send("You are not authonticated") 
            }
            next()
        })
    }else{
        res.status(403).send("Not authotenticated")
    }
})