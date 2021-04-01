const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const { genereteUID, root, isValid } = require("../utils");
const path = require("path");
const { upload } = require("../services/multer");

router
  .route("/")
  .get((req, res) => {
    res.render("create");
  })
  .post((req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.render("create", { error: err });
      } else if (err) {
        res.render("create", { error: err });
      } else if (req.file == undefined) {
        res.render("create", { error: "Error, upload image file!" });
      } else if (!isValid(req.body)) {
        fs.unlink(
          path.join(root, "public/images", req.file.filename),
          (err) => {
            if (err) res.render("create", { error: err.message });
          }
        );
        res.render("create", { error: "Error, enter description or title!" });
      } else {
        var newdata = {
          id: genereteUID(),
          title: req.body.title,
          path: `/images/${req.file.filename}`,
          description: req.body.description,
          time: new Date().getTime(),
        };

        fs.readFile(path.join(root, "database/db.json"), (err, data) => {
          const alldata = JSON.parse(data);
          alldata.push(newdata);
          fs.writeFile(
            path.join(root, "database/db.json"),
            JSON.stringify(alldata),
            (err) => {
              if (err) throw new Error();
            }
          );
        });

        // Everything went fine.
        res.render("create", { success: true });
      }
    });
  });

module.exports = router;
