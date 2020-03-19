const express = require("express");
const app = express.Router();
const apiPost = require("../api/apipost");
const multer = require("multer");
const upload = multer({
  dest: "/home/com114/Documents/reduxppl/ppl/frontend/public/uploads"
});

app.post("/post", upload.single("Post"), async function(req, res) {
  var obj = req.body;
  let temp = 0;
  try {
    obj.Post = req.file.filename;
    var d = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    obj.Date =
      d.getDate() +
      " " +
      months[d.getMonth()] +
      " " +
      d.getFullYear() +
      "    " +
      d.getHours() +
      ":" +
      d.getMinutes();
    obj.likes = [];
    obj.comments = [];
    await apiPost.userpost(obj);
    res.send(true);
  } catch (err) {
    res.send(false);
  }
});

app.post("/showpost", async function(req, res) {
  try {
    var data = await apiPost.showpost();
    res.send(data);
    // res.send(str)
  } catch (err) {
    res.send("false");
  }
});

app.post("/likepost", async function(req, res) {
  try {
    await apiPost.likepost(req.body);
    var data = await apiPost.showlikes(req.body);
    let likes = { like: data[0].likes.length };
    res.send(likes);
  } catch (err) {
    res.send("false");
  }
});
module.exports = app;
