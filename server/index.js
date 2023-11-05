const db = require('./conn');
const express = require('express')

const app = express()
const port = 5000

app.use('/api/blogs', require('./routes/getBlogs'))

app.use('/api/tests', require('./routes/getTests'))

app.use('/api/user', require('./routes/getUser'))

app.use('/api/books', require('./routes/getBooks'))

app.listen(port , ()=>{
    console.log("Server is running on port 5000")
  })
