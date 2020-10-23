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
    "/api/users/login/",
    passport.authenticate("local", function (req, res) {
      db.collection("profiles").findOne({ userId: req.params.userId });
    })
  );

  app.post(
    "/api/users/register/",
    function (req, res, next) {
      db.collection("profiles").findOne(
        { username: req.body.user.username },
        (err, user) => {
          if (err) {
            next(err);
          } else if (user) {
            console.log("username has already been taken");
            res.redirect("/");
          } else {
            const hash = bcrypt.hashSync(req.body.user.password, 12);
            db.collection("profiles").insertOne(
              {
                userId: req.body.user.userId,
                username: req.body.user.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.redirect("/");
                } else {
                  console.log(
                    "new user " + req.body.user.username + " logged in"
                  );
                  next(null, user);
                }
              }
            );
          }
        }
      );
    },
    passport.authenticate("local"),
    function (req, res) {
      console.log(req.user.userId);
    }
  );
  app.get("/api/users/:userId", passport.authenticate("local"), function (
    req,
    res
  ) {
    db.collection("profiles").findOne(
      { userId: req.params.userId },
      { password: 0, _id: 0 }
    );
  });
};
