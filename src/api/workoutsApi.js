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
              id: entry["id"],
              name: entry["name"],
              type: entry["type"],
              description: entry["description"],
            };
            return workout;
          });
          res.json(workoutsArray);
        });
    });

  app
    .route("/api/workouts/:id")

    .post(function (req, res) {
      const workoutId = req.params.id;
      const workout = req.body.workout;
      db.collection("workouts").findOneAndUpdate(
        { id: workoutId },
        {
          $set: {
            name: workout.name,
            description: workout.description,
            type: workout.type,
          },
        },
        { returnNewDocument: true },
        (err, data) => {
          if (err) res.json(`could not update ${workoutId} ${err}`);
          res.json(data);
        }
      );
    })

    .delete(function (req, res) {
      const workoutId = req.params.id;
      db.collection("workouts").findOneAndDelete(
        { id: workoutId },
        (err, data) => {
          if (err) {
            res.json(`could not delete ${workoutId} ${err}`);
          } else {
            data.value
              ? res.json(`delete successful`)
              : res.json(`no workout exists`);
          }
        }
      );
    });
};
