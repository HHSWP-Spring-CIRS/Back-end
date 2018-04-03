// /routes/api/Member.js

const express = require('express');
const router = express.Router();
const db = require('../../database');
// Notice: No need to require body-parser here! (This is JavaScript, not
// Java, nor React)

/** localhost/api/member , with GET**/
router.get('/', function(req,res) {
  db.select().from('Member').then( (data) => {
      res.status(200);
      res.send(data);
    }
  );
});

/** localhost/api/member , with POST !!!**/
router.post('/', function(req,res) {
  // Just a start of err handling for model for you
  if(req.body.userName && req.body.email) {
    // Front-end has to send a Member as JSON
    // {"userName":"Joe","email":some@mail.com} in request JSON body
    db.insert(req.body).returning('*').into('Member').then( (data) => {
        res.status(200);
        res.send(data);  // [17] if that was the auto_incement id
        // or [17,18,19] if multiple inserts were done. valid json.org
      }
    )
    .catch((error)=>{
      res.status(409);  // Just a start of err handling for model for you
      console.error(error);
      res.end(JSON.stringify({"error":"catastrophy"}));
    });
  } else {
    res.status(400);  // Just a start of err handling for model for you
    res.end(JSON.stringify({"error":"horror"}));
  }
});

/** localhost/api/member/multiInsert , with MULTI-JSON POST !!!**/
router.post('/multiInsert/', function(req,res) {
  // Just a start of err handling for model for you

  // Front-end has to send a Member as JSON
  // [{"userName":"Joe","email":"Doe@mail.com"},{"userName":"John","email":"another@mail.com"}]
  // in request body
  db.insert(req.body).returning('*').into('Member').then( (data) => {
      res.status(200);
      res.send(data);  // [17] if that was the auto_incement id
      // or [17,18,19] if multiple inserts were done. valid json.org
    }
  )
  .catch((error)=>{
    res.status(409);  // Just a start of err handling for model for you
    console.error(error);
    res.end(JSON.stringify({"error":"catastrophy"}));
  });

});

module.exports = router;