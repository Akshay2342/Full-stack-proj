const express = require('express')
const router = express.Router();

const {getCommentById} = require('../Controllers/commentController');

// get comment with particular id
// public
// content id
router.get('/:id',getCommentById);

// get all comments
//public

// router.get('/', getAllComments);

// post a comment
// private
// content id
// router.post('/:id',postComment);

// update a comment
// private

// router.put('/:id',UpdateComment);

// // delete a comment
// // private

// router.delete('/:id',deleteComment);

module.exports = router;
