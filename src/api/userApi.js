const User = require("../models/user");
const passport = require("passport");

module.exports = function (app, db) {
  app
    .route("/api/users/register/")

    .post((req, res) => {
      const newUser = new User({
        username: req.body.user.username,
      });
      User.register(newUser, req.body.user.password, function (err, user) {
        if (err) {
          console.log("ERROR", err.message);
          return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
          res.redirect(`/`);
        });
      });
    });
  /*
    .route("/api/users/login/")

    .post((req, res) => {
      const userId = req.body.user.userId;
      passport.authenticate("local")(req, res, function () {
        res.redirect(`/users/${userId}`);
      });
    })

    .route("/api/users/:userId")

    .get((req, res) => {});
    */
};
