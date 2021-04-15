var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port=5000||process.env.PORT;
var session = require('express-session');
require('dotenv').config();

const bodyParser = require('body-parser')
const landingRouter  = require('./routes/landing')
const loginRouter  = require("./routes/user-login")
const structureDb = require('./routes/createTable')
const dashboardRouter = require('./routes/dashboard')
const signupRouter = require('./routes/user-signup');
const memberRouter = require('./routes/member')
const donorRouter = require('./routes/donor')
const ngoListRouter = require('./routes/ngo-list');
const profileRouter  = require('./routes/profile');
const dashboardNgo = require('./routes/dashboard-ngo');
const ngoRouter = require('./routes/ngo');
const donorUser = require('./routes/donor-user')
const ngologinRouter = require('./routes/ngo-login')
const ngoRegister = require('./routes/ngo-signup');
const ngoJoin = require('./routes/ngoJoinForm');
const contactRouter = require('./routes/contact');
const ngoProfile = require('./routes/ngo-profile');
const userDonations = require('./routes/donate-user');
const thankyouRouter = require('./routes/success');
const addMemberRouter = require('./routes/add-member');
const dbGenerate = require('./routes/db');
const topDonorRouter = require('./routes/topdonor');
const ngoDetails = require('./routes/ngo-details');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
//* This line is necessary when sending data through content-type: application/json 
app.use(express.json());
// app.use(express.static(path.join(__dirname + '/../public')));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(session({
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true
 }));

// app.use('/', registrationRouter);
// app.use('/', dashboardRouter);
app.use('/',landingRouter)
app.use('/login',loginRouter);
app.use('/form',structureDb);
app.use('/dashboard-user',dashboardRouter);
app.use("/signup",signupRouter);
app.use("/members",memberRouter);
app.use('/donors',donorRouter);
app.use('/ngo-list',ngoListRouter)
app.use('/profile',profileRouter);
app.use('/dashboard-ngo',dashboardNgo);
app.use('/ngo',ngoRouter);
app.use('/donor-user',donorUser);
app.use('/ngo-login',ngologinRouter);
app.use('/ngo-signup',ngoRegister);
app.use('/dashboard/ngo-list/form',ngoJoin);
app.use('/contact',contactRouter);
app.use('/ngo-profile',ngoProfile);
app.use('/donations',userDonations);
app.use('/success',thankyouRouter);
app.use('/add-member',addMemberRouter);
app.use('/db', dbGenerate);
app.use('/dashboard/ngo-list/ngo', ngoDetails);
app.use('/top-donors', topDonorRouter);

app.get('/ngo',(req,res)=>{
   res.render('./dashboard/ngo',{});
})

app.get('/donate',(req,res)=>{
  res.render('./dashboard/donate',{});
})

// app.use(function(req, res, next) {
//   next(createError(404));
// });
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port,(req,res)=>{
  console.log("Server is running");
})

module.exports = app;
