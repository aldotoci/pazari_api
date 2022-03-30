const mongoose = require('mongoose');

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        model: String,
        description: String,
        price: Number,
        image: String,
        quantity: Number,
        createdDate: {
            type: Date,
            min: '1987-09-28',
        },
        lastUpdated: Date,
        tags: [
            {
                type: String
            }
        ],
    })
)

module.exports = Product;