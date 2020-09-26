const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;

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

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
