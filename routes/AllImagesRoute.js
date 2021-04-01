const express = require("express");
const router = express.Router();
const fs = require("fs");
const { root, isValid, genereteUID } = require("../utils");
const path = require("path");
const { upload } = require("../services/multer");
const multer = require("multer");

// Getting all images
router.get("/", (req, res) => {
  var success = req.url.split("success=")[1];
  res.render("all_images", { success: success });
});

// Getting image details
router.get("/:id", (req, res) => {
  res.render("details");
});

// Deleting image
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

// Updating image
router.post("/:id", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.render("details", { error: err });
    } else if (err) {
      res.render("details", { error: err });
    } else if (!isValid(req.body)) {
      if (req.file) {
        fs.unlink(
          path.join(root, "public/images", req.file.filename),
          (err) => {
            if (err) res.render("details", { error: err.message });
          }
        );
      }
      res.render("details", { error: "Error, enter description or title!" });
    } else if (req.file == undefined) {
      fs.readFile(path.join(root, "database/db.json"), (err, data) => {
        const alldata = JSON.parse(data);

        alldata.forEach((image) => {
          if (image.id == req.params.id) {
            image.title = req.body.title;
            image.description = req.body.description;
          }
        });
        fs.writeFile(
          path.join(root, "database/db.json"),
          JSON.stringify(alldata),
          (err) => {
            if (err) throw new Error();
          }
        );
      });

      // Everything went fine.
      res.render("details", { success: true });
    } else {
      fs.readFile(path.join(root, "database/db.json"), (err, data) => {
        const alldata = JSON.parse(data);

        alldata.forEach((image) => {
          if (image.id == req.params.id) {
            fs.unlink(path.join(root, "public", image.path), (err) => {
              if (err) res.render("details", { error: err.message });
            });
            image.title = req.body.title;
            image.path = `/images/${req.file.filename}`;
            image.description = req.body.description;
          }
        });
        fs.writeFile(
          path.join(root, "database/db.json"),
          JSON.stringify(alldata),
          (err) => {
            if (err) throw new Error();
          }
        );
      });

      // Everything went fine.
      res.render("details", { success: true });
    }
  });
});

module.exports = router;
