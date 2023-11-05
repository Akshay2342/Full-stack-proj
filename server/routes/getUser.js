const express = require('express');
const router = express.Router();
const {
    getAllContentOfUser,
    getAllBooksOfUser,
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
} = require('../Controllers/userController.js');

// Get all content of a user
router.get('/content', getAllContentOfUser);

// Handle books
//for post auth required
router.route('/content/books')
  .get(getAllBooksOfUser)
  .post(createBook);

//for put and delete auth required
router.route('/content/books/:id')
  .put(updateBook)
  .delete(deleteBook);

// Handle blogs
//for post auth required
router.route('/content/blogs')
  .get(getAllBlogsOfUser)
  .post(createBlog);

  //for put and delete auth required
router.route('/content/blogs/:id')
  .put(updateBlog)
  .delete(deleteBlog);

// Handle tests
//for post auth required
router.route('/content/tests')
  .get(getAllTestsOfUser)
  .post(createTest);

  //for put and delete auth required
router.route('/content/tests/:id')
  .put(updateTest)
  .delete(deleteTest);

// Handle courses
//for post auth required
router.route('/content/courses')
  .get(getAllCoursesOfUser)
  .post(createCourse);

// auth required
router.route('/content/courses/:id')
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;