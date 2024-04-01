import React, { useEffect, useState } from 'react';
import './createque.css';
import { MDBTextArea, MDBCheckbox, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { uploadQuestions  } from '../../Services/Allapi'; 

function Createque() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerType, setAnswerType] = useState('text');
  const [answerOptions, setAnswerOptions] = useState(['']);
  const [answers, setAnswers] = useState('');


  

  const handleAddOption = () => {
    setAnswerOptions([...answerOptions, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...answerOptions];
    newOptions.splice(index, 1);
    setAnswerOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...answerOptions];
    newOptions[index] = value;
    setAnswerOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      let question;
      if (answerType === 'truefalse') {
        question = {
          number: questions.length + 1,
          question: newQuestion,
          answerType,
          answer: answers === 'true' ? true : false,
        };
      } else if (answerType === 'checkbox') {
        const filteredOptions = answerOptions.filter(opt => opt.trim() !== '');
        question = {
          number: questions.length + 1,
          question: newQuestion,
          answerType,
          answerOptions: filteredOptions,
          answer: '', // Since checkboxes allow multiple answers, set it as an empty string initially
        };
      } else {
        question = {
          number: questions.length + 1,
          question: newQuestion,
          answerType,
          answerOptions: [], // For text type, answerOptions should be an empty array
          answer: answers, // For text type, answer should be a string
        };
      }
      setQuestions([...questions, question]);
      setNewQuestion('');
      setAnswerOptions(['']);
      setAnswers('');
    }
  };
  

  const handleAnswerTypeChange = (type) => {
    setAnswerType(type);
    if (type !== 'text') {
      setAnswerOptions(['']); // Reset answer options when answer type changes
    }
    setAnswers('');
  };

  const handleAnswersChange = (e) => {
    setAnswers(e.target.value);
  };

  const handleSaveQuestions = async () => {
    // Convert questions array to JSON format
    const questionsData = JSON.stringify(questions);
    
    // Upload questions to the server using Axios
    try {
      await uploadQuestions(questionsData);
      console.log('Questions uploaded successfully');
    } catch (error) {
      console.error('Error uploading questions:', error);
    }
  };


 

  return (
    <div className="container">
      <h1>Create Question</h1>
      <div className="question-list">
        {questions.map((q, index) => (
          <div key={index} className="question-item">
            <p>Question {q.number}: {q.question}</p>
            <p>Answer Type: {q.answerType === 'truefalse' ? 'True/False' : q.answerType}</p>
            {q.answerType === 'checkbox' && (
              <div>
                <p>Options:</p>
                <ul>
                  {q.answerOptions.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input">
        <MDBTextArea
          label='Question'
          id='form1'
          type='textarea'
          className="auto-height-input"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Answer Type:</label>
        <select value={answerType} onChange={(e) => handleAnswerTypeChange(e.target.value)}>
          <option value="text">Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="truefalse">True/False</option>
        </select>
      </div>
      {answerType !== 'text' && (
        <div>
          {answerType === 'checkbox' && (
            <div className="input">
              <label>Options:</label>
              {answerOptions.map((opt, index) => (
                <div key={index} className="option-input">
                  <MDBInput
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <br />
                  <MDBBtn type="button" onClick={() => handleRemoveOption(index)}>Remove</MDBBtn>
                </div>
              ))}
              <MDBBtn type="button" onClick={handleAddOption}>Add Option</MDBBtn>
            </div>
          )}
          {answerType === 'truefalse' && (
            <div className="input">
              <select value={answers} onChange={handleAnswersChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          )}
        </div>
      )}
      <div className="btn-group">
        <MDBBtn onClick={handleAddQuestion}>Add Question</MDBBtn>
        <MDBBtn onClick={handleSaveQuestions}>Save Questions</MDBBtn>
      </div>
    </div>
  );
}

export default Createque;
