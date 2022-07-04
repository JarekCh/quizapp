import React from 'react'

const Questions = ( { question, answers, holdAnswer } ) => {

    const allAnswers = answers.map((answer, i) => {
        const styles = {
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
    // TODO : map over array question lenght (4/2 questions)
    

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