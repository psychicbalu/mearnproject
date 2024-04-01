import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { fetchQuestion, updateQuestion } from '../../Services/Allapi'; // Assuming fetchQuestions retrieves all questions

function Editques({ questions, setQuestions }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [answerType, setAnswerType] = useState('text');
  const [answerOptions, setAnswerOptions] = useState(['']);
  const [editAnswer, setEditAnswer] = useState('');

  useEffect(() => {
    if (selectedQuestion !== null) {
      const question = questions.find(q => q.number === selectedQuestion);
      setEditQuestion(question.question);
      setAnswerType(question.answerType);
      setAnswerOptions(question.answerOptions || ['']);
      setEditAnswer(question.answer);
    }
  }, [selectedQuestion, questions]);

  const handleSelectQuestion = (number) => {
    setSelectedQuestion(number);
  };

  const handleSaveEdit = () => {
    if (selectedQuestion !== null && editQuestion.trim() !== '') {
      const updatedQuestionIndex = questions.findIndex(q => q.number === selectedQuestion);
      if (updatedQuestionIndex !== -1) {
        const updatedQuestion = {
          ...questions[updatedQuestionIndex],
          question: editQuestion,
          answerType,
          answerOptions: answerType === 'checkbox' ? answerOptions.filter(opt => opt.trim() !== '') : [],
          answer: editAnswer,
        };
  
        updateQuestion(updatedQuestion)
          .then(() => {
            // Assuming the backend returns the updated question object,
            // you can update the questions state with it
            const updatedQuestions = [...questions];
            updatedQuestions[updatedQuestionIndex] = updatedQuestion;
            setQuestions(updatedQuestions);
            setSelectedQuestion(null);
            setEditQuestion('');
            setAnswerType('text');
            setAnswerOptions(['']);
            setEditAnswer('');
          })
          .catch(error => console.error('Error updating question:', error));
      }
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
          <div key={index} className={`question-item ${selectedQuestion === q.number ? 'selected' : ''}`} onClick={() => handleSelectQuestion(q.number)}>
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
