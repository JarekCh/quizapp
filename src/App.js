import { useState, useEffect } from 'react';
import Questions from './components/Questions';
import StartingPage from './components/StartingPage';

import { nanoid } from 'nanoid';
import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';


function App() {
  const initialDataValue = {
    loggedIn: false,
    amount: '5',
    type: 'multiple',
    category: '0',
    difficulty: 'easy',
    name: 'John Doe',
  };

  const [initialData, setInitialData] = useState(
    JSON.parse(localStorage.getItem("initialData")) || {});      
  const [questions, setQuestions] = useState(null);    
  const [isGameWon, setIsGameWon] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  


  //destructuring
  const { loggedIn, amount, type, difficulty, category, name } = initialData;  
  

  useEffect(() => {
     getQuizQuestion(amount, type, category, difficulty)
       .then(({results}) => setQuestions(results.map((result) => {
        const correctAnsw = {          
          id: nanoid(),
          ans: result.correct_answer,
          isTrue: true,
          isHeld: false        
        };
        const incorrectAnsw = result.incorrect_answers.map((answer, i) => ({ 
          id: nanoid(),
          ans: answer, 
          isTrue: false,
          isHeld: false,
        }))
        const rand =[correctAnsw, ...incorrectAnsw].sort(() => Math.random() - 0.5);
        return {
          id: nanoid(),
          question: result.question,
          answers: rand
        }
       }))) 
  }, [amount, type, difficulty, category]);  

  useEffect(() => {
    localStorage.setItem("initialData", JSON.stringify(initialData))
  }, [initialData])
  


  function initialDataSetter(...args){    
    setInitialData(...args);
    setIsGameWon(false);
  }

  function holdAnswer(e) {   
    if(isGameWon) return            
    setQuestions(oldQuestions => oldQuestions.map(question => {
      const some = question.answers.some(e => e.isHeld)
      if(some) return question
      
      const answers = question.answers.map(answer => {
        return answer.id === e ?
          {...answer,   isHeld: !answer.isHeld} : answer
      });

        return ({...question, answers});      
    }));
  }

  function checkAnswers() {
      if(isGameWon) {        
        window.location.reload(false);
      }  
      for(let i = 0; i < questions.length; i++) {
        questions[i].answers.forEach((answer) => {
          if(answer.isTrue && answer.isHeld) {
            setCorrectAnswerCount((prevCount => prevCount + 1));
          };
        });
      };
      setIsGameWon(true)
  };  
  
  function setNewParams() {
    setInitialData(initialDataValue);
  }

  const displayQuestions =  questions?.map(question =>  { 
    const { answers } = question; 
    const dynamicAnswers =  answers.map(answer => answer);        

    return  (<Questions
            question={question.question}      
            key={question.id}
            answers={dynamicAnswers}  
            holdAnswer={(e) => holdAnswer(e.target.dataset.id)}
            isGameWon={isGameWon}            
          />
    )}
  ); 

  return (
    <main className="App">
      {loggedIn ? 
        <main className='main__page'>
          {displayQuestions}          
          <div className='btn__container'>   
            <button className='app_btn'
               onClick={setNewParams}>Set new parameters</button>
            {isGameWon && <h2>{name}, you scored {correctAnswerCount}/{questions?.length} correct answers</h2>}
            <button 
              className='app__btn' 
              onClick={checkAnswers}>{isGameWon ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </main>
      :
        <StartingPage 
          initialDataSetter={initialDataSetter}
        />
      }
    </main>
  );
}

export default App;
