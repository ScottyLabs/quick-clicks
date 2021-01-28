var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Site = require('./server/schemaOutline');
const { StringDecoder } = require('string_decoder');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

var app = express();

//Mongoose stuff?
const dbURL = process.env["MONGODB_URL"];
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//post function
//uses req.body from Postman
app.put('/create', function(req, res) {
  const site = new Site({...req.body, active: true});
  console.log(req.body);
  site.save() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

//quick note: 
//to test queries in Compass: use everything inside the brackets: from "{category" to "}"
app.post('/sites', function(req, res) {
  let tags = null;

  if (req.body.tags != null) {
    tags = req.body.tags;
  }

  if (tags != null) {
    Site.find(
      {
        category: {
          $in: tags, 
        },
        active: true 
      },
      function(err, site) {
        return res.json(site);
      }
    );
  } else {
    Site.find({active: true}, function (err, site) {
      return res.json(site);
    });
  }  
});

app.delete('/delete', function(req, res) {

  let name = req.query.name;

  console.log(name);

  if (name != null) {
    Site.updateOne(
      {
        name: name
      },
      {
        active: false
      },
      function(err, site) {
        return res.json(site);
      }
    );
  } else {
      res.status(400).json({message: "delete request missing name"});
  }  
});




// -----DON'T WORRY ABOUT IT----- // 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(5000);

module.exports = app;
