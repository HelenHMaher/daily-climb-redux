const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, db) {
  app
    .route("/api/workouts/")

    .post((req, res) => {
      const workout = req.body.workout;
      db.collection("workouts").insertOne(workout, (err, data) => {
        if (err) res.json(`could not update: ${err}`);
        console.log(data.ops);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      db.collection("workouts")
        .find({})
        .toArray((err, workouts) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const workoutsArray = workouts.map((entry) => {
            let workout = {
              id: entry["_id"],
              name: entry["name"],
              type: entry["type"],
              description: entry["description"],
            };
            return workout;
          });
          res.json(workoutsArray);
        });
    });
};
