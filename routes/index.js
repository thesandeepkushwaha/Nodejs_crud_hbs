const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();
require('dotenv').config();

//Create Connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route for homepage
router.get('/',(req, res) => {
  let sql = "SELECT * FROM student";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('detail_view',{
      results: results
    });
  });
});

//route for insert data
router.post('/save',(req, res) => {
  let data = {uname: req.body.uname, email: req.body.email, mobile: req.body.mobile, address: req.body.address, city: req.body.city};
  let sql = "INSERT INTO student SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

//route for update data
router.post('/update',(req, res) => {
  let sql = "UPDATE student SET uname='"+req.body.uname+"', email='"+req.body.email+"', mobile='"+req.body.mobile+"' , address='"+req.body.address+"' , city='"+req.body.city+"' WHERE id="+req.body.id;
  // let sql = "UPDATE student SET uname='Satyam', email='Satyam@gmail.com', mobile='22222222222' , address='btm' , city='bangalore' WHERE id="+req.body.id;

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
router.post('/delete',(req, res) => {
  let sql = "DELETE FROM student WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening

module.exports = router;