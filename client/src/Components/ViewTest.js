import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { blueGrey } from '@mui/material/colors';


const color = blueGrey[100]

const questions = [
    {
      questionText: "What is the capital of France?",
      options: ["London", "Madrid", "Paris", "Berlin"],
      correctAnswer: "Paris",
      marks: 2, // Question is worth 2 marks
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Mars",
      marks: 1, // Question is worth 1 mark
    },
    {
      questionText: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare",
      marks: 3, // Question is worth 3 marks
    },
    {
      questionText: "What is the largest mammal in the world?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
      correctAnswer: "Blue Whale",
      marks: 2, // Question is worth 2 marks
    },
  ];
  

const QuestionPages = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));
  const [helperTexts, setHelperTexts] = useState(Array(questions.length).fill(''));
  const [errorStates, setErrorStates] = useState(Array(questions.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [total,settotal] = useState(0);  

  const handleRadioChange = (event, index) => {
    const selectedAnswer = event.target.value;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = selectedAnswer;
      return newAnswers;
    });
    if (submitted) {
      validateQuestion(index, selectedAnswer);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setSubmitted(true);
    let total = 0;
    questions.forEach((_, index) => {
      validateQuestion(index, selectedAnswers[index]);
    });
  };
  
  const validateQuestion = (index, selectedAnswer) => {
    const question = questions[index];
    if (selectedAnswer === question.correctAnswer) {
        settotal((prevTotalMarks) => prevTotalMarks + question.marks)

        setHelperTexts((prevTexts) => {
        const newTexts = [...prevTexts];
        newTexts[index] = 'You got it!';
        return newTexts;
      });
      setErrorStates((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = false;
        return newErrors;
      });
    } else {
      setHelperTexts((prevTexts) => {
        const newTexts = [...prevTexts];
        newTexts[index] = ' wrong answer!';
        return newTexts;
      });
      setErrorStates((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = true;
        return newErrors;
      });
    }
  };

  return (
    <div className="lst_of_ques">
    
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
           <Card key ={index} sx={{ // Add your card styles here
            width: 'auto', // Adjust the width as needed
            // margin: 'auto', // Center the card horizontally
            marginTop : 1,
            // marginLeft : '5px',
            padding: 3, // Adjust the padding as needed
            backgroundColor : color,
        }}>
            <div className="topQ">
            <h3>{question.questionText}</h3>
            <h3>{question.marks} Marks</h3>
            </div>
            <RadioGroup
              name={`question_${index}`}
              value={selectedAnswers[index]}
              onChange={(e) => handleRadioChange(e, index)}
            >
              {question.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {submitted && <FormHelperText error={errorStates[index]}>{helperTexts[index]}</FormHelperText>}
          </Card>
        ))}
        <Button type="submit" variant="outlined">
          Check Answers
        </Button>
      </form>
      { submitted && <h3>Total Marks : {total}</h3>}
    </div>
  );
};

export default QuestionPages;
