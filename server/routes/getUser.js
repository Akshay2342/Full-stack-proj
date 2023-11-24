const express = require('express');
const router = express.Router();
const bcrypt=require("bcryptjs") ;
const jwt = require("jsonwebtoken");
const db = require('../conn');
const auth = require('../middleware/auth');
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
const asyncHandler = require('express-async-handler');

const upload = multer({ storage: multer.memoryStorage() });
// Get all content of a user
router.get('/content', getAllContentOfUser);

// Handle books
//for post auth required
router.route('/content/books')
  .get(auth, getAllBooksOfUser)
  .post(auth , upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), createBook);
  
//for put and delete auth required
router.route('/content/books/:id')
  .put(auth,updateBook)
  .delete(auth,deleteBook);

// Handle blogs
//for post auth required
router.route('/content/blogs')
  .get(auth,getAllBlogsOfUser)
  .post(auth,createBlog);

  //for put and delete auth required
router.route('/content/blogs/:id')
  .put(auth,updateBlog)
  .delete(auth,deleteBlog);

// Handle tests
//for post auth required
router.route('/content/tests')
  .get(auth,getAllTestsOfUser)
  .post(auth,createTest);

  //for put and delete auth required
router.route('/content/tests/:id')
  .put(auth,updateTest)
  .delete(auth,deleteTest);

// Handle courses
//for post auth required
router.route('/content/courses')
  .get(auth,getAllCoursesOfUser)
  .post(auth,createCourse);

// auth required
router.route('/content/courses/:id')
  .put(auth,updateCourse)
  .delete(auth,deleteCourse);

  //for Sign Up

  router.post("/update", async (req, res) => {
    const username = req.body.username;
  
    try {
      // Check if the user exists
      const checkUserQuery = "SELECT * FROM user WHERE username = ?";
      const userData = await db.query(checkUserQuery, [username]);
  
      console.log(req.body);
      if (userData[0].length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Prepare the update query and values
      let updateQuery = "UPDATE user SET";
      const updateValues = [];
      const allowedColumns = ['username', 'password', 'name', 'firstname', 'lastname'];
  
      for (const column of allowedColumns) {
        if (req.body[column]) {
          if (column === 'password') {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            updateQuery += ` ${column} = ?,`;
            updateValues.push(hash);
          } else {
            updateQuery += ` ${column} = ?,`;
            updateValues.push(req.body[column]);
          }
        }
      }
  
      // Remove the trailing comma and add the WHERE clause
      updateQuery = updateQuery.slice(0, -1) + " WHERE username = ?";
      updateValues.push(username);
      
  
      // Execute the update query
      const result = await db.query(updateQuery, updateValues);
      const data = await db.query("SELECT * FROM user WHERE username = ?", [req.body.username]);
      let firstname;
      let lastname;
      let name;
  
      console.log(data[0][0])
      if (data[0].length === 0) return res.status(404).json("User not found!");
      // Check password
      firstname = data[0][0]?.firstname
      lastname = data[0][0]?.lastname
      name = data[0][0]?.name
      console.log('--------');
      const token = jwt.sign({ id: data[0].id, username : username }, "jwtkey");
        const { password, ...other } = data[0];
    
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({
            username,
            token,
            firstname,
            lastname
          });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  router.post("/signup", async (req, res) => {
    try {
      // CHECK EXISTING USER
      const q1 = "SELECT * FROM user WHERE username = ?";
      console.log(req.body.username)
      const data = await db.query(q1, [req.body.username]);
      console.log(data[0])
      if (data[0].length > 0) {
        return res.status(409).json("exist");
      }
  
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO user SET username = ?, password = ?, name = ?, firstname = ?, lastname = ?";
      const values = [req.body.username, hash, req.body.nickname, req.body.firstname, req.body.lastname];
      
      console.log(values);
      await db.query(q, values);
      res.status(200).json("User created");
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });


    router.post("/login", async (req, res) => {
      try {
        // CHECK USER
        const q = "SELECT * FROM user WHERE username = ?";
        const data = await db.query(q, [req.body.username]);
        const username = req.body.username;
        let firstname;
        let lastname;
        let name;
    
        console.log(data[0][0])
        if (data[0].length === 0) return res.status(404).json("User not found!");
        // Check password
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          data[0][0].password
        );
        firstname = data[0][0]?.firstname
        lastname = data[0][0]?.lastname
        name = data[0][0]?.name
        // console.log(data[0][0].password)
        // console.log(req.body.password);
        // console.log("data[0].password:", data[0].password);
        if (!isPasswordCorrect)
          return res.status(400).json("Wrong username or password!");
    
        const token = jwt.sign({ id: data[0].id, username : username }, "jwtkey");
        const { password, ...other } = data[0];
    
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({username,token,firstname, lastname, name});
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
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
  router.route('/content/comment/:id').post(auth,postComment).put(auth,updateComment).delete(auth,deleteComment);

module.exports = router;