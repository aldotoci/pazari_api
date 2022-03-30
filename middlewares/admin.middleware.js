const express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
var tokenConfig = require('../config/token.config')

router.post('**', async (req,res,next) => {
    let token = req.headers['x-access-token']
    console.log(token)
    if(token !== null){
        jwt.verify(token, tokenConfig.secret, (err, decoded) => {
            if(err){
                return res.status(403).send({message: "Unathorised"})   
            }else{
                if(decoded.user === "admin"){
                    return next()
                }else{
                    return res.status(403).send({message: false}) 
                }
            }
        })
    }else{
        res.status(403).send({message: false})
    }
})

module.exports = router