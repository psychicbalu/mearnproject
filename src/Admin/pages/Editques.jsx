import React, { useState } from 'react';
import { MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

function Editques({ questions }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [answerType, setAnswerType] = useState('text');
  const [answerOptions, setAnswerOptions] = useState(['']);
  const [editAnswer, setEditAnswer] = useState('');

  const handleSelectQuestion = (index) => {
    setSelectedQuestion(index);
    setEditQuestion(questions[index].question);
    setAnswerType(questions[index].answerType);
    if (questions[index].answerType === 'checkbox') {
      setAnswerOptions(questions[index].answerOptions);
    } else {
      setAnswerOptions(['']);
    }
    setEditAnswer(questions[index].answer);
  };

  const handleSaveEdit = () => {
    if (selectedQuestion !== null && editQuestion.trim() !== '') {
      const updatedQuestions = [...questions];
      updatedQuestions[selectedQuestion] = {
        ...updatedQuestions[selectedQuestion],
        question: editQuestion,
        answerType,
        answerOptions: answerType === 'checkbox' ? answerOptions.filter(opt => opt.trim() !== '') : [],
        answer: editAnswer,
      };
      // Update the questions state if needed
      // setQuestions(updatedQuestions);
      // localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      setSelectedQuestion(null);
      setEditQuestion('');
      setAnswerType('text');
      setAnswerOptions(['']);
      setEditAnswer('');
    }
  };

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

  return (
    <div className="container">
      <h1>Edit Question</h1>
      <div className="question-list">
        {questions.map((q, index) => (
          <div key={index} className={`question-item ${selectedQuestion === index ? 'selected' : ''}`} onClick={() => handleSelectQuestion(index)}>
            <p>Question {q.number}: {q.question}</p>
            <p>Answer: {q.answer}</p>
          </div>
        ))}
      </div>
      {selectedQuestion !== null && (
        <div className="input">
          <MDBTextArea
            label='Question'
            id='form1'
            type='textarea'
            className="auto-height-input"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <label>Answer Type:</label>
          <select value={answerType} onChange={(e) => setAnswerType(e.target.value)}>
            <option value="text">Text</option>
            <option value="checkbox">Checkbox</option>
            <option value="truefalse">True/False</option>
          </select>
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
                      <MDBBtn type="button" onClick={() => handleRemoveOption(index)}>Remove</MDBBtn>
                    </div>
                  ))}
                  <MDBBtn type="button" onClick={handleAddOption}>Add Option</MDBBtn>
                </div>
              )}
              <div className="input">
                <MDBInput
                  label='Answer'
                  id='form2'
                  type='text'
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                />
              </div>
            </div>
          )}
          <MDBBtn onClick={handleSaveEdit}>Save Edit</MDBBtn>
        </div>
      )}
    </div>
  );
}

export default Editques;
