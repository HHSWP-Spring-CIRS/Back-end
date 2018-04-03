// /routes/api/Comment.js

const express = require("express");
const router = express.Router();
const db = require("../../database");
// Notice: No need to require body-parser here! (This is JavaScript, not
// Java, nor React)

/** http://localhost/api/comment , with GET**/
router.get("/", function(req, res) {
  db
    .select()
    .from("Comment")
    .then(data => {
      res.status(200);
      res.send(data);
    });
});

/** http://localhost/api/comment , with POST !!!**/
router.post("/", function(req, res) {
  // Just a start of err handling for model for you
  if (req.body.memberId && req.body.ideaId && req.body.commentLine) {
    // Front-end has to send a Comment as JSON
    // {"memberid":"301","ideaId":"202","commentLine":"sometextHere"} in request body
    db
      .insert(req.body)
      .returning("*")
      .into("Comment")
      .then(data => {
        res.status(200);
        res.send(data); // [17] if that was the auto_incement id
        // or [17,18,19] if multiple inserts were done. valid json.org
      })
      .catch(error => {
        res.status(409); // Just a start of err handling for model for you
        console.error(error);
        res.end(JSON.stringify({ error: "catastrophy" }));
      });
  } else {
    res.status(400); // Just a start of err handling for model for yo
    res.end(JSON.stringify({ error: "horror" }));
  }
});

/** http://localhost/api/comment/multiInsert , with MULTI-JSON POST !!!**/
router.post("/multiInsert/", function(req, res) {
  // Just a start of err handling for model for you

  // Front-end has to send a Comment as JSON
  // [{"memberid":"301","ideaId":"202","commentLine":"sometextHere"},
  //{"firstName":"Joe","lastName":"Doe"}]
  // in request body
  db
    .insert(req.body)
    .returning("*")
    .into("Comment")
    .then(data => {
      res.status(200);
      res.send(data); // [17] if that was the auto_incement id
      // or [17,18,19] if multiple inserts were done. valid json.org
    })
    .catch(error => {
      res.status(409); // Just a start of err handling for model for you
      console.error(error);
      res.end(JSON.stringify({ error: "catastrophy" }));
    });
});

module.exports = router;
