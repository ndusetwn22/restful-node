const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// didalam scripts
// "backend": "nodemon ./index.js",
 
// parse application/json
app.use(bodyParser.json());

// user cors()
app.use(cors());

 
//create database connection
const conn = mysql.createConnection({
  host: 'ec2-54-83-82-187.compute-1.amazonaws.com',
  user: 'mxjhctjcfqfwyz',
  password: '061ff39b407dc0101e044c345085d588bb15ef92167cf672e2ac88ef7f625fa2',
  database: 'd2g5r8cboh92iq'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connecteds...');
});

//api query
app.post('/api/query',(req, res) => {
    let sql = req.body.query;
    console.log('request_custom :', req)
    console.log('query : ', sql)
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
//Server listening
app.listen(3001,() =>{
  console.log('Server started on port 3001...');
});