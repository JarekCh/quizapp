import React from 'react'

const Questions = ( { isAnswerChecked, question, answer } ) => {
console.log("🚀 ~ file: Questions.js ~ line 4 ~ Questions ~ answer0", answer)
    // TODO : map over array question lenght (4/2 questions)
    

    return (
        <div className='question__container'>
            <h2 className='question__title'>{question}</h2>
            <div className='question__answerConatainer'>
                <span>{answer[0]}</span>
                <span>{answer[1]}</span>
                <span>{answer[2]}</span>
                <span>{answer[3]}</span>
            </div>        
        </div>
    

    
  )
}

export default Questions