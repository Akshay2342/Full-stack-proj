const express = require('express');
const router = express.Router();
const bcrypt=require("bcryptjs") ;
const jwt = require("jsonwebtoken");
const db = require('../conn');
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
    deleteCourse,
    postComment,
    updateComment,
    deleteComment,
} = require('../Controllers/userController.js');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
// Get all content of a user
router.get('/content', getAllContentOfUser);

// Handle books
//for post auth required
router.route('/content/books')
  .get(getAllBooksOfUser)
  .post( upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), createBook);





  
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

  //for Sign Up


  router.post("/signup", (req, res) => {
    // CHECK EXISTING USER
    const q1 = "SELECT * FROM user WHERE username = ?";
    console.log(req.body.username)
     db.query(q1, [req.body.username], (err, data) => {
        if (err) {
            console.error(err); 
            return res.status(500).json(err);
        }
        console.log(data)

        if (data.length) {
            return res.status(409).json("exist");
        }});
        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user SET username = ?, password = ?, name = ?";
        const values = [req.body.username, hash, req.body.nickname];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.status(200).json("User created");
        });
    });

  router.post("/login",(req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM user WHERE username = ?";
    const data = db.query(q, [req.body.username], (err, data) => {
        console.log(data.length);
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
    });
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
        console.log(req.body.password);
        console.log("data[0].password:", data[0].password);
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
      
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({"ok" : "ok"});
        
    });
  
  router.post("/logout",(req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  });

  router.get("/blogshome", (req, res) => {
    const q = 'SELECT * FROM usersdata LIMIT 3';
  
    db.query(q, (err, result) => { // Change 'error' to 'err' here
      if (err) {
        console.log('Error searching for book:', err);
        res.status(500).send('Error searching for book');
        return;
      }
      console.log(result);
      res.status(200).json(result);
    });
  });
  // for comment a content
  router.route('/content/comment/:id').post(postComment).put(updateComment).delete(deleteComment);

module.exports = router;