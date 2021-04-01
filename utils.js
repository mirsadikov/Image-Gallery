const path = require("path");

// Unique Id generator
module.exports.genereteUID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// getting root folder -- for fs module
module.exports.root = path.dirname(
  require.main.filename || process.require.main.filename
);

// checking inputs when creating and updating
module.exports.isValid = function (data) {
  if (data.title.trim() === "" || data.description.trim() === "") {
    return false;
  } else {
    return true;
  }
};
