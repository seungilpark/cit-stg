const mysql = require("./config/database");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const applicationRouter = require("./routes/applications");
const athletesRouter = require("./routes/athletes");
const clubsRouter = require("./routes/clubs");
const offersRouter = require("./routes/offers");
const profilesRouter = require("./routes/profiles");
const sportsRouter = require("./routes/sports");
const clubMgrRouter = require("./routes/clubMgrs");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname+"/routes/manual.html"));
});

app.use("/api/applications", applicationRouter);
app.use("/api/athletes", athletesRouter);
app.use("/api/athletes/delete", athletesRouter);
app.use("/api/clubs", clubsRouter);
app.use("/api/clubs/delete", clubsRouter);
<<<<<<< HEAD
=======

app.use("/api/clubMgrs", clubMgrRouter);

>>>>>>> a1d786215fdea3c75085f3b145d26f36431f90db
app.use("/api/offers", offersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/sports", sportsRouter);

app.all("/*", (req, res) => {
  res.sendFile(path.join(__dirname+"/routes/manual.html"));
});

app.listen(8080, () => console.log("server listening on port 8080"));

module.exports = app;
