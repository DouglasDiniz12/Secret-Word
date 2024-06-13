//css
import './App.css';

//react
import {useCallback, useEffect,useState} from "react";
import StartScree from './cpmponents/StartScree';

//data
import { wordList } from './data/word';
import GameIniciar from './cpmponents/GameIniciar';
import GameOver1 from './cpmponents/GameOver1';


//components

const stages =[
  {id:0,name:"start"},
  {id:1,name:"game"},
  {id:2,name:"end"},
];

const guesseQty = 3


function App() {
  const [gameStage, setGame] = useState(stages[0].name)
  const [words] = useState(wordList);
  
  const[pickeWord,setWord] = useState("")
  const[pickCategory,setPickCategory] = useState("")
  const[letters,setLetters] =  useState([])

  const [guessedLetters,setGuessedLetters] = useState([])/// letras advinhadas
  const [wordLetters,setWordl]= useState([])/// letras erradas
  const [guesses,setGuesses]=useState(3) //chances do usuario
  const [score,setScore] =useState(50) // ponstuação

  const pickewordcategory = useCallback (()=>{

    //pick random category
    const categories =Object.keys(words)
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]
    console.log(category)
    

    //pick a random word

    const word = words[category][Math.floor(Math.random()* words[category].length)]
    console.log(word)

    return {word,category}


  },[words]);
  


  // starts the secret word game
  const startGame =useCallback(()=>{
    ///clear all letters
    clear()
   //pick Word and category
 const {word, category} = pickewordcategory();

 let wordLetters = word.split("")

 wordLetters = wordLetters.map((i)=> i.toLowerCase())
 
 console.log(word,category)
 console.log(wordLetters)

 ///fill states
 setWord(word)
 setPickCategory(category)
 setLetters(wordLetters)





    setGame(stages[1].name)
  },[pickewordcategory]);

//process the letter input

const verifyLetter = (letter1)=>{
  const normalizedLeeter = letter1.toLowerCase()

  ///// check if letter hs already been utilized
  if(guessedLetters.includes(normalizedLeeter)|| wordLetters.includes(normalizedLeeter)){
    return;

  }

  //push guesse letter or remove a guess
  if(letters.includes(normalizedLeeter)){
    setGuessedLetters((actualGursseDletter)=>[
      ...actualGursseDletter,
      normalizedLeeter,
    ])

}else{
  setWordl((actualwordL)=>[
    ...actualwordL,
    normalizedLeeter,
  
]);

setGuesses((actualGuessses)=>actualGuessses-1)

}

};

const clear = ()=>{
  setGuessedLetters([]);
  setWordl([]);
};

//check if guesses end

useEffect(()=>{
  if(guesses<=0){
    //reset all states
    clear()
    setGame(stages[2].name)
  }

},[guesses]);

//check win condition
useEffect(()=>{
  const uniqueLetters =[...new Set(letters)]
  //win condition
  if(guessedLetters.length === uniqueLetters.length){
    //add score
    setScore((actualScore)=>(actualScore+=100))

    startGame();
  }


},[guessedLetters,letters,startGame])





// restart the game
const retry =()=>{
  setScore(100)
  setGuesses(guesseQty)
  setGame(stages[0].name)
}

  return (
    <div className="App">
    
     {gameStage === 'start' && <StartScree  startGame ={startGame}/>}
     {gameStage === 'game' && (

     <GameIniciar verifyLetter={verifyLetter} 

      pickeWord={pickeWord} 
      pickCategory={pickCategory}
      letters={letters} 
      guessedLetters={guessedLetters} 
      wordLetters={wordLetters} 
      guesses={guesses} 
      score={score}/>)}

 
     {gameStage === 'end' && <GameOver1  retry={retry} score={score}/>}
     
    </div>
  );

}

export default App;
