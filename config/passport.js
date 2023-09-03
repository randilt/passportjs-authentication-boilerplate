const { compareSync } = require('bcrypt');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserModel = require('./database');

passport.use(
  new LocalStrategy(async function(username, password, done) {
    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      // Validate the password using bcrypt
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      return done(null, user); // User is valid
    } catch (err) {
      return done(err);
    }
  })
);

// Persist user data inside the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
