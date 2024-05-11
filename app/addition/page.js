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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif'}}>
  <h1>Addition</h1>
<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', margin: '0 auto'}}>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0'}}>
    <label>Digits for first number:</label>
    <select style={{padding: '5px', borderRadius: '5px'}} onChange={(e) => setFirstNumDigits(e.target.value)}>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0'}}>
    <label>Digits for second number:</label>
    <select style={{padding: '5px', borderRadius: '5px'}} onChange={(e) => setSecondNumDigits(e.target.value)}>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0'}}>
    <label>Number of questions:</label>
    <input type="number" min="1" max="5" style={{padding: '5px', borderRadius: '5px'}} onChange={(e) => setNumQuestions(e.target.value)} />
  </div>
</div>
  <button style={{padding: '10px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', margin: '10px 0'}} onClick={generateQuestions}>OK</button>
  {questions.length > 0 && (
    <>
      <p style={{fontSize: '20px', fontWeight: 'bold'}}>{`${questions[currentQuestion - 1].firstNumber} + ${questions[currentQuestion - 1].secondNumber} = ?`}</p>
      <label style={{margin: '10px 0'}}>Your answer:</label>
      <input type="text" value={questions[currentQuestion - 1].userAnswer} onChange={(e) => {
  const newQuestions = [...questions];
  newQuestions[currentQuestion - 1].userAnswer = e.target.value;
  setQuestions(newQuestions);
}} />
      <p style={{color: questions[currentQuestion - 1].correct ? 'green' : 'red'}}>{message}</p>
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0'}}>
  <button style={{padding: '10px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', margin: '5px'}} onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 1}>Previous</button>
  <button style={{padding: '10px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', margin: '5px'}} onClick={checkAnswer}>Submit</button>
  <button style={{padding: '10px', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', margin: '5px'}} onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion === numQuestions}>Next</button>
</div>
    </>
  )}
  <p style={{fontSize: '20px', fontWeight: 'bold'}}>Score: {score} / {numQuestions}</p>
</div>
  );
}