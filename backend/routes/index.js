const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: 'todo'
});



/* Sjekk om du klarer å nå backend ved denne endepunktet */
router.get('/', function(req, res, next) {
  res.send( { title: 'Todo backend' });
});

// Legg inn todo!
router.post('/addtodo', function(req, res, next) {
  try {
    const TODO = req.body.name;
   connection.execute(
      'INSERT INTO todo (todoName, createdAt) VALUES (?, NOW())',
     [TODO],
      function (err, result, fields) {
        if(result) {
          return res.status(200).send('Todo lagret');
        } else {
          return res.status(401).send('Noe gikk galt');
        }

      }
    )
  }
  catch (e) {
    console.log(e)
    res.status(500).send('Noe gikk feil, prøv igjen senere')
  }
});

// Se todo
router.get('/gettodo', function(req, res, next) {
  try {
    connection.query(
      'SELECT * FROM todo ORDER BY createdAt DESC',
      function(err, results, fields) {
        if(results) {
          return res.status(200).send(results);
        } else {
          console.log()
          return res.status(401).send('Noe gikk feil');
        }
      }
    );
  }
  catch (e) {
    console.log(e)
  }
});

// slett todo
router.post('/deletetodo', function(req, res, next) {
  try {
    const slettTodo = req.body.todoId
    connection.execute(
      'DELETE FROM todo WHERE todoId = ?',
      [slettTodo],
      function(err, results, fields) {
        if(results) {
          return res.status(200).send('Todo slettet!');
        } else {
          return res.status(401).send('Noe gikk feil');
        }
      }
    );
  }
  catch (e) {
    console.log(e)
  }
});


module.exports = router;