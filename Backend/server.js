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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.get("/api", (req, res) => {
  res.send("manual should go here");
});
app.use("/api/applications", applicationRouter);
app.use("/api/athletes", athletesRouter);
app.use("/api/clubs", clubsRouter);
app.use("/api/offers", offersRouter);
app.use("/api/profiles", profilesRouter);

app.all("/*", (req, res) => {
  res.redirect("/api");
});

app.listen(8080, () => console.log("server listening on port 8080"));

module.exports = app;
