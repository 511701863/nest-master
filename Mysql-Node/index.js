const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'caoqian',
  database: 'practice'
});

//查询
// connection.query(
//   'SELECT * FROM customers where name like ?',
//   ['孙%'],
//   function(err, results, fields) {
//     console.log(results);
//     console.log(fields.map(item => item.name)); 
//   }
// );

//新增
// connection.execute(
//   'insert into customers (name) values (?)',
//   ['犹豫会败北'],
//   function(err, results, fields) {
//     console.log(err,results);
//   }
// );

//修改
// connection.execute(
//   'update customers set name=(?) where name=(?)',
//   ['犹豫就会败北','犹豫会败北'],
//   function(err, results, fields) {
//     console.log(err,results);
//   }
// );

//删除
connection.execute(
  'delete FROM customers where name=(?)',
  ['犹豫就会败北'],
  function(err, results, fields) {
    console.log(err,results);
  }
);