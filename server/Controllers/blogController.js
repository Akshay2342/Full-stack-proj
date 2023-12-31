const db = require('../conn');
const asyncHandler = require('express-async-handler');

// by blog id 
// by blog id 
const getBlogById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const [ rows ] = await db.query('SELECT * FROM blog WHERE contentID = ?', [id]);
        if (rows.length === 0) {
            throw new Error('Blog not found');
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const  rows  = await db.query('SELECT * FROM blog');
        // console.log(rows)
        res.status(200).json(rows);
    } catch (error) {
        throw error;
    }
});

// post a blog
// const postBlog = asyncHandler(async (req, res) => {
    // try {
    //     const { rows } = await db.query('INSERT INTO blog (title, content) VALUES ($1, $2)', [req.body.title, req.body.content]);
    //     res.status(200).json(rows);
    // } catch (error) {
    //     throw error;
    // }
// });

const deleteABlog = asyncHandler(async (req, res) => {
    try {
        const user = req.userId;
        const { rows } = await db.query('DELETE FROM blog WHERE contentID = $1', [req.params.id]);
        res.status(200).json(user);
    } catch (error) {
        throw error;
    }
    res.send("Delete A blog")
});

module.exports = { getBlogById, getAllBlogs , deleteABlog };