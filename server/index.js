const bodyParser = require('body-parser');
const db = require('./conn');
const express = require('express')
const cors = require('cors');

const app = express()
const port = 5000

app.use(express.json());
app.use(cors());    
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/blogs', require('./routes/getBlogs'))

app.use('/api/tests', require('./routes/getTests'))

app.use('/api/user', require('./routes/getUser'))

app.use('/api/books', require('./routes/getBooks'))

app.use('/api/courses', require('./routes/getCourses'))

app.use('/api/comments', require('./routes/getComments'))


app.listen(port , ()=>{
    console.log("Server is running on port 5000")
})