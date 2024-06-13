import "./StartScreen.css";

const StartScree = ({startGame}) => {
  return (
    <div className="start">
      <h1>Secret World</h1>
      <p>clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScree