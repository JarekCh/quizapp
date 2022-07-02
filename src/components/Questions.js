import React from 'react'

const Questions = ( { isAnswerChecked, question, answer0, answer1, answer2, answer3 } ) => {
    // TODO : map over array question lenght (4/2 questions)
    console.log( isAnswerChecked, question, answer0, answer1, answer2, answer3)

    return (
        <div className='question__container'>
            <h2 className='question__title'>{question}</h2>
            <div className='question__answerConatainer'>
                <span>{answer0}</span>
                <span>{answer1}</span>
                <span>{answer2}</span>
                <span>{answer3}</span>
            </div>        
        </div>
    

    
  )
}

export default Questions