import { useState } from 'react'
import Calculator from './calculator/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div style={{width: "300px"}}>
      <Calculator/>
      </div>
    </div>
  )
}

export default App
