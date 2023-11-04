const db = require('../conn');
const asyncHandler = require('express-async-handler');

const getTestById = asyncHandler( async (req, res) => {
    const id = req.params.id;
    const { rows } =  db.query(`SELECT * FROM tests WHERE id = ${id}`, (err, result) => {
        if (err) res.status(500);
        res.status(200).json(result)
    }
    )
    res.status(200).json(rows);
})

const getAllTests = (req, res) => {
    const { rows } = db.query(`SELECT * FROM tests`, (err, result) => {
        if (err) res.status(500);
        res.status(200).json(result)
    }
    )
    res.status(200).json(rows);
}

const postTest = (req,res)=>{
    db.query(`INSERT INTO tests (id, name) VALUES (${req.params.id}, ${req.body.name})`, (err, result) => {
        if (err) res.status(500);
        res.status(200).json(result)
    }
    )
}

module.exports = {
    getTestById,getAllTests,postTest
};

