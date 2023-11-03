const conn = require('./conn');
const express = require('express')

const app = express()
const port = 5000

app.listen(port , ()=>{
    console.log("Server is running on port 5000")
  })

  conn.query('SELECT * FROM blog', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query results:', results);
  });