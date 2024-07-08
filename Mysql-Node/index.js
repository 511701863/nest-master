const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3300,
  user: 'root',
  password: 'caoqian',
  database: 'practice'
});

connection.query(
  'SELECT * FROM customers where name like ?',
  ['孙%'],
  function(err, results, fields) {
    console.log(results);
    console.log(fields.map(item => item.name)); 
  }
);
