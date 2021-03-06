'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/User');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password'
  },
  function(userid, password, done) {
    User.findOne({ userid: userid }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          'errors': {
            'userid': { type: 'User is not registered.' }
          }
        });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, {
          'errors': {
            'password': { type: 'Userid or Password is incorrect.' }
          }
        });
      }
      console.log(user);
      return done(null, user);
    });
  }
));