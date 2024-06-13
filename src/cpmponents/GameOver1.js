import './GameOver.css'


const GameOver1 = ({retry, score}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2> a sua pontuaçao foi <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar</button>

    </div>
  )
}

export default GameOver1
