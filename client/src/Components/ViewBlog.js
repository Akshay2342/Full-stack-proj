import { Typography } from "@mui/material";
import {Avatar} from "@mui/material";
import {Card} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import CommentBox from "./CommentSkel";
import CommentList from "./GenerateComments";
import axios from "axios";
import parse from 'html-react-parser';


//some object instances wit blog id title content

// const blog = {
//   id: 1,
//   title: "Blog Title",
//   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ipsam quis dolores, porro reprehenderit consequatur saepe perspiciatis vel numquam praesentium dolorum ut obcaecati deserunt ipsa laboriosam ad? Fugiat alias dolore consequatur similique aperiam praesentium officia esse eum ex, cum rem animi laborum! Modi voluptatum suscipit placeat esse quo iure, unde magnam similique consequatur sunt tempora dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi animi libero dolore velit porro molestiae aspernatur vero consequatur quibusdam odio, voluptates esse. Neque eos consectetur quasi dolorem. Accusamus aliquid ratione quam, quae repellat asperiores dolore voluptatibus, adipisci, aspernatur repellendus dicta rerum ab voluptatem ut similique? Iure nostrum blanditiis ad eos animi maxime nisi, et quo deserunt nulla dolore qui tempore, quisquam obcaecati laboriosam veniam beatae error eius.",
//   upload_date: "2021-10-18",
//   username: "username",
//   image: "https://picsum.photos/200/300",
// };


//test
const id = 1;
//test


const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
const blog = res.data;
console.log(blog);
const comments = [
  { id: 1, userAvatar: 'avatar1.png', userId: 'user1', date: '2022-01-01', text: 'This is a comment' },
  { id: 2, userAvatar: 'avatar2.png', userId: 'user2', date: '2022-01-02', text: 'This is another comment' },
  //generate some examples of comments
  { id: 3, userAvatar: 'avatar3.png', userId: 'user3', date: '2022-01-03', text: 'This is a comment' },
  { id: 4, userAvatar: 'avatar4.png', userId: 'user4', date: '2022-01-04', text: 'This is another comment' },
];


const ViewBlog = () => {
    return (
      <div className="BlogView">
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