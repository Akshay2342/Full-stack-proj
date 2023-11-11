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
    let query = 'INSERT INTO content SET ?';
    let query1 = 'INSERT INTO blog SET ?';
    const username = req.body.user; // or wherever you get the username from

// Execute a SELECT statement to get the user ID
const result = await db.query('SELECT userId FROM user WHERE username = ?', [username]);

// The ID of the user
const userId = result[0].id;
      const contdata = {
        contentType  : "blog",
        likes : 0,
        uploadDate : req.body.date,
      }
      const contentResult= await db.query(query, contdata, (error, results) => {
      if (error) throw error;
      console.log('Inserted ' + results.affectedRows + ' row(s).');
    });
    // Insert the content into the content table
    // const contentResult = await db.query('INSERT INTO content (contentType, content, user, date) VALUES (?, ?, ?, ?)', [req.body.title, req.body.content, req.body.user, req.body.date]);
    
    // Get the newly generated ID
    const contentId = contentResult.contentId;
      // Insert a new row into the blogs table using the newly generated ID
      let data = {
        contentId : contentId,
        title: req.body.title,
        description : "Not an Issue",
        content: req.body.content,
        userId: userId,
      };
      
      const blogResult= await db.query(query1, data, (error, results) => {
        if (error) throw error;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
      });


    res.json(
      {
        message : 'inserted'
      }
    );

    // console.log(req.body);
    // res.send('createBlog');
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
  
  // body should contain username, 
  const createTest = async (req, res) => {
    let query = 'INSERT INTO content SET ?';
    let query1 = 'INSERT INTO test SET ?';
    const username = req.body.user; // or wherever you get the username from

// Execute a SELECT statement to get the user ID

// The ID of the user
// {
  //   username : ...,
  // date : ...,
  //   questions : [{},{}]
  // }
  //generating USerid With username
  const result = await db.query('SELECT userId FROM user WHERE username = ?', username);
  const userId = result[0][0].userId;
  //generating USerid With username
  const contdata = {
    contentType  : "test",
    likes : 0,
    uploadDate : req.body.date,
  }
  const contentResult= await db.query(query, contdata, (error, results) => {
    if (error) throw error;
    console.log('Inserted ' + results.affectedRows + ' row(s).');
  });
    // Insert the content into the content table
    // const contentResult = await db.query('INSERT INTO content (contentType, content, user, date) VALUES (?, ?, ?, ?)', [req.body.title, req.body.content, req.body.user, req.body.date]);
    
    // Get the newly generated ID
    const contentId = contentResult[0].insertId;
      // Insert a new row into the blogs table using the newly generated ID
      let data = {
        contentId : contentId,
        title: req.body.title,
        userID: userId,
        questions: JSON.stringify( req.body.questions)
      };
      
      const TestResult= await db.query(query1, data, (error, results) => {
        if (error) throw error;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
      });


    res.json(
      {
        message : "ok"
      }
    );

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

  const updateComment = async (req, res) => {
    const id = req.params.id;
    res.send(`updateComment with id: ${id}`);
  }

 const deleteComment = async (req, res) => {
    const id = req.params.id;
    res.send(`deleteComment with id: ${id}`);
  }

  // with user id and content id
  const postComment = async (req, res) => {
    const date = new Date();
    //datetime datatype in sql so 
    const username = req.body.username;
    //generating USerid With username
  const result = await db.query('SELECT userId FROM user WHERE username = ?', username);
  const userId = result[0][0].userId;
  //generating USerid With username

    const strdatetime = date.toISOString().slice(0, 19).replace('T', ' ');
    console.log(strdatetime)
    const cid = req.params.id;
    const comment = req.body.comment;
    let query = 'INSERT INTO comments SET ?';
    const obj = {
      contentID : cid,
      userId : userId,
      commentBody : comment,
      uploadDatetime : strdatetime
    }
    db.query(query, obj, (error, results) => {
      if (error) throw error;
      console.log('Inserted ' + results.affectedRows + ' row(s).');
    });
    res.send("okInserted");
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
    deleteCourse,
    updateComment,
    deleteComment,
    postComment
  }