const db = require('../database');


module.exports = (app, table, plural) => {
    app.get(`/api/${plural}`, async (req, res) => {
        try {
            const data = await db.select('*').from(table);

            res.status(200);
            res.json(data);
        } catch (err) {
            res.status(400);
            res.send(err);
        }

    });
    app.post(`/api/${plural}`, async (req, res) => {
        try {
            await db(table).insert(req.body)
            res.status(201);
            res.json({ message: `${table} Created !` });
        } catch (err) {
            res.status(400);
            res.send(err);
        }
    });

    app.get(`/api/${plural}/:id`, async (req, res) => {
        try {
          const data = await db(table)
            .where({ id: req.params.id })
            .select('*');
    
          res.status(200);
          res.json(data[0]);
        } catch (err) {
          res.status(400);
          res.send(err);
        }
      });

      app.put (`/api/${plural}/: id `, async(req,res)=>{
          try {
              await db(table)
              .where({id : req.params.id})
              .update(req.body);

              res.status(200);
              res.json({message : `${table} Updated SuccessFully  !`})
          }catch (err){
              res.status(400);
              res.send(err)
          }

      });
    
      app.delete (`/api/${plural}/: id `, async(req,res)=>{
          try {
              await db(table)
              .where ({ id : req.params.id})
              .del()

            res.status(200);
            res.json ({message : `${table} Deleted SuccessFully!`})

          } catch(err){
              res.status(400);
              res.send(err)
          }
      })
















}
