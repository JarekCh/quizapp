import {React, useEffect, useState} from 'react'

const Questions = ( { question, answers, holdAnswer, isGameWon} ) => {    
    

    const allAnswers =  answers.map((answer, i) => {
        const {isTrue, isHeld} = answer
        let styles = {
            backgroundColor: answer.isHeld ? '#D6DBF5' : '',
            border: answer.isHeld ? 'none': '',
        }
        if(isTrue && isHeld && isGameWon){
            styles={
                backgroundColor: '#94D7A2',
                border: 'none',
            }
        }else if(!isTrue && isHeld && isGameWon) {
            styles = {
                backgroundColor: '#F8BCBC',
                border: 'none',
                opacity: 0.5,
            }                
        }  

        return (<span
                    style={styles}
                    onClick={holdAnswer}
                    key={i}
                    data-id={answer.id}
                >
                {answer.ans}
                </span>
              )
    });       

    return (
        <div className='question__container'>
            <h2 className='question__title'>{question}</h2>
            <div className='question__answerConatainer'>
                {isGameWon ? allAnswers : allAnswers}  
            </div>        
        </div>    
    )
}

export default Questions