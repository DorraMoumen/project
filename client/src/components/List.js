import React, { useState } from 'react'
import Accueil from './Accueil'

const List = () => {
    const [inputText,setInputText]=useState('')
    const [inputspec,setInputSpec]=useState('')
    const inputHandler=(e)=>{
        const lowerCase=e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    const inputHandler2=(e)=>{
        const spec=e.target.value.toLowerCase();
        setInputSpec(spec);
    }
  return (
    <div>
    <h1>Search</h1>
    <div>
    <textarea aria-label='Search' onChange={inputHandler}></textarea>
    </div>
    <h1>Specialité</h1>
    <div>
    <textarea aria-label='Search' onChange={inputHandler2}></textarea>
    
    </div>
    <div><Accueil input1={inputText} input2={inputspec}/></div>
    </div>
  )
}

export default List