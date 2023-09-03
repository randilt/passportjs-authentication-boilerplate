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
  store: MongoStore.create({mongoUrl : '', collectionName: "sessions"}),mongodb+srv:// enter your MongoDB connection string as mongoUrl here example:(YOURUSERNAME:YOURPASSWORD@cluster0.test.mongodb.net/DBNAME?retryWrites=true&w=majority)
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

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already registered
    const existingUser = await UserModel.findOne({ username: username });

    if (existingUser) {
      // If a user with the same username already exists, send a response
      return res.status(400).render('register_username_exists.ejs');
    }

    // If the username is not registered, proceed with user registration
    const newUser = new UserModel({
      username: username,
      password: hashSync(password, 10),
    });

    await newUser.save();
    console.log('User registered:', newUser.username);
    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed');
  }
});


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
    res.render('home.ejs', {user: req.user});
  });

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
