import React from 'react';


const Form = ({ filters, handleSubmit, handleChange, changeNumber, formData }) => {
  return (
    <div className='form__container'>
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
        placeholder='Pick number 3-15'
        onChange={handleChange}
        value={formData.amount}
        name="amount"  
        required = {true}  
        ref={changeNumber}
      />     
      
      {filters?.map((filter) => (            
        <div key={filter.queryName} className='form__select'>
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
      <button type='submit'>Start quiz</button>
    </form>
  </div>    
  )
}

export default Form