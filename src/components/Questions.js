import {React, useEffect} from 'react'

const Questions = ( { question, answers, holdAnswer, isGameWon} ) => {

    useEffect(() => {
        console.log('gra sie')
    }, [isGameWon])
    

    const allAnswers =  answers.map((answer, i) => {
        let styles = {
            backgroundColor: answer.isHeld ? '#D6DBF5' : '',
            border: answer.isHeld ? 'none': '',
        }
        return(<span
                    style={styles}
                    onClick={holdAnswer}
                    key={i}
                    data-id={answer.id}
                >{answer.ans}</span>
              )
    });    
    

    return (
        <div className='question__container'>
            <h2 className='question__title'>{question}</h2>
            <div className='question__answerConatainer'>
                {allAnswers}  
            </div>        
        </div>
    

    
  )
}

export default Questions