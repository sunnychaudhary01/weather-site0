import { useState } from 'react'
import MyContext from './Component/MyContext'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MyContext />
    </>
  )
}

export default App
