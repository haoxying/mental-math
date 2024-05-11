'use client'

import { useState } from 'react';

export default function Home() {
  const [firstNumDigits, setFirstNumDigits] = useState(2);
  const [secondNumDigits, setSecondNumDigits] = useState(2);
  const [numQuestions, setNumQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');

  const generateQuestions = () => {
    const newQuestions = Array.from({length: numQuestions}, () => ({
      firstNumber: generateRandomNumber(firstNumDigits),
      secondNumber: generateRandomNumber(secondNumDigits),
      userAnswer: '',
      correct: false,
    }));
    setQuestions(newQuestions);
  };  

  const generateRandomNumber = (numDigits) => {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestion - 1].firstNumber + questions[currentQuestion - 1].secondNumber;
    if (questions[currentQuestion - 1].userAnswer == correctAnswer && !questions[currentQuestion - 1].correct) {
      const newQuestions = [...questions];
      newQuestions[currentQuestion - 1].correct = true;
      setQuestions(newQuestions);
      setScore(score + 1);
      setMessage('Correct');
    } else {
      setMessage('Incorrect');
    }
  };

return (
  <div className="container">
    <h1>Addition</h1>
    <div className="inner-container">
      <div className="flex-row">
        <label>Digits for first number:</label>
        <select className="select-input" onChange={(e) => setFirstNumDigits(e.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="flex-row">
        <label>Digits for second number:</label>
        <select className="select-input" onChange={(e) => setSecondNumDigits(e.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="flex-row">
        <label>Number of questions:</label>
        <input type="number" min="1" max="5" className="select-input" onChange={(e) => setNumQuestions(e.target.value)} />
      </div>
    </div>
    <button className="button" onClick={generateQuestions}>OK</button>
    {questions.length > 0 && (
      <>
        <p className="bold-text">{`${questions[currentQuestion - 1].firstNumber} + ${questions[currentQuestion - 1].secondNumber} = ?`}</p>
        <label>Your answer:</label>
        <input type="text" value={questions[currentQuestion - 1].userAnswer} onChange={(e) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion - 1].userAnswer = e.target.value;
    setQuestions(newQuestions);
  }} />
        <p style={{color: questions[currentQuestion - 1].correct ? 'green' : 'red'}}>{message}</p>
        <div className="button-row">
    <button className="button" onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 1}>Previous</button>
    <button className="button" onClick={checkAnswer}>Submit</button>
    <button className="button" onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion === numQuestions}>Next</button>
  </div>
      </>
    )}
    <p className="bold-text">Score: {score} / {numQuestions}</p>
  </div>
);
}