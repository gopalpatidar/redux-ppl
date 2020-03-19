const express = require("express");
const app = express.Router();
const api = require("../api/api");
const multer = require("multer");
const upload = multer({
  dest: "/home/com114/Documents/reduxppl/ppl/frontend/public/uploads"
});
// const path = require('path');

// multer({
//   fileFilter: function (req, file, cb) {

//     var filetypes = /jpeg|jpg/;
//     var mimetype = filetypes.test(file.mimetype);
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb("Error: File upload only supports the following filetypes - " + filetypes);
//   }
// });

app.post("/header", upload.single("Image"), async function(req, res) {
  var obj = req.body;
  let temp = 0;
  try {
    var name = obj["Email"];
    var data = await api.checkuser(name);
  } catch (err) {
    res.send(false);
    temp = 1;
  }
  if (temp == 0) {
    try {
      obj.Image = req.file.filename;
      await api.adduser(obj);
      res.send(true);
    } catch (err) {
      res.send(false);
    }
  }
});

app.post("/login", async function(req, res) {
  try {
    var obj = req.body;
    var name = obj["Email"];
    var pass = obj["Password"];
    var data = await api.showuser(name, pass);
    res.send(data);
    // res.send(str)
  } catch (err) {
    res.send("false");
  }
});

app.post("/check", async function(req, res) {
  try {
    var obj = req.body;
    obj = obj["Email"];
    var data = await api.checkusers(obj);
    res.send(true);
    // res.send(str)
  } catch (err) {
    res.send(false);
  }
});
module.exports = app;
