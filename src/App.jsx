import { useState } from 'react'
import Deck from './Deck'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Deck />
    </div>
  )
}

export default App
