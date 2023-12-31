const express = require('express');
const router = express.Router();
const {getBlogById,getAllBlogs} = require('../Controllers/blogController');
const auth = require('../middleware/auth');

// get blogs with particular id
// public
router.get('/:id',getBlogById);

// get all blogs
//public
router.get('/', getAllBlogs);

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
router.delete('/:id', auth,  (req, res) => {
    const username = req.userId;

    console.log(user)
    res.status(200).send(`Hello delete from getBlogs.js with id ${req.params.id} ${username}`)
    }
);

module.exports = router;