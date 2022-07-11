import React, { useState } from 'react'
import { filterData } from '../utils/filterData'



//TODO:
// structure with animation 
// form passing data to app

const StartingPage = ( { initialDataSetter } ) => {
  const [filters] = useState(filterData);
  const [formData, setFormData] = useState({
    loggedIn: false,
    amount: '',
    type: '',
    category: '',
    difficulty: '',
    name: '',
  })
  console.log("🚀 ~ file: StartingPage.js ~ line 20 ~ StartingPage ~ formData", formData)

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
      setFormData((prevFormData => {
        return {
          ...prevFormData,
          loggedIn: true,
        }
      }));
      initialDataSetter(formData);
    }    
   


  
  
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
            type='text'
            placeholder='Name'
            onChange={handleChange}
            value={formData.name}
            name="name"
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
          />          

          <label></label>
          {filters?.map((filter) => (
            <>
            <div key={filter.queryName}>
              <label htmlFor={filter.queryName}>{filter.placeholder}:</label>
              <br />
              <select
                id={filter.queryName}
                placeholder={filter.placeholder}              
                value={formData.queryName}
                name={filter.queryName}
                onChange={handleChange}
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
            </>   
          ))}
          <button type='submit'>Start Quiz</button>
        </form>
      </div>
    </main>
  )
}

export default StartingPage