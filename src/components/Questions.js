import React from 'react'

const Questions = ( { question, answers } ) => {
    // const styles = {
    //     backgroundColor: isHeld ? '#D6DBF5' : '',
    //     border: 'none',
    // }

    const allAnswers = answers.map((answer) => (
        <span
            // style={styles}
        >{answer.ans}</span>
    ));
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