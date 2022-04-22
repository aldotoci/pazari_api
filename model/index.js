const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose;
db.product = require('./product')
db.user = require('./user')

module.exports = db