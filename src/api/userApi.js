const User = require("../models/user");
const passport = require("passport");

module.exports = function (app, db) {
  app
    .route("/api/users/register/")

    .post((req, res) => {
      const newUser = new User({
        username: req.body.user.username,
        userId: req.body.user.userId,
      });
      User.register(newUser, req.body.user.password, function (err, user) {
        if (err) {
          console.log("ERROR", err.message);
          return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
          res.redirect(`/users/${newUser.userId}`);
        });
      });
    })

    .route("/api/users/login/")

    .post((req, res) => {
      passport.authenticate("local", {
        successRedirect: `/users/${req.body.user.userId}`,
        failureRedirect: "/users/login",
      });
    })

    .route("/api/users/:userId")

    .get((req, res) => {});
};
