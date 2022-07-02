import { useState, useEffect } from 'react';
import Questions from './components/Questions';
import StartingPage from './components/StartingPage';

import { nanoid } from 'nanoid';
import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';



// TODO : map questions over sueState variable lenght

function App() {
  const [initialData, setInitialData] = useState({
    loggedIn: true,    
  });
  const [questions, setQuestions] = useState(null);      
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  //destructuring
  const { loggedIn } = initialData;  
  

  useEffect(() => {
     getQuizQuestion()
       .then(({results}) => setQuestions(results.map((result) => {
        const correctAnsw = {          
          ans: result.correct_answer,
          isTrue: true          
        };
        const incorrectAnsw = result.incorrect_answers.map((answer, i) => ({ 
          ans: answer, 
          isTrue: false 
        }))
        return {
          id: nanoid(),
          question: result.question,
          answers: [correctAnsw, ...incorrectAnsw]
        }
       }))) 
  }, []);  

  const displayQiestions = questions?.map(question =>    
   (<Questions       
      isAnswerChecked={isAnswerChecked}
      question={question.question}      
      key={question.id}
      answer0={question.answers[0].ans} 
      answer1={question.answers[1].ans}          
      answer2={question.answers[2].ans} 
      answer3={question.answers[3].ans}       
    />
    )
  )
  
  console.log(displayQiestions)

  return (
    <main className="App">
      {loggedIn ? 
        <main className='main__page'>
          {displayQiestions}
          {/* question comp on starting screen */}
          <div className='btn__container'>
            {/* contidional score rendering */}
            {/* btn with conditional rendering text check answers -> play again */}
            {isGameWon && <h2>You scored 3/5 correct answers</h2>}
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
