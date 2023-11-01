import { useState } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Pagination } from "@mui/material";


const CommentList = ({ comments }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <List>
        {comments.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((comment) => (
          <ListItem key={comment.id}>
            <ListItemAvatar>
              <Avatar src={comment.userAvatar} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.userId}
              secondary={`Posted on ${new Date(comment.date).toLocaleDateString()}`}
            />
            <ListItemText primary={comment.text} />
          </ListItem>
        ))}
      </List>
      <Pagination count={Math.ceil(comments.length / itemsPerPage)} page={page} onChange={handleChange} />
    </div>
  );
};

export default CommentList;