module.exports = function (app, db) {
  app
    .route("/api/users/")

    .post((req, res) => {
      const user = req.body.user;
      db.collection("users").insertOne(user, (err, data) => {
        if (err) res.json(`could not update: ${err}`);
        console.log(data.ops);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      const user = req.body.userId;
      db.collection("users")
        .find({ id: user })
        .toArray((err, users) => {
          if (err) return res.json(`could not find entries: ${err}`);
          res.json(users);
        });
    });
};
