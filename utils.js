const path = require("path");

module.exports.genereteUID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

module.exports.root = path.dirname(
  require.main.filename || process.require.main.filename
);

module.exports.isValid = function (data) {
  if (data.title.trim() === "" || data.description.trim() === "") {
    return false;
  } else {
    return true;
  }
};
