import React, { useState, useRef } from 'react'
import { filterData } from '../utils/filterData'



//TODO:
// structure with animation 
// set css

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
    const {name, value, } = e.target;
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value
      }
    });
  }; 

  function handleSubmit(e) {    
    e.preventDefault()
    if(formData.amount < 3 || formData.amount >= 15) {
      changeNumber.current.focus();
      changeNumber.current.value = 'pick number, 3-15'
      return
    }
    initialDataSetter(formData);
  };  
  
  return (
    <main className='startingPage__container'>
      <h1>
        <span>Q</span>
        <span>U</span>
        <span>I</span>
        <span>Z</span>
      </h1> 
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Type nickname:</label>
          <br />
          <input 
            id='name'
            name="name" 
            type='text'
            placeholder='Name'
            onChange={handleChange}            
            value={formData.name}
            required = {true}                       
          />
          <br />

          <label htmlFor='amount'>Amount of questions in quiz:</label>
          <br />
          <input
            id='amount'
            type='text'
            placeholder='pick number 3-15'
            onChange={handleChange}
            value={formData.amount}
            name="amount"  
            required = {true}  
            ref={changeNumber}
          />          

          <label></label>
          {filters?.map((filter) => (            
            <div key={filter.queryName}>
              <label htmlFor={filter.queryName}>{filter.placeholder}:</label>
              <br />
              <select
                id={filter.queryName}
                placeholder={filter.placeholder}              
                value={formData.queryName}
                name={filter.queryName}
                onChange={handleChange}
                required = {true}  
              >
                {filter?.items?.map((item) => (
                  <option
                    value={item.value}
                    key={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>      
            </div>                
          ))}
          <button type='submit'>Start Quiz</button>
        </form>
      </div>
    </main>
  )
}

export default StartingPage