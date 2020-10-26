const express = require("express");
const session = require("express-session");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;

const typesApi = require("./src/api/typesApi");
const workoutsApi = require("./src/api/workoutsApi");
const exercisesApi = require("./src/api/exercisesApi");
const userApi = require("./src/api/userApi");
const auth = require("./src/api/auth");

//user id token json web token

mongo.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true },
  (err, client) => {
    let db = client.db("my-daily-climb");
    if (err) {
      console.log("Database err: " + err);
    } else {
      console.group("Successful database connection");

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use(favicon(__dirname + "/build/favicon.png"));
      app.get("/heartbeat", function (req, res) {
        res.send("<3");
      });

      app.use("/", express.static(__dirname + "/build"));

      app.get("/", function (req, res, next) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
      });

      app.use(
        session({
          secret: "Here by my session and it is DOPE REALLY THE DOPE TRAIN",
          resave: false,
          saveUninitialized: false,
        })
      );

      /*app.use(passport.initialize());
      app.use(passport.session());

      passport.serializeUser(function (user, done) {
        console.log("serialize User");
        console.log(user);
        done(null, user.userId);
      });

      passport.deserializeUser(function (id, done) {
        db.collection("profiles").findOne({ userId: id }, (err, user) => {
          console.log("deserialize user");
          done(err, user);
        });
      });

      passport.use(
        new LocalStrategy((username, password, done) => {
          db.collection("profiles").findOne(
            { username: username },
            (err, user) => {
              if (err) {
                console.log(
                  "User " + username + " attempted to log in (error)."
                );
                return done(err);
              }
              if (!user) {
                console.log(
                  "unknown user " + username + " attempted to log in."
                );
                return done(null, false);
              }
              if (!bcrypt.compareSync(password, user.password)) {
                console.log(
                  "User " +
                    username +
                    " attempted to log in (invalid password)."
                );
                return done(null, false);
              }
              console.log("User " + username + " logged in.");
              return done(null, user);
            }
          );
        })
      );

      app.post(
        "/api/users/authenticate/",
        passport.authenticate("local", function (req, res) {
          console.log("you are here");
          console.log(`req: ${req} res:${res}`);
          res.json(req.user);
        })
      );*/

      auth(app, db);
      userApi(app, db);

      typesApi(app, db);
      workoutsApi(app, db);
      exercisesApi(app, db);

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
