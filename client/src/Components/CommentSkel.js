import { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/authContext";

//test
//test

const CommentBox = ({id}) => {
  const [comment, setComment] = useState("");
  const {currentUser} = useContext(AuthContext); 
  console.log(currentUser)
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if currentUser is not null
    if (currentUser) {
      axios.post(`http://localhost:5000/api/user/content/comment/${id}`, 
        { 
          username : currentUser.username, 
          comment : comment 
        },  
        { 
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          }
        }
      )
      console.log(id) 
      setComment("");
    } else {
      // Handle the case when currentUser is null
      console.log('User is not logged in');
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Leave a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button type="submit" variant="contained" color="primary" >
        Submit
      </Button>
    </form>
  );
};
export default CommentBox;
