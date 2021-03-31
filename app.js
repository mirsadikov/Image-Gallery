const epxress = require("express");

const createRoute = require("./routes/CreateRoute");
const allImagesRoute = require("./routes/AllImagesRoute");
const API = require("./routes/API");

const PORT = 3000 || process.env.PORT;
const app = epxress();

// express config
app.use(epxress.static("public"));
app.use(epxress.urlencoded({ extended: false }));
app.use(epxress.json());
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/create", createRoute);
app.use("/allimages", allImagesRoute);
app.use("/api/v1/allimages", API);
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`);
});
