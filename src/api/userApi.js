const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = function (app, db) {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("logged in");
    } else {
      console.log("not logged in");
      res.redirect("/");
    }
  }

  app.post(
    "/api/users/authenticate/",
    passport.authenticate("local", function (req, res) {
      console.log("you are here");
      res.json({ username: res.user.username });
    })
  );

  app.post("/api/users/register/", function (req, res) {
    db.collection("profiles").findOne(
      { username: req.body.user.username },
      (err, user) => {
        if (err) {
          console.log("error: " + err);
        } else if (user) {
          console.log("username has already been taken");
          res.json(user.username);
        } else {
          bcrypt.hash(req.body.user.password, 12, (err, hash) => {
            db.collection("profiles").insertOne(
              {
                userId: req.body.user.userId,
                username: req.body.user.username,
                password: hash,
              },
              (err, user) => {
                if (err) {
                  res.redirect("/");
                } else {
                  console.log(
                    "new user " + req.body.user.username + " logged in"
                  );
                  res.redirect("/");
                }
              }
            );
          });
        }
      }
    );
  });

  app.get("/api/users/:username", function (req, res) {
    db.collection("profiles").findOne(
      { username: req.params.username },
      (err, data) => {
        if (err) {
          res.json(`could not get ${req.params.username} ${err}`);
        } else {
          res.json(data);
        }
      }
    );
  });
};
