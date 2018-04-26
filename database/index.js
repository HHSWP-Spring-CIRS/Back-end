const knex = require('knex')({
    client:'mysql',
    connection: {
      host: 'localhost',
      database: 'a1603177',
      user: 'a1603177',
      password: 'keKIRC47a',
      timezone: 'UTC',
    dateStrings: true,
    }
});

module.exports = knex;