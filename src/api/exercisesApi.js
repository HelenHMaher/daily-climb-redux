module.exports = function (app, db) {
  app
    .route("/api/exercises/")

    .put((req, res) => {
      const exercise = req.body.exercise;
      db.collection("workouts").findOneAndUpdate(
        { id: workoutId },
        {
          $,
        }
      );
    });
};
