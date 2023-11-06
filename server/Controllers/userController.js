const db = require('../conn.js');

const getAllBooksOfUser = async (req, res) => {
    res.send('getAllBooksOfUser');
  }
  
  const getAllContentOfUser = async (req, res) => {
    res.send('getAllContentOfUser');
  }
  
  const createBook = async (req, res) => {
    res.send('createBook');
  }
  
  const updateBook = async (req, res) => {
    const id = req.params.id;
    res.send(`updateBook with id: ${id}`);
  }
  
  const deleteBook = async (req, res) => {
    const id = req.params.id;
    res.send(`deleteBook with id: ${id}`);
  }
  
  const getAllBlogsOfUser = async (req, res) => {
    res.send('getAllBlogsOfUser');
  }
  
  const createBlog = async (req, res) => {
    // req.body.title, req.body.content, req.body.user, req.body.date);
    // res.json(
    //   {
    //     "title": req.body.title,
    //     "content": req.body.content,
    //     "user": req.body.user,
    //     "date": req.body.date
    //   }
    // );
    console.log(req.body);
    res.send('createBlog');
  }
  
  const updateBlog = async (req, res) => {
    const id = req.params.id;
    res.send(`updateBlog with id: ${id}`);
  }
  
  const deleteBlog = async (req, res) => {
    const id = req.params.id;
    res.send(`deleteBlog with id: ${id}`);
  }
  
  const getAllTestsOfUser = async (req, res) => {
    res.send('getAllTestsOfUser');
  }
  
  const createTest = async (req, res) => {
    res.send('createTest');
  }
  
  const updateTest = async (req, res) => {
    const id = req.params.id;
    res.send(`updateTest with id: ${id}`);
  }
  
  const deleteTest = async (req, res) => {
    const id = req.params.id;
    res.send(`deleteTest with id: ${id}`);
  }
  
  const getAllCoursesOfUser = async (req, res) => {
    res.send('getAllCoursesOfUser');
  }
  
  const createCourse = async (req, res) => {
    res.send('createCourse');
  }
  
  const updateCourse = async (req, res) => {
    const id = req.params.id;
    res.send(`updateCourse with id: ${id}`);
  }
  
  const deleteCourse = async (req, res) => {
    const id = req.params.id;
    res.send(`deleteCourse with id: ${id}`);
  }

  module.exports = {
    getAllBooksOfUser,
    getAllContentOfUser,
    createBook,
    updateBook,
    deleteBook,
    getAllBlogsOfUser,
    createBlog,
    updateBlog,
    deleteBlog,
    getAllTestsOfUser,
    createTest,
    updateTest,
    deleteTest,
    getAllCoursesOfUser,
    createCourse,
    updateCourse,
    deleteCourse
  }