//import { useState } from 'react'
import './App.css'

function App() {

  type Flashcard = {
    que: string,
    v1: string,
    v2: string,
    v3: string
  }

  //localstorage initialisation
  if(!localStorage.getItem("flashcard")) {
    const nuevaStorage = [] as Array<Flashcard>
    localStorage.setItem("flashcard", JSON.stringify(nuevaStorage))
  }

  //const [count, setCount] = useState(0)

  function thyCardCreateth() {
    const testFlashcard = {
      que: "is it a test?",
      v1: "yes",
      v2: "no",
      v3: "unsure"
    } as Flashcard

    console.log("adding Test Flashcard");

    const saved = localStorage.getItem("flashcard")
    const tempFlashcardStorage = JSON.parse(saved as string) as Array<Flashcard>
    tempFlashcardStorage.push(testFlashcard)
    localStorage.setItem("flashcard", JSON.stringify(tempFlashcardStorage))

    console.log(tempFlashcardStorage)
  }

  return (
    <>
      <div>
        <div>flashcardddd <button onClick={() => thyCardCreateth()}>wawaa</button></div>
      </div>
    </>
  )
}

export default App
