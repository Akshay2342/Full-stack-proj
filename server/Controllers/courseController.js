const db = require('../conn');
const asyncHandler = require('express-async-handler');

const getCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;
    // try {
    //     const { rows } = await db.query('SELECT * FROM course WHERE id = $1', [id]);
    //     if (rows.length === 0) {
    //         throw new Error('Course not found');
    //     } else {
    //         res.status(200).json(rows[0]);
    //     }
    // } catch (error) {
    //     throw error;
    // }
    res.json({"course" : req.params.id});
});

const postCourse = asyncHandler(async (req, res) => {
    // try {
    //     const { rows } = await db.query('INSERT INTO course (id, name) VALUES ($1, $2)', [req.body.id, req.body.name]);
    //     res.status(200).json(rows);
    // } catch (error) {
    //     throw error;
    // }
    res.send("Post Course");
});

module.exports = { getCourse, postCourse };