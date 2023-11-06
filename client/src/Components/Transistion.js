import { ButtonGroup, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Alert from '@mui/material/Alert';

const contentObjects = [
  //some examples
  { id: 1, title: 'title1', content: 'content1' },
  
  { id: 2, title: 'title2', content: 'content2' },
  // ...
  { id: 3, title: 'title3', content: 'content3'},
  { id: 4, title: 'title4', content: 'content4'},
  {id: 5, title: 'title5', content: 'content5'}
];

// Extract the 'id' values into a separate array using map
const ids = contentObjects.map(content => content.id.toString());

function RenderItem({ item, handleRemoveitem }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveitem(item)}
        >
          <DeleteIcon />
       
        </IconButton>
      }
    >
      {item.newCourseId}
         <div>
        <strong>ID:</strong> {item.newCourseId} <br />
        <strong>Title:</strong> {item.StepContent} <br />
        <strong>Description:</strong> {item.Title}
      </div>
    </ListItem>
  );
}

export default function TransitionGroupExample() {
  const [items , setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [StepTitle, setStepTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItems = () => {
    if (inputValue && !items.some(item => item.newCourseId === inputValue)) {
      setItems([{newCourseId : inputValue,StepContent : description , "Title" : StepTitle}, ...items]);
      setInputValue('');
      setStepTitle('');
      setDescription('');
    }
  };

  const handleRemoveItem = (item) => {
    setItems((prev) => prev.filter((i) => i.newCourseId !== item.newCourseId));
  };

  const createCourse = () => {
    //create course with items
    console.log(items);
  }

  const addItemButton = (
    <Button
      variant="contained"
      disabled={!inputValue || items.some(item => item.newCourseId === inputValue)}
      onClick={handleAddItems}
      aria-required 
    >
      Add Content
    </Button>
  );

  return (
    <center>
      <div className='testi'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...ids,""]}
          sx={{ width: 300 }}
          value={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="ContentID" />}
          isOptionEqualToValue={(option, value) => option === value}
        />
        <TextField label="StepTitle" value={StepTitle} onChange={(e) => setStepTitle(e.target.value)} />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {addItemButton}
        <List sx={{ mt: 1 }}>
          <TransitionGroup>
            {items.map((item) => (
              <Collapse key={item.newCourseId}>
                <RenderItem item={item} handleRemoveitem={() => handleRemoveItem(item)} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </div>
      <Button variant="outlined" onClick={createCourse}>Create New Course</Button>
    </center>
  );
}
