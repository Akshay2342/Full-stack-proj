const db = require('../conn');
const asyncHandler = require('express-async-handler');

// const getBookById = asyncHandler( async (req, res) => {
//     const id = req.params.id;
//     res.status(200).json({id , book : "book"});
// })

const getBookById =  (req, res) => {
    const sql = 'SELECT * FROM books WHERE title LIKE ?';
    const {bookName} = req.query;
    const searchTerm = `%${bookName.toLowerCase()}%`
    console.log(searchTerm);
   const resu =  db.query(sql, [searchTerm], async (err, result) => {
        console.log("working")
      if (err) {
        console.log(err);
        res.send({ status: 500, message: 'An error occurred...' });
      } else if (result.length > 0) {
        // Convert BLOB data to Base64 string
        let book = result[0];
        let book_img = Buffer.from(book.book_img).toString('base64');
        let book_pdf = Buffer.from(book.book_pdf).toString('base64');
  
        book.book_img = book_img;
        book.book_pdf = book_pdf;
  
        res.status(200).json(result);
      } else {
        res.send({ status: 404, message: 'Book not found...' });
      }
  });
//  const getBookById = async (req, res) => {
//   const sql = 'SELECT * FROM books WHERE title LIKE ?';
//   const {bookName} = req.query;
//   const searchTerm = `%${bookName.toLowerCase()}%`
//   console.log(searchTerm);
//   try {
//     const result = await db.query(sql, [searchTerm]);
//     console.log("working")
//     if (result.length > 0) {
//       // Convert BLOB data to Base64 string
//       let book = result[0];
//       let book_img = Buffer.from(book.book_img).toString('base64');
//       let book_pdf = Buffer.from(book.book_pdf).toString('base64');

//       book.book_img = book_img;
//       book.book_pdf = book_pdf;

//       res.status(200).json(result);
//     } else {
//       res.send({ status: 404, message: 'Book not found...' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ status: 500, message: 'An error occurred...' });
//   }
// }
}





const getAllBooks = asyncHandler( (req, res) => {
    res.status(200).json({title : "Books"});
})

const deleteABook = asyncHandler( (req,res)=>{
    res.send("Delete A book")
})

module.exports = {
    getBookById,getAllBooks,deleteABook
};
