const express = require("express");
const router = express.Router();
const path = require("path");
const { root } = require("../utils");
const fs = require("fs");

// get all
router.get("/", (req, res) => {
  fs.readFile(path.join(root, "database/db.json"), (err, data) => {
    if (err) throw new Error();
    var alldata = JSON.parse(data);
    res.send(alldata);
  });
});

// get one by id
router.get("/:id", (req, res) => {
  fs.readFile(path.join(root, "database/db.json"), (err, data) => {
    if (err) throw new Error();
    var id = req.params.id;
    var alldata = JSON.parse(data);
    var current = alldata.filter((one) => one.id == id);
    res.send(current);
  });
});

module.exports = router;
