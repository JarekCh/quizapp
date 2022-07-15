import React, { useState, useRef } from 'react';
import {filterData} from '../utils/filterData'
import { motion } from 'framer-motion';
import { FaCheck, FaQuestion, FaExclamation } from 'react-icons/fa';
import Form from './Form';

//TODO:
// set css for form
// make new component for form

const StartingPage = ( { initialDataSetter } ) => {
  const [filters] = useState(filterData);
  const [formData, setFormData] = useState({
    loggedIn: true,
    amount: '',
    type: '',
    category: '',
    difficulty: '',
    name: '',
  });
  const changeNumber = useRef();

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value
      }
    });
  }; 

  function handleSubmit(e) {    
    e.preventDefault()
    if(formData.amount < 3 || formData.amount > 15) {
      changeNumber.current.focus();
      changeNumber.current.value = 'Pick number, 3-15'
      return
    }
    initialDataSetter(formData);
  };  
  
  return (
    <main className='startingPage__container'>            
      <div className='startingPage__animationContainer'>              
        <motion.div className='startingPage__okCloud'
          animate={{
            y: [0, -20, 0],
            x: [0 , -15, 0]
          }}  
          transition={{
            repeat: Infinity,
            duration: 4
          }}
          initial={{
            rotate: -15
           }}
        >   
          <FaCheck size='30px' />      
        </motion.div>
        <motion.div className='startingPage__questionMarkCloud'
           animate={{
             y: [-10, -30, -10]
            }}
            transition={{
             repeat: Infinity,
             duration: 4,
             delay: 0.5
           }}
           initial={{
            y: -10
           }}
        >
          <FaQuestion size='30px'/>
        </motion.div>
        <motion.div className='startingPage__exclamationMarkCloud'
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0]
          }}  
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: 0.75
          }}
          initial={{
            rotate: 15
           }}          
        >
          <FaExclamation size='30px'/>
        </motion.div>
      </div>
      <motion.h1
        animate={{scale: 1}}
        initial={{scale: 0}} 
        transition={{duration: 1.5}}       
      >
        <span className='startingPage__letterGreen'>Q</span>
        <span className='startingPage__letterRed'>U</span>
        <span className='startingPage__letterGreen'>I</span>
        <span className='startingPage__letterRed'>Z</span>
      </motion.h1> 
      <Form 
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
        filters={filters}
        changeNumber={changeNumber}
        formData={formData}
      />
    </main>
  )
}

export default StartingPage