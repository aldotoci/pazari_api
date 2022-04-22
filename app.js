var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const db = require('./model/')
const dbConfig = require('./config/db.config')

db.mongoose.connect(dbConfig.uri).then(() => {
  console.log('Succesfully connected to MongoDB')
}).catch(err => {
  console.log("Connection Error: ", err)
})

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  credentials: true
}

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin/');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products/', productsRouter)
app.use('/admin' ,adminRouter)
app.use('/user/', registerRouter)
app.use('/user/', loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;