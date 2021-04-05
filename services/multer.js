const multer = require("multer");
const path = require("path");
const { genereteUID, root } = require("../utils");

// Multer configuration
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(root, "public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${genereteUID()}${path.extname(file.originalname)}`);
  },
});

const multerFilter = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  console.log(file);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Not an image! Please upload an image.");
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: function (req, file, cb) {
    multerFilter(file, cb);
  },
}).single("image");

module.exports.upload = upload;
