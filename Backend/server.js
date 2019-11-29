const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const applicationRouter = require("./routes/applications");
const athletesRouter = require("./routes/athletes");
const athletesLikesRouter = require("./routes/athlLikes")
const clubsRouter = require("./routes/clubs");
const offersRouter = require("./routes/offers");
const profilesRouter = require("./routes/profiles");
const sportsRouter = require("./routes/sports");
const clubMgrRouter = require("./routes/clubMgrs");
const athlLikesRouter = require("./routes/athlLikes");
const clubLikesRouter = require("./routes/clubLikes");
const recommendationsRouters = require("./routes/recommendations");
const matchedRouter = require("./routes/matched");

const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/applications", applicationRouter);
app.use("/api/athletes", athletesRouter);
app.use("/api/athletes", athletesLikesRouter);
app.use("/api/athlLikes", athlLikesRouter);
app.use("/api/clubLikes", clubLikesRouter);

app.use("/api/clubs", clubsRouter);
app.use("/api/clubMgrs", clubMgrRouter);
app.use("/api/offers", offersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/recommendations", recommendationsRouters)
app.use("/api/matched", matchedRouter)



app.all("/*", (req, res) => {
  res.sendFile(path.join(__dirname+"/routes/manual.html"));
});

app.listen(8080, () => console.log("server listening on port 8080"));

module.exports = app;
