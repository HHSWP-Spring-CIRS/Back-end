// /routes/api/Idea.js

const express = require("express");
const router = express.Router();
const db = require("../../database");
// Notice: No need to require body-parser here! (This is JavaScript, not
// Java, nor React)

/** http://localhost/api/idea , with GET**/
router.get("/", function(req, res) {
  db
    .select()
    .from("Idea")
    .then(data => {
      res.status(200);
      res.send(data);
    });
});

/** http://localhost/api/idea , with POST !!!**/
router.post("/", function(req, res) {
  // Just a start of err handling for model for you
  if (
    req.body.title &&
    req.body.description &&
    req.body.budget &&
    req.body.peopleNeeded &&
    req.body.categoryId
  ) {
    // Front-end has to send a Idea as JSON
    // {"title":"Sometitle","description":"some long description","budget":"123",
    // "peopleNeeded":"123","categoryId:101} in request body
    db
      .insert(req.body)
      .returning("*")
      .into("Idea")
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
    res.status(400); // Just a start of err handling for model for you
    res.end(JSON.stringify({ error: "horror" }));
  }
});

/** http://localhost/api/idea , with MULTI-JSON POST !!!**/
router.post("/multiInsert/", function(req, res) {
  // Just a start of err handling for model for you

  // Front-end has to send a Idea as JSON
  // [{"title":"Sometitle","description":"some long description","budget":"123",
  // "peopleNeeded":"123","categoryId:101} in request body}
  //{"title":"Sometitle","description":"some long description","budget":"123",
  // "peopleNeeded":"123","categoryId:101} in request body}]
  // in request body
  db
    .insert(req.body)
    .returning("*")
    .into("Idea")
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
