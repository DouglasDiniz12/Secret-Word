import './GameIniciar.css';

import React, { useState,useRef } from 'react'

const GameIniciar = ({
   verifyLetter
  ,pickeWord
 ,pickCategory
  ,letters
 ,guessedLetters 
  ,wordLetters
 ,guesses
 ,score
}) => {
  const [letter1,setLetter1]= useState("");
  const letterInputRef = useRef(null)

  const handleSubmit =(e)=>{
    e.preventDefault();
    verifyLetter(letter1)

    setLetter1("")

    letterInputRef.current.focus()
  }

  return (
    <div className="game"><h1>game</h1>
    <p className="points">
    <span>pontuação {score}</span>
    
     </p>
     <h1>Advinhe a palavra</h1>
     <h3 className="tip">
      dica sobre a palavra <span>{pickCategory}</span>
     </h3>
     <p>voce ainda tem {guesses} tentativas.</p>
     <div className="wordContainer">
     {letters.map((letteri,i)=>
        guessedLetters.includes(letteri)?(
          <span key={i} className="letter"> {letteri} </span>
           
           

        ):(
          <span key={i} className="blanKsquare"></span>
        )
      
      )}
     
     
     
    
      </div>
      <div className="letterContainer">
        <p>tente advinhar uma letra:</p>
        <form onSubmit={handleSubmit} >
        
          <input type="text" name='letter' maxLength="1" required onChange={(e)=> setLetter1(e.target.value)} value={letter1} ref={letterInputRef}/>
          <button>jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>letras já utilizadas</p>
        {wordLetters.map((letters,i)=>(
          <span key={i}>{letters}</span>

        ))}
      </div>
     </div>
   

  )
}

export default GameIniciar
