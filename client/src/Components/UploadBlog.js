import ReactQuill from "react-quill";
import { useContext, useState } from "react";
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser';
import  TextField  from "@mui/material/TextField";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const UploadBlog = () => {
  const [title,setTitle] = useState('');
    const [value ,setValue] = useState('');
    const {currentUser} = useContext(AuthContext);
    
    const handleClick=() =>{
    let date = new Date();
    let dateString = date.toISOString().split('T')[0];

        console.log(currentUser);
      try {
        
        axios.post('http://localhost:5000/api/user/content/blogs', 
        { 
          title : title, 
          content: value , 
          user: currentUser.username, 
          date : dateString 
        },
        { 
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          }
        }
      )
    } catch (e) {}


   }
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],  
                               // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ["link","image","video"],
        ['clean'],                                         // remove formatting button
      ];
      const module = {
        toolbar : toolbarOptions,
      }


    return (
        <div className= "editor">
          <center><h1> Upload Your Blog here:</h1></center>
          <TextField 
  required 
  id="outlined-basic" 
  label="Enter Title" 
  variant="outlined" 
  style={ {marginBottom : "20px"} } 
  value={title} 
  onChange={e => setTitle(e.target.value)}  // change this line
/>

<ReactQuill   
  placeholder="write your thoughts" 
  modules={module}  
  theme="snow" 
  value={value} 
  onChange={content => setValue(content)}  // and this line
/>
            <div className="dis"> {parse(value)}</div>
            <button type="submit" onClick={handleClick}>Post Blog</button>
        </div>
    );
}
 
export default UploadBlog;
