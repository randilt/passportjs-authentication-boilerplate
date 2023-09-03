const { hashSync } = require('bcrypt');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();
const UserModel = require('./config/database');

const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl : 'mongodb+srv://randil:randil@cluster0.xrp7coq.mongodb.net/passport?retryWrites=true&w=majority', collectionName: "sessions"}),
  cookie: { 
    maxAge : 1000 * 60 * 60 *24
   }
}))

require('./config/passport');

app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req,res) => {
    res.render("login.ejs")
    
})
app.get('/register', (req,res) => {
    res.render("register.ejs")
})
app.post('/login', passport.authenticate('local', {successRedirect: '/home'}))

app.post('/register', (req,res) => {
    let user = new UserModel({
        username : req.body.username,
        password : hashSync(req.body.password, 10),

    })
    user.save().then(user=> console.log(user));
    res.send("{success:true}")
})
app.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error logging out');
      }
      // Redirect or respond as needed after logout
      res.redirect('/login'); // Example: Redirect to the home page
    });
  });
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // If the user is authenticated, continue to the next middleware
      return next();
    }
    // If the user is not authenticated, redirect to the login page
    res.redirect('/login');
  }
  app.get('/home', ensureAuthenticated, (req, res) => {
    console.log(req.session);
    console.log(req.user);
    res.render('home.ejs');
  });

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
