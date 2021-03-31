const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const { genereteUID, root, isValid } = require("../utils");
const path = require("path");

// Multer configuration
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(root, "public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${genereteUID()}.${file.mimetype.split("/")[1]}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image.", 400), false);
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: multerFilter,
}).single("image");

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
