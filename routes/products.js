var express = require('express');
var router = express.Router();
const {MongoClient} = require("mongodb")
const dbConfig = require("../config/db.config")
const db = require("../model")
const Product = db.product

const client = new MongoClient(dbConfig.uri);

/* GET home page. */
router.get('/get_products', async function(req, res, next) {
  try{
    await client.connect();
    var products_db = client.db("myFirstDatabase")
    var products_collection = products_db.collection("products")
    var products = await products_collection.find({}).toArray()

    console.log(products)
  }finally{
    await client.close()
  }

  res.json(products)
});

router.post('/GetProductById', async function(req,res,next){
  let id=req.body.id
  Product.findById(id).exec((err, obj) => {
    if(err){
      res.status(404).send({message: "Product doesn't exists."})
    }else{
      if(obj){
        res.send({product: obj})
      }else{
        res.status(404).send({message: "Product doesn't exists."})
      }
    }
  })
})

router.post('/GetProductForMiniSearch', function(req,res,next){
  let query = req.body.query
  Product.find({name: {$regex: `${query}`, $options: 'i'}}).exec((err,array) => {
    if(err){
      console.log("It worked");
      return res.status(404).send({message: err})
    }
    if(array.length === 0){
      return res.send({})
    }else{
      responseList = []
      array = array.slice(0,5)
      array.forEach(product => {
        productResponse = {}
        productResponse.name = product.name
        productResponse.image = product.image
        productResponse.price = product.price
        productResponse.id = product.id
        responseList.push(productResponse)
      })
      res.send({products: responseList})
    }
  })
})

module.exports = router;
