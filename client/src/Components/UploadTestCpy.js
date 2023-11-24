import AddIcon from '@mui/icons-material/Add';
import { Card, Fab } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import{ Button }from '@mui/material';
import Alert from '@mui/material/Alert';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';

const initialQuestion = {
    question : '',
    // option1 : '',
    // option2 : '',
    // option3 : '',
    // option4 : '',
    options :['','','',''],
    correctAns : '',
    order : 0,
};
const UploadTestCpy = ()=>{

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [order,setorder] = useState(0);
    const [questionList , setquestionList] = useState([]);
    const [newQuestion,setnewQuestion] = useState({...initialQuestion});
    const { enqueueSnackbar } = useSnackbar();
    const [title,setTitle] = useState('');

    const addQues = ()=>{
        setorder(order+1);
        setnewQuestion({
            ...newQuestion,
            order: order,
          });
        setquestionList([...questionList, newQuestion]);
        setnewQuestion({...initialQuestion});
        toggleForm();
        // seta(true);
        handleClickVariant('primary ');
    }

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };
    const handleQuestionChange = (e) =>{
        setnewQuestion({
            ...newQuestion,
            question: e.target.value,
          });
    }
//    const handleOption1 = (e) => {
//     setnewQuestion({
//         ...newQuestion,
//         option1: e.target.value,
//     });
// };

// const handleOption2 = (e) => {
//     setnewQuestion({
//         ...newQuestion,
//         option2: e.target.value,
//     });
// };

// const handleOption3 = (e) => {
//     setnewQuestion({
//         ...newQuestion,
//         option3: e.target.value,
//     });
// };

// const handleOption4 = (e) => {
//     setnewQuestion({
//         ...newQuestion,
//         option4: e.target.value,
//     });
// };
const username = "akshay";
const handleOptionChange = (e, index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = e.target.value;
    setnewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };
// }
const handleCorrectAnswer = (e)=>{
    setnewQuestion({
        ...newQuestion,
        correctAns: e.target.value,
      });
}
const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };
  const handleSubmit = ()=>{
    const date = new Date();
   const dateString =date.toISOString().split('T')[0];
    const it = {
      title : title,  
      date : dateString,
      user : username,
      questions : questionList
    }
    try {
      axios.post("http://localhost:5000/api/user/content/tests",it)
    } catch (e) {
      
    }
  }
    

    return ( 
        <>
        <div className="layout">
        <h1>Upload Test</h1>

        <TextField
          required
          id="outlined-required"
          label="Title"
          placeholder="Title Of the Test"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        
        
        <div>
          {/* Display the list of questions */}
          {questionList.map((question, order) => (
            <div key={question.order}>
              <h3>{question.question}</h3>
              <h3>{[...question.options]}</h3>
              <h3>{question.correctAns}</h3>
            </div>
          ))}
        </div>

        {/* Form to add a new question */}

        {isFormVisible && (<><TextField
          label="Question"
          fullWidth
          margin="normal"
          value={newQuestion.question}
          onChange={handleQuestionChange}
        />
     {/* Taking Options aa Input */}
        <TextField
        label="Option 1"
        fullWidth
        value={newQuestion.option1}
        // onChange={(e) => handleOption1}
        onChange={(e) => handleOptionChange(e,0)}

      />
      <TextField
        label="Option 2"
        fullWidth
        value={newQuestion.option2}
        // onChange={(e) => handleOption2}
        onChange={(e) => handleOptionChange(e,1)}

      />
      <TextField
        label="Option 3"
        fullWidth
        value={newQuestion.option3}
        // onChange={(e) => handleOption3}
        onChange={(e) => handleOptionChange(e,2)}

      />
      <TextField
        label="Option 4"
        fullWidth
        value={newQuestion.option4}
        // onChange={(e) => handleOption4} 
        onChange={(e) => handleOptionChange(e,3)}

             />
      <TextField
        label="Seletect Correct option Number"
        fullWidth
        value={newQuestion.correctAns}
        onChange={handleCorrectAnswer}
      />
      

        <Button variant="contained" color="primary" onClick={addQues}>
          Submit Question
        </Button></>)}


        {!isFormVisible && (
    <Tooltip title="Add A New Question" placement="top">
    <Fab
      color="secondary"
      sx={{
        position: 'absolute',
        bottom: (theme) => theme.spacing(4),
        right: (theme) => theme.spacing(2),
        marginRight: 'calc(15%)',
      }}
      onClick={toggleForm}
    >
      <AddIcon />
    </Fab>
  </Tooltip>
    )}

      {/* {a && (        <Alert severity="success">This is a success message!</Alert>
)} */}
    <SnackbarProvider maxSnack={3}>
    </SnackbarProvider>
      <button onClick={handleSubmit}>submit</button>
      </div>
      </>
     );
}
 
export default UploadTestCpy;











