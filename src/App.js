import { useState, useEffect } from 'react';
import Questions from './components/Questions';

import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';
import StartingPage from './components/StartingPage';


// TODO : map questions over sueState variable lenght

function App() {
  const [initialData, setInitialData] = useState({
    loggedIn: true,    
  });
  const [questions, setQuestions] = useState({});    
  console.log("🚀 ~ file: App.js ~ line 16 ~ App ~ questions", questions)
  const [isGameWon, setIsGameWon] = useState(false);

  const { loggedIn } = initialData;  

  useEffect(() => {
     getQuizQuestion()
       .then(({results}) => setQuestions(results.map((result) =>{
        const correctAnsw = {ans: result.correct_answer, isTrue: true};
        const incorrectAnsw = result.incorrect_answers.map((answer, i) => ({ans: answer, isTrue: false }))
        return {
          question: result.question,
          answers: [correctAnsw, ...incorrectAnsw]
        }
       }))) 
  }, []);  

  return (
    <main className="App">
      {loggedIn ? 
        <>
          <Questions />
          <Questions />
          <Questions />
          <Questions />
          <Questions />
          <div>Question: {questions[0]?.question}</div>       
          {/* question comp on starting screen */}
          <div className='btn__container'>
            {/* contidional score rendering */}
            {/* btn with conditional rendering text check answers -> play again */}
            {isGameWon && <h2>You scored 3/5 correct answers</h2>}
            <button className='app__btn'>test button</button>
          </div>
        </>
      :
        <StartingPage />
      }
    </main>
  );
}

export default App;
