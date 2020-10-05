module.exports = function (app, db) {
  app
    .route("/api/exercises/")

    .post((req, res) => {
      const exercise = req.body.exercise;
      db.collection("exercises").insertOne(exercise, (err, data) => {
        if (err) res.json(`could not update: ${err}`);
        console.log(data.ops);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      db.collection("exercises")
        .find({})
        .toArray((err, exercises) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const exercisesArray = exercises.map((entry) => {
            let exercise = {
              id: entry["id"],
              name: entry["name"],
              type: entry["type"],
              description: entry["description"],
            };
            return exercise;
          });
          res.json(exercisesArray);
        });
    });

  app
    .route("/api/exercises/:id")

    .post(function (req, res) {
      const exerciseId = req.params.id;
      const exercise = req.body.exercise;
      db.collection("exercises").findOneAndUpdate(
        { id: exerciseId },
        {
          $set: {
            name: exercise.name,
            description: exercise.description,
            type: exercise.type,
          },
        },
        { returnNewDocument: true },
        (err, data) => {
          if (err) res.json(`could not update ${exerciseId} ${err}`);
          res.json(data);
        }
      );
    })

    .delete(function (req, res) {
      const exerciseId = req.params.id;
      db.collection("exercises").findOneAndDelete(
        { id: exerciseId },
        (err, data) => {
          if (err) {
            res.json(`could not delete ${exerciseId} ${err}`);
          } else {
            data.value
              ? res.json(`delete successful`)
              : res.json(`no exercise exists`);
          }
        }
      );
    });
};
