const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const allowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//     next();
// }

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
//app.use(allowCrossDomain)

require('./routes')(app, 'Idea', 'ideas');
require('./routes')(app, 'Category', 'categories');
require('./routes')(app, 'Member', 'members');
require('./routes/commentsRoutes')(app);
require('./routes/ideasRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Listening to port 5000!" );