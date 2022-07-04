import { useState, useEffect } from 'react';
import Questions from './components/Questions';
import StartingPage from './components/StartingPage';

import { nanoid } from 'nanoid';
import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';



// TODO : map questions over sueState variable lenght

const initialDataValue = {
  loggedIn: true,
  amount: '10',
  type: 'multiple',
  category: '0',
  difficulty: 'easy'
};

function App() {
  const [initialData, setInitialData] = useState(initialDataValue);  
  const [questions, setQuestions] = useState(null);  
  const [isGameWon, setIsGameWon] = useState(false);


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

  function holdAnswer(id) {
    setQuestions(oldQuestions => oldQuestions.map()
    )
  }

  const displayQiestions = questions?.map(question =>  { 
    const { answers } = question; 
    const testfun =  answers.map(answer => answer)

    return  (<Questions
            question={question.question}      
            key={question.id}
            answers={testfun}           
          />
    )}
  );
 

  return (
    <main className="App">
      {loggedIn ? 
        <main className='main__page'>
          {displayQiestions}
          {/* question comp on starting screen */}
          <div className='btn__container'>
            {/* contidional score rendering */}
            {/* btn with conditional rendering text check answers -> play again */}
            {isGameWon && <h2>You scored 3/{questions?.length} correct answers</h2>}
            <button className='app__btn'>test button</button>
          </div>
        </main>
      :
        <StartingPage />
      }
    </main>
  );
}

export default App;
