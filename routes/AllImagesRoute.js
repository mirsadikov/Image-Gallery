const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { root, isValid } = require("../utils");
const { upload } = require("../services/multer");

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

    const toDelete = alldata.filter((image) => image.id == req.params.id);
    const filtered = alldata.filter((image) => image.id != req.params.id);

    // deleteting from db.json
    fs.writeFile(
      path.join(root, "database/db.json"),
      JSON.stringify(filtered),
      (err) => {
        if (err) res.render("all_images", { error: err.message });

        // deleting image file
        fs.unlink(path.join(root, "public", toDelete[0].path), (err) => {
          if (err) res.render("all_images", { error: err.message });
          res.redirect("/allimages?success=true");
        });
      }
    );
  });
});

// Updating image
router.post("/:id", (req, res) => {
  // multer upload function
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.render("details", { error: err }); // if error is by multer
    } else if (err) {
      res.render("details", { error: err }); // other error
    } else if (!isValid(req.body)) {
      // error if inputs are empty [title, description]
      // and delete image that uploaded just know which is not added yet in db.json
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
      // update without image file
      fs.readFile(path.join(root, "database/db.json"), (err, data) => {
        const alldata = JSON.parse(data);

        // update only db.json
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
      // update with newly inserted image file
      fs.readFile(path.join(root, "database/db.json"), (err, data) => {
        const alldata = JSON.parse(data);

        alldata.forEach((image) => {
          if (image.id == req.params.id) {
            // delete old image file from /public/images
            fs.unlink(path.join(root, "public", image.path), (err) => {
              if (err) res.render("details", { error: err.message });
            });
            image.title = req.body.title;
            image.path = `/images/${req.file.filename}`;
            image.description = req.body.description;
          }
        });

        // update db.json with new data
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
