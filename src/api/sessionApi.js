const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, db) {
  app
    .route("/api/session/")

    .post((req, res) => {
      if (!req.body.date) return res.json("please submit a date");
      if (!req.body.type) return res.json("please select climbing or dryland");
      if (!req.body.title) return res.json("please submit a title");
      const workout = {
        type: req.body.type,
        date: req.body.date,
        title: req.body.title,
        num_of_exercises: 0,
        exercises: [],
      };
      db.collection("session").insertOne(workout, (err, doc) => {
        if (err) res.json(`could not update: ${err}`);
        const entry = {
          _id: doc.insertedId,
          type: workout.type,
          date: workout.date,
          title: workout.title,
        };
        console.log(entry);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      db.collection("session")
        .find({})
        .toArray((err, workouts) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const workoutsArray = workouts.map((entry) => {
            let workout = {
              _id: entry._id,
              type: entry.type,
              date: entry.date,
              title: entry.title,
              exercise_count: entry.num_of_exercises,
            };
            return workout;
          });
          res.json(workoutsArray);
        });
    })

    .delete((req, res) => {
      db.collection("session").deleteMany({}, (err, data) => {
        if (err) res.json(`could not delete: ${err}`);
        res.json("complete delete successful");
      });
    });

  app
    .route("/api/session/:id")

    .get(function (req, res) {
      const workoutId = req.params.id;
      db.collection("session")
        .find({ _id: new ObjectId(workoutId) })
        .toArray((err, data) => {
          if (err) res.json(`could not find ${workoutId} ${err}`);
          if (data[0]) {
            const workout = {
              _id: data[0]._id,
              title: data[0].workout_title,
              comments: data[0].comments,
            };
            res.json(workout);
          } else {
            console.log(workoutId);
            res.json(`no workout exists`);
          }
        });
    })

    .post(function (req, res) {
      const workoutId = req.params.id;
      const comment = req.body.comment;
      db.collection("session").findAndModify(
        { _id: new ObjectId(workoutId) },
        {},
        { $inc: { num_of_comments: 1 }, $push: { comments: comment } },
        { new: true, upsert: false },
        (err, data) => {
          if (err) res.json(`could not update ${workoutId} ${err}`);
          const workout = {
            _id: data.value._id,
            title: data.value.workout_title,
            comments: data.value.comments,
          };
          res.json(workout);
        }
      );
    })

    .delete(function (req, res) {
      const workoutId = req.params.id;
      db.collection("session").findOneAndDelete(
        { _id: new ObjectId(workoutId) },
        (err, doc) => {
          if (err) {
            res.send(`could not delete ${workoutId} ${err}`);
          } else {
            doc.value
              ? res.json(`delete successful`)
              : res.json(`no workout exists`);
          }
        }
      );
    });
};
