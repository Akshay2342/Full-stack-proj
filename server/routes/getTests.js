const express = require('express');
const router = express.Router();

const {getTestById,getAllTests,postTest} = require('../Controllers/testController');

// get test with particular id

router.get('/:id',getTestById);

router.get('/',getAllTests);

router.post('/:id',postTest);

module.exports = router;