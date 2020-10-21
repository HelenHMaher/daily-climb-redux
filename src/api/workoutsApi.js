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
              date: entry["date"],
              exercises: entry["exercises"],
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
            date: workout.date,
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
  app
    .route("/api/workouts/:id/instance")

    .put(function (req, res) {
      const workoutId = req.params.id;
      const instance = req.body.instance;
      db.collection("workouts").findOneAndUpdate(
        { id: workoutId },
        { $push: { exercises: instance } },
        { returnNewDocument: true },
        (err, data) => {
          if (err)
            res.json(`could not add exercise instance to ${workoutId} ${err}`);
          res.json(data);
        }
      );
    });

  app
    .route("/api/workouts/:workoutId/instance/:instanceId")

    .post(function (req, res) {
      const workoutId = req.params.workoutId;
      const instanceId = req.params.instanceId;
      const deleteInstance = req.body.delete;
      const notes = req.body.notes;
      if (deleteInstance) {
        db.collection("workouts").findOneAndUpdate(
          { id: workoutId },
          { $pull: { exercises: { id: instanceId } } },
          (err, data) => {
            if (err)
              res.json(
                `could not delete exercise instance in ${workoutId} ${err}`
              );
            console.log(`deleted: ${instanceId}`);
            res.json(data);
          }
        );
      } else {
        db.collection("workouts").findOneAndUpdate(
          { id: workoutId },
          { $set: { "exercises.$[element].notes": notes } },
          { arrayFilters: [{ "element.id": instanceId }] },
          (err, data) => {
            if (err)
              res.json(
                `could not update exercise instance in ${workoutId} ${err}`
              );
            console.log(`updated: ${notes}`);
            res.json(data);
          }
        );
      }
    });
};
