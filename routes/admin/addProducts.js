const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminConfig = require('../../config/admin.config')
const tokenConfig = require('../../config/token.config')
const router = express.Router()
const db = require('../../model/index')
const Product = db.product

router.post('/', (req,res) => {
    let dataFromClient = {
        name: req.body.name,
        model: req.body.model,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
        createdDate: req.body.createdDate,
        lastUpdated: req.body.lastUpdated,
        tags: req.body.tags
    }
    console.log(dataFromClient);
    const data = new Product(dataFromClient)
    data.save((err, user) => {
        if(err){
            res.status(500).send({'message': err})
            return
        }
    })
    res.status(200).send({"message": true})
})
router.post('/checkName', (req,res,next)=> {
    const name = req.body.name
    const doesNameExist = Product.findOne(
        {name: name}, 
        function(err,obj) {
            if(err){
                return console.log(err)
            }
            obj !== null ? res.send({message: true}) : res.status(200).send({message: false, user: obj})
        }
    )
})
module.exports = router