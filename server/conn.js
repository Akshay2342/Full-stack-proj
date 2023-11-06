const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'newdb'
}).promise();

// connection.connect((err)=>{
//   if (err) {  
//     console.error('Error connecting to DB:', err);
//     return;
//   }
//   console.log('Connected to DB');
// })

pool.query('SELECT 1')
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });

module.exports = pool;