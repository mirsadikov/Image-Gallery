const epxress = require("express");

// locals
const createRoute = require("./routes/CreateRoute");
const allImagesRoute = require("./routes/AllImagesRoute");
const API = require("./routes/API");

// constants
const PORT = process.env.PORT || 3000;
const app = epxress();

// express config
app.use(epxress.static("public"));
app.use(epxress.urlencoded({ extended: false }));
app.use(epxress.json());
app.set("view engine", "pug");

// Routes and links
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/create", createRoute);
app.use("/allimages", allImagesRoute);
app.use("/api/v1/allimages", API);
app.get("/about", (req, res) => {
  res.render("about");
});

// listening the app
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App is listening on port ${PORT} at http://localhost:${PORT}`);
});
