const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, db) {
  app
    .route("/api/workoutTypes/")

    .post((req, res) => {
      const workoutType = {
        workoutType: req.body.workoutType,
      };
      db.collection("workoutTypes").insertOne(workoutType, (err, doc) => {
        if (err) res.json(`could not update: ${err}`);
        const entry = {
          _id: doc.insertedId,
          name: workoutType.workoutType.name,
          description: workoutType.workoutType.description,
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
            let description = entry["workoutType"]["description"];
            let type = {
              id: entry["_id"],
              name: entry["workoutType"]["name"],
              description: description ? description : "",
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
      const workoutType = { workoutType: req.body.workoutType };
      db.collection("workoutTypes").findAndModify(
        { _id: new ObjectId(workoutId) },
        {},
        { new: true, upsert: false },
        (err, data) => {
          if (err) res.json(`could not update ${workoutId} ${err}`);
          const entry = {
            name: workoutType.workoutType.name,
            description: workoutType.workoutType.description,
          };
          res.json(entry);
        }
      );
    })

    .delete(function (req, res) {
      const workoutId = req.params.id;
      db.collection("workoutTypes").findOneAndDelete(
        { _id: new ObjectId(workoutId) },
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
