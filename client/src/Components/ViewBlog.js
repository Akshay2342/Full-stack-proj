// import { Typography } from "@mui/material";
// import {Avatar} from "@mui/material";
// import {Card} from "@mui/material";
// import CardMedia from '@mui/material/CardMedia';
// import CommentBox from "./CommentSkel";
// import CommentList from "./GenerateComments";
// import axios from "axios";
// import parse from 'html-react-parser';


// //some object instances wit blog id title content
// const id = 4;
// //test


// const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
// const blog = res.data;
// console.log(blog);
// // const comments = [
// //   { id: 1, userAvatar: 'avatar1.png', userId: 'user1', date: '2022-01-01', text: 'This is a comment' },
// //   { id: 2, userAvatar: 'avatar2.png', userId: 'user2', date: '2022-01-02', text: 'This is another comment' },
// //   //generate some examples of comments
// //   { id: 3, userAvatar: 'avatar3.png', userId: 'user3', date: '2022-01-03', text: 'This is a comment' },
// //   { id: 4, userAvatar: 'avatar4.png', userId: 'user4', date: '2022-01-04', text: 'This is another comment' },
// // ];
// const ress = await axios.get(`http://localhost:5000/api/comments/${id}`);
// const rcomments = ress.data;
// const comments = [];
// rcomments.forEach((element, index) => {
//   const each = {
//     id: index + 1, // if you want to use index as id
//     userAvatar: 'avatar1.png',
//     userId: element.userId,
//     date: element.uploadDatetime,
//     text: element.commentBody
//   }
//   // console.log(element)
//   comments.push(each);
// });

// const ViewBlog = () => {
//   //test
//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
//       setBlog(res.data);
//       const commentsData = await fetchComments(4);
//       setComments(commentsData);
//     }

//     fetchData();
//   }, []);

//   if (!blog || !comments) {
//     return <div>Loading...</div>;
//   }

//     return (
//       <div className="BlogView">
//         <center><h1>ViewBlog</h1></center>
//         <Card>
//           <CardMedia
//             component="img"
//             height="200"
//             image={blog.image}
//             alt="Image description"
//             style={{ borderRadius: "10px", height: "50vh" }}
//           />
//         </Card>                           
//         <div className="topblog">
//           <Typography variant="h4" >{blog.title}</Typography>
//         </div>
//         <hr />
//         <div className="content">
//           <Typography variant="h6">{parse(blog.content)}</Typography>
//         </div>
//         <hr />
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Avatar />
//           <div style={{ marginLeft: "1rem" }}>
//             <Typography variant="subtitle1">{blog.username}</Typography>
//             <Typography variant="caption" fontStyle="italic">{blog.upload_date}</Typography>
//           </div>
//         </div>
//         <hr />
//         <div className="commentBox">
//           <CommentBox id={id} />
//         </div>
//         <CommentList comments={comments}/>
//       </div>
//      );
// }
 
// export default ViewBlog;


import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Card } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import CommentBox from "./CommentSkel";
import CommentList from "./GenerateComments";
import axios from "axios";
import parse from 'html-react-parser';

const ViewBlog = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);

      const ress = await axios.get(`http://localhost:5000/api/comments/${id}`);
      const rcomments = ress.data;
      const commentsData = rcomments.map((element, index) => ({
        id: index + 1,
        userAvatar: 'avatar1.png',
        userId: element.userId,
        date: element.uploadDatetime,
        text: element.commentBody
      }));
      setComments(commentsData);
    }

    fetchData();
  }, [id]);

  if (!blog || comments.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BlogView">
      {/* Render the blog and comments here */}
         <center><h1>ViewBlog</h1></center>
         <Card>
           <CardMedia
             component="img"
             height="200"
             image={blog.image}
             alt="Image description"
             style={{ borderRadius: "10px", height: "50vh" }}
           />
         </Card>                           
         <div className="topblog">
           <Typography variant="h4" >{blog.title}</Typography>
         </div>
         <hr />
         <div className="content">
           <Typography variant="h6">{parse(blog.content)}</Typography>
         </div>
         <hr />
         <div style={{ display: "flex", alignItems: "center" }}>
           <Avatar />
           <div style={{ marginLeft: "1rem" }}>
             <Typography variant="subtitle1">{blog.username}</Typography>
             <Typography variant="caption" fontStyle="italic">{blog.upload_date}</Typography>
           </div>
         </div>
         <hr />
         <div className="commentBox">
           <CommentBox id={id} />
         </div>
        <CommentList comments={comments}/>
    </div>
  );
}

export default ViewBlog;