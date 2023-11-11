import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

//test
const username = 'ak_47'
//test

const CommentBox = ({id}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`http://localhost:5000/api/user/content/comment/${id}`,{ username : username, comment : comment })
    console.log(id) 
    setComment("");
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
