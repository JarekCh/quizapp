import React, { useState } from 'react'
import { filterData } from '../utils/filterData'



//TODO:
// structure with animation 
// form passing data to app

const StartingPage = () => {
  const [filters] = useState(filterData);
  const [formData, setFormData] = useState({
    loggedIn: false,
    amount: '',
    type: '',
    category: '',
    difficulty: '',
    name: '',
  })

  function handleChange(e) {
    const {name, value, } = e.target;
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value
      }
  })
  }

  // // function handleSubmit() {
  //   const {name, value} = event.target
  //   setMeme(prevMeme => ({
  //       ...prevMeme,
  //       [name]: value
  //   }))    
  // // }
  console.log(formData)
  
  return (
    <main className='startingPage__container'>
      <h1>
        <span>Q</span>
        <span>U</span>
        <span>I</span>
        <span>Z</span>
      </h1> 
      <div>
        {filters?.map((filter) => (
          <div key={filter.queryName}>
            <select
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
        ))}
      </div>
    </main>
  )
}

export default StartingPage