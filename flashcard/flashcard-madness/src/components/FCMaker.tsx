import { useEffect, useState } from 'react'
import './FCMaker.css'

function FCMaker() {

  type Flashcard = {
    que: string,
    ans: string
  }

  const [cardList, setCardList] = useState<Array<Flashcard>>()
  const [reloadCounter, setReloadCounter] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("flashcard")
    setCardList(JSON.parse(saved as string) as Array<Flashcard>)
  }, [reloadCounter])

  //localstorage initialisation
  if(!localStorage.getItem("flashcard")) {
    const nuevaStorage = [] as Array<Flashcard>
    localStorage.setItem("flashcard", JSON.stringify(nuevaStorage))
  }

  function pressHome() {
    window.location.replace("/flashcards/home");
  }

  function thyCardCreateth() {
    const newFlashcard = {
      que: (document.getElementById("question") as unknown as HTMLInputElement).value as unknown as string,
      ans: (document.getElementById("answer") as unknown as HTMLInputElement).value as unknown as string
    } as Flashcard

    console.warn("adding Test Flashcard");
    if(newFlashcard.que != null && newFlashcard.que != "" && newFlashcard.ans != null && newFlashcard.ans != "") {
      // adding operation
      const saved = localStorage.getItem("flashcard")
      const tempFlashcardStorage = JSON.parse(saved as string) as Array<Flashcard>
      tempFlashcardStorage.push(newFlashcard)
      localStorage.setItem("flashcard", JSON.stringify(tempFlashcardStorage))

      setReloadCounter(reloadCounter + 1)

      console.log(tempFlashcardStorage)
    } else {
      console.error("empty input detected")
    }

    
  }

  function cardEditeth(editableID:number) {
    const editedFlashcard = {
      que: (document.getElementById("question") as unknown as HTMLInputElement).value as unknown as string,
      ans: (document.getElementById("answer") as unknown as HTMLInputElement).value as unknown as string
    } as Flashcard

    console.warn("editing Flashcard no: " + editableID);

    // editing operation
    const saved = localStorage.getItem("flashcard")
    const tempFlashcardStorage = JSON.parse(saved as string) as Array<Flashcard>

    if(editedFlashcard.que != null && editedFlashcard.que != "") {
      tempFlashcardStorage[editableID].que = editedFlashcard.que
      console.log("question: " + tempFlashcardStorage[editableID].que)
    } else {
      console.log("skipping edition of question")
    }
    if(editedFlashcard.ans != null && editedFlashcard.ans != "") {
      tempFlashcardStorage[editableID].ans = editedFlashcard.ans
      console.log("answer: " + tempFlashcardStorage[editableID].ans)
    } else {
      console.log("skipping edition of answer")
    }

    localStorage.setItem("flashcard", JSON.stringify(tempFlashcardStorage))

    setReloadCounter(reloadCounter + 1)
  }

  function thyCardYoinketh(yoinkableID:number) {

    console.warn("removing flashcard no: " + yoinkableID);

    // removing operation
    const saved = localStorage.getItem("flashcard")
    const tempFlashcardStorage = JSON.parse(saved as string) as Array<Flashcard>
    tempFlashcardStorage.splice(yoinkableID, 1)
    localStorage.setItem("flashcard", JSON.stringify(tempFlashcardStorage))

    setReloadCounter(reloadCounter + 1)
  }

  return (
    <>
      <div>
        <div>
          <button onClick={() => pressHome()}>Home ⌂
          </button> go back home | new flashcard <button 
          onClick={() => thyCardCreateth()}>new ✎</button>
        </div>
        <p>tip: fill one or both fields and press edit buttons to edit a flashcard</p>
        <div>
          <div>
            <input type="text" id='question' placeholder='Question'/> <input type="text" id='answer' placeholder='Answer'/>
          </div>
          <hr />
          {cardList?.map((element, index) =>
            <div key={index}>
              <div>
                <h3>{element.que}</h3>
                <div> ---------- ⥮ ----------</div>
                <h3>{element.ans}</h3>
              </div>
                <button onClick={() => cardEditeth(index)}><h2> ✎ </h2></button><button onClick={() => thyCardYoinketh(index)}><h2> 🗑 </h2></button>
              <hr />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FCMaker