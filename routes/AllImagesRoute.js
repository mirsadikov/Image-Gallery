const express = require("express");
const router = express.Router();
const fs = require("fs");
const { root } = require("../utils");
const path = require("path");

router.get("/", (req, res) => {
  var success = req.url.split("success=")[1];
  res.render("all_images", { success: success });
});

router.get("/:id", (req, res) => {
  res.render("details");
});

router.get("/:id/delete", (req, res) => {
  fs.readFile(path.join(root, "database/db.json"), "utf8", (err, data) => {
    if (err) res.render("all_images", { error: err.message });

    var alldata = JSON.parse(data);

    const current = alldata.filter((image) => image.id == req.params.id);
    const filtered = alldata.filter((image) => image.id != req.params.id);

    fs.writeFile(
      path.join(root, "database/db.json"),
      JSON.stringify(filtered),
      (err) => {
        if (err) res.render("all_images", { error: err.message });

        fs.unlink(path.join(root, "public", current[0].path), (err) => {
          if (err) res.render("all_images", { error: err.message });
          res.redirect("/allimages?success=true");
        });
      }
    );
  });
});

module.exports = router;
