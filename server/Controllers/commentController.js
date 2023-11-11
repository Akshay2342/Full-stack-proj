
const db = require('../conn');
const asyncHandler = require('express-async-handler');

// by content id 
const getCommentById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`SELECT * FROM comments WHERE contentId = ${id}`);
        // const rows = result.rows;
        // if (!rows || rows.length === 0) {
            // res.status(200).json({});
        // } else {
        //     res.status(200).json(rows);
        res.status(200).json(result[0])
        // res.send("ok")
        // }
        // console.log(result);
    } catch (error) {
        throw error;
    }
});



module.exports = { getCommentById };