const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, db) {
  app
    .route("/api/workoutTypes/")

    .post((req, res) => {
      const workoutType = {
        workoutType: req.body.name,
      };
      db.collection("workoutTypes").insertOne(workoutType, (err, doc) => {
        if (err) res.json(`could not update: ${err}`);
        const entry = {
          _id: doc.insertedId,
          name: workoutType.workoutType.name,
        };
        console.log(entry);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      db.collection("workoutTypes")
        .find({})
        .toArray((err, workoutTypes) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const workoutTypesArray = workoutTypes.map((entry) => {
            let type = {
              _id: entry._id,
              name: entry.workoutType.name,
            };
            return type;
          });
          res.json(workoutTypesArray);
        });
    });

  app
    .route("/api/workoutTypes/:id")

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
