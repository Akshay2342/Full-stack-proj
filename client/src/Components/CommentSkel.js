import { useState } from "react";
import { TextField, Button } from "@mui/material";

const CommentBox = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment); // Replace with your own logic
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