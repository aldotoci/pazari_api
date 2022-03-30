const express = require('express')
const jwt = require('jsonwebtoken')
var tokenConfig = require('../../config/token.config')
var router = express.Router()
const adminM = require('../../middlewares/admin.middleware')

const loginRouter = require('./login')
const adminMid = require('../../middlewares/admin.middleware')
const addProductRouter = require('./addProducts')
const editProductsRouter = require('./editProducts')

router.use('/login', loginRouter)
router.use('/add', [adminMid] ,addProductRouter)
router.use('/edit', [adminMid], editProductsRouter)

router.get('/', async (req,res,next) => {
    let token = req.headers['x-access-token']
    if(token !== null){
        jwt.verify(token, tokenConfig.secret, (err, decoded) => {
            if(err){
                return res.status(403).send({message: "Unathorised"})   
            }else{
                if(decoded.user === "admin"){
                    res.send({message: true})
                }else{    
                    return res.status(403).send({message: false}) 
                }
            }
        })
    }else{
        res.status(403).send({message: 'fa'})
    }
})

module.exports = router