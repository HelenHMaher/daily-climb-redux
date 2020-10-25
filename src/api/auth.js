const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.collection("profiles").findOne({ userId: id }, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      db.collection("profiles").findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("User " + username + " attempted to log in (error).");
          return done(err);
        }
        if (!user) {
          console.log("unknown user " + username + " attempted to log in.");
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log(
            "User " + username + " attempted to log in (invalid password)."
          );
          return done(null, false);
        }
        console.log("User " + username + " logged in.");
        return done(null, user);
      });
    })
  );
};
