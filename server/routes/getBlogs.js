const express = require('express');
const router = express.Router();
const {getBlogById,getAllBlogs,post} = require('../Controllers/blogController');

// get blogs with particular id

router.get('/:id',getBlogById);

// get all blogs

router.get('/', getAllBlogs);

// post a blog

router.post('/', (req, res) => {
    res.status(200).send(`post`)
    }
);

// update a blog

router.put('/:id', (req, res) => {

    res.status(200).send(` put id as ${req.params.id}`)
    }
);

// delete a blog

router.delete('/:id', (req, res) => {
    res.status(200).send(`Hello delete from getBlogs.js with id ${req.params.id}`)
    }
);

module.exports = router;