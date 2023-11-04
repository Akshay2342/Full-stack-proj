const db = require('../conn');
const asyncHandler = require('express-async-handler');

const getBlogById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await db.query('SELECT * FROM blog WHERE contentID = $1', [id]);
        if (rows.length === 0) {
            throw new Error('Blog not found');
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        throw error;
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM blog');
        res.status(200).json(rows);
    } catch (error) {
        throw error;
    }
});

module.exports = { getBlogById, getAllBlogs };