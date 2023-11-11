
const db = require('../conn');
const asyncHandler = require('express-async-handler');

// by content id 
const getCommentById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`SELECT * FROM comments WHERE contentID = ${id}`);
        const rows = result.rows;
        if (!rows || rows.length === 0) {
            res.status(200).json({});
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        throw error;
    }
    res.json({ "comment" : req.params.id });
});



module.exports = { getCommentById };