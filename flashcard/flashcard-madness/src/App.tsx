import { useEffect, useState } from 'react'
import './App.css'

function App() {

  type Flashcard = {
    que: string,
    v1: string,
    v2: string,
    v3: string
  }

  const [cardList, setCardList] = useState<Array<Flashcard>>()

  useEffect(() => {
    const saved = localStorage.getItem("flashcard")
    setCardList(JSON.parse(saved as string) as Array<Flashcard>)
  }, [])

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

    window.location.reload()

    console.log(tempFlashcardStorage)
  }

  return (
    <>
      <div>
        <div>flashcardddd <button onClick={() => thyCardCreateth()}>wawaa</button></div>
        <div>
          <div>------------------------------------------------------------</div>
          <hr />
          {cardList?.map((element, index) =>
            <div key={index}>
              <div>{element.que}</div>
              <div>{element.v1} {element.v2} {element.v3}</div>
              <hr />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
