const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, db) {
  app
    .route("/api/workoutTypes/")

    .post((req, res) => {
      const workoutType = req.body.workoutType;
      db.collection("workoutTypes").insertOne(workoutType, (err, data) => {
        if (err) res.json(`could not update: ${err}`);
        console.log(data.ops);
        res.redirect("/");
      });
    })

    .get((req, res) => {
      db.collection("workoutTypes")
        .find({})
        .toArray((err, workoutTypes) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const workoutTypesArray = workoutTypes.map((entry) => {
            let description = entry["description"];
            let type = {
              id: entry["_id"],
              name: entry["name"],
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
      const workoutType = req.body.workoutType;
      db.collection("workoutTypes").findOneAndUpdate(
        { _id: new ObjectId(workoutId) },
        {
          $set: {
            name: workoutType.name,
            description: workoutType.description,
          },
        },
        {
          returnNewDocument: true,
        },
        (err, data) => {
          if (err) res.json(`could not update ${workoutId} ${err}`);
          res.json(data);
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
