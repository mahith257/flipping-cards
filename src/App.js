import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // console.log(cards, turns)

  // handles user choices
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  useEffect(() => {
    if(firstChoice && secondChoice){
      setDisabled(true)
      if(firstChoice.src === secondChoice.src){
        // console.log("the cards Match")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === firstChoice.src){
              return {...card, matched : true}
            }else{
              return card
            }
          })
        })
        resetTurns()
      }else{
        // console.log("the cards don't Match")
        setTimeout(() => {
          resetTurns()
        }, 1000)
      }
    }

  }, [firstChoice, secondChoice])

  // console.log(cards)

  const resetTurns = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // to start the game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <div className='navbar'>
        <h1 style={{marginRight: 'auto'}}>Flipping Cards</h1>
        <div>
          <span style={{fontSize: '1.2em'}}>Turns: {turns}</span>
          <button onClick={shuffleCards}>New Game</button>
        </div>
      </div>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card = {card} 
          handleChoice = {handleChoice}
          flipped = {card === firstChoice || card === secondChoice || card.matched}
          disabled = {disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App