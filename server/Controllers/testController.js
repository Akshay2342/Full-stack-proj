const db = require('../conn');
const asyncHandler = require('express-async-handler');

const getTestById = asyncHandler( async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`SELECT * FROM test WHERE contentID = ${id}`);
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const getAllTests = (req, res) => {
    // const { rows } = db.query(`SELECT * FROM tests`, (err, result) => {
    //     if (err) res.status(500);
    //     res.status(200).json(result)
    // }
    // )
    res.status(200).json({title : "AllTests"});
}

const postTest = (req,res)=>{
    // db.query(`INSERT INTO tests (id, name) VALUES (${req.params.id}, ${req.body.name})`, (err, result) => {
    //     if (err) res.status(500);
    //     res.status(200).json(result)
    // }
    // )
}

module.exports = {
    getTestById,getAllTests,postTest
};

