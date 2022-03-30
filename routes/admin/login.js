const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminConfig = require('../../config/admin.config')
const tokenConfig = require('../../config/token.config')
var router = express.Router()

router.post('/', (req,res) => {
    const username = req.body.username
    const password = req.body.password

    if(username === adminConfig.username){
        bcrypt.compare(password, adminConfig.password, (err, value)=>{
            if(err){
                res.status(500).send({message: err})
                return
            }
            if(value){
                var token = jwt.sign({
                    user: 'admin',
                }, tokenConfig.secret, { expiresIn: 60 * 60 * 2});
                return res.send({token: token})
            }
            return res.status(403).send({token: null})
        })
    }else{
        return res.status(403).send({token: null})
    }
})
module.exports = router