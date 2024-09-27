const mysql = require('mysql2/promise');


(async function () {
  //连接池
  const pool  = mysql.createPool({
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: 'caoqian',
    database: 'practice',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  const [results] = await pool.query('select * from customers');
  console.log(results);

}())
// connectionLimit 是指定最多有多少个连接，比如 10 个，那就是只能同时用 10个，再多需要排队等。

// maxIdle 是指定最多有多少个空闲的，超过这个数量的空闲连接会被释放。

// waitForConnections 是指如果现在没有可用连接了，那就等待，设置为 false 就是直接返回报错。

// idleTimeout 是指空闲的连接多久会断开。

// queueLimit 是可以排队的请求数量，超过这个数量就直接返回报错说没有连接了。设置为 0 就是排队没有上限。

// enableKeepAlive、keepAliveInitialDelay 是保持心跳用的，用默认的就好。