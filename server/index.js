const db = require('./conn');
const express = require('express')

const app = express()
const port = 5000

app.use('/api/blogs', require('./routes/getBlogs'))

app.use('/api/tests', require('./routes/getTests'))

app.listen(port , ()=>{
    console.log("Server is running on port 5000")
  })
