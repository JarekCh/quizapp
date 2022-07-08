import { useState, useEffect } from 'react';
import Questions from './components/Questions';
import StartingPage from './components/StartingPage';

import { nanoid } from 'nanoid';
import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';



// TODO : map questions over sueState variable lenght

const initialDataValue = {
  loggedIn: true,
  amount: '5',
  type: 'multiple',
  category: '0',
  difficulty: 'easy'
};

function App() {
  const [initialData, setInitialData] = useState(initialDataValue);  
  const [questions, setQuestions] = useState(null);      
  const [isGameWon, setIsGameWon] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  


  //destructuring
  const { loggedIn, amount, type, difficulty, category } = initialData;  
  

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
        return {
          id: nanoid(),
          question: result.question,
          answers: [correctAnsw, ...incorrectAnsw]
        }
       }))) 
  }, [amount, type, difficulty, category]);  

  function holdAnswer(e) {              
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
      if(correctAnswerCount === questions.length)  
      for(let i = 0; i < questions.length; i++) {
        questions[i].answers.forEach((answer) => {
          if(answer.isTrue && answer.isHeld) {
            setCorrectAnswerCount((prevCount => prevCount + 1));
          };
        });
      };
      setIsGameWon(true)
  };  

  const displayQuestions =  questions?.map(question =>  { 
    const { answers } = question; 
    const dynamicAnswers =  answers.map(answer => answer)

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
          {/* question comp on starting screen */}
          <div className='btn__container'>
            {/* contidional score rendering */}
            {/* btn with conditional rendering text check answers -> play again */}
            {isGameWon && <h2>You scored {correctAnswerCount}/{questions?.length} correct answers</h2>}
            <button className='app__btn' onClick={checkAnswers}>{isGameWon ? 'Play again' : 'Check answers'}</button>
          </div>
        </main>
      :
        <StartingPage />
      }
    </main>
  );
}

export default App;
