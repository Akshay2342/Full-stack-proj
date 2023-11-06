
const db = require('../conn');
const asyncHandler = require('express-async-handler');

// by content id 
const getCommentById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    // try {
    //     const { rows } = await db.query('SELECT * FROM comment WHERE contentID = $1', [id]);
    //     if (rows.length === 0) {
    //         throw new Error('Comment not found');
    //     } else {
    //         res.status(200).json(rows[0]);
    //     }
    // } catch (error) {
    //     throw error;
    // }
    res.json({ "comment" : req.params.id });
});


//should accept comment id and user id

const postComment = asyncHandler(async (req, res) => {  
    // try {
    //     const { rows } = await db.query('INSERT INTO comment (contentID, userID, comment) VALUES ($1, $2, $3)', [req.body.contentID, req.body.userID, req.body.comment]);
    //     res.status(200).json(rows);
    // } catch (error) {
    //     throw error;
    // }
    res.send("Post Comment");
});
module.exports = { getCommentById, postComment };