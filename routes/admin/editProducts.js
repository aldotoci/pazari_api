const express = require('express')
const router = express.Router()
const db = require('../../model/')
const Product = db.product

router.post('/get5Products', (req,res)=>{
    var name = req.body.name
    Product.find({name: {$regex: `${name}`, $options: 'i'}}).exec((err, list) => {
        if(err){
            res.status(500).send(err)
        }
        if(list){
            res.send({data: list.slice(0,5)});
        }else{
            res.send({data: []})
        }
    })
})
router.post('/', (req,res)=>{
    let id = req.body.id
    Product.findById(id).exec((err,obj) => {
        if(err){
            res.status(500).send(err)
        }
        if(obj){
            res.send(obj)
        }else{
            res.status(404).send()
        }
    })
})
router.put('/', (req,res)=>{
    let id = req.body.id
    let data = req.body.data
    Product.findById(id).exec((err,obj) => {
        if(err){
            res.status(500).send(err)
        }
        if(obj){
            obj.name = data.name
            obj.model = data.model
            obj.price = data.price
            obj.image = data.image
            obj.quantity = data.quantity
            obj.createdDate = data.createdDate
            obj.lastUpdated = data.lastUpdated
            obj.tags = data.tags
            obj.save()
            res.status(200).send()
        }else{
            res.status(404).send()
        }
    })
})


module.exports = router