const db = require('../conn');
const asyncHandler = require('express-async-handler');

const getBookById = asyncHandler( async (req, res) => {
    const id = req.params.id;
    res.status(200).json({id , book : "book"});
})

const getAllBooks = asyncHandler( (req, res) => {
    res.status(200).json({title : "Books"});
})

const deleteABook = asyncHandler( (req,res)=>{
    res.send("Delete A book")
})

module.exports = {
    getBookById,getAllBooks,deleteABook
};
