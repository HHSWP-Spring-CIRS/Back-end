const knex = require('knex')({
    client:'mysql',
    connection: {
      host: 'localhost',
      database: 'a1605352',
      user: 'a1605352',
      password: 'kyMUds44b'
    }
});

module.exports = knex;