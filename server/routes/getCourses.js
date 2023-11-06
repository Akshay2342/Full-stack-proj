const express = require('express');
const router = express.Router()
const {
    getCourse,
    postCourse
} = require('../Controllers/courseController');

//public
// gets content id
router.get('/:id',getCourse);

//private
// user id by auth
//accepts a json object in body
router.post('/',postCourse);

module.exports = router;