var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Site = require('./server/Site');
const { StringDecoder } = require('string_decoder');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const APIroutes = require("./routes/API");
const authRoutes = require("./routes/auth");
const initAdmin = require("./server/initAdmin");

dotenv.config();

var app = express();

//Mongoose stuff
const dbURL = process.env["MONGODB_URL"];
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// -----DON'T WORRY ABOUT IT----- // 
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initAdmin();

const APIrouter = express.Router();
APIroutes(APIrouter);
app.use("/API", APIrouter);

const authRouter = express.Router();
authRoutes(authRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    Type: "error",
    Message: err.message
  });
});


app.listen(5000);

module.exports = app;
