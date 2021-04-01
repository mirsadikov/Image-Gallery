const multer = require("multer");
const path = require("path");
const { genereteUID, root } = require("../utils");

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

module.exports.upload = upload;
