const express = require('express');
const router = express.Router();
const {getBookById,getAllBooks} = require('../Controllers/bookController');

// get books with particular id
// public
router.get('/search',getBookById);

// get all books
//public
router.get('/', getAllBooks);

// post a blog
// private
// router.post('/', (req, res) => {
//     res.status(200).send(`post`)
//     }
// );

// update a blog
// private
// router.put('/:id', (req, res) => {

//     res.status(200).send(` put id as ${req.params.id}`)
//     }
// );

// delete a blog
// private
// router.delete('/:id', (req, res) => {
//     res.status(200).send(`Hello delete from getBlogs.js with id ${req.params.id}`)
//     }
// );

module.exports = router;