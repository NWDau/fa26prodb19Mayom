require('dotenv').config();
const mongoose = require('mongoose');

console.log("MONGO_CON loaded: ", Boolean(process.env.MONGO_CON));

mongoose.connect(process.env.MONGO_CON);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', async function () {
  console.log('Connected to MongoDB Atlas!');

  let reseed = true;

  if(reseed){
    await recreateDB();
  }

});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var Juice = require("./models/juice");

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const Account = require('./models/account');
      const user = await Account.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }
));

async function recreateDB(){

  await Juice.deleteMany();

  let instance1 = new Juice({
    flavor: "Orange",
    volume: 500,
    sugarContent: 22,
    brand: "Tropicana"
  });

  let instance2 = new Juice({
    flavor: "Apple",
    volume: 350,
    sugarContent: 18,
    brand: "Mott's"
  });

  let instance3 = new Juice({
    flavor: "Grape",
    volume: 1000,
    sugarContent: 36,
    brand: "Welch's"
  });

  await instance1.save();
  console.log("First object saved");

  await instance2.save();
  console.log("Second object saved");

  await instance3.save();
  console.log("Third object saved");
}




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var juiceRouter = require('./routes/juice');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/juices', juiceRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
