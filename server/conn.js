const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'akshay'
})

connection.connect((err)=>{
  if (err) {
    console.error('Error connecting to DB:', err);
    return;
  }
  console.log('Connected to DB');
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  connection.end();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  connection.end();
});

module.exports = connection;