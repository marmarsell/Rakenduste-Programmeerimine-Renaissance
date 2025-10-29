import { useEffect, useState } from "react";


function FCGame() {

    type Flashcard = {
        que: string,
        ans: string
    }

    const [updates, setUpdates] = useState(0)

    //flashcards initialisation
    const savedFlashcards = localStorage.getItem("flashcard");
    const [remainingCards, setRemainingCards] = useState<Array<Flashcard>>((JSON.parse(savedFlashcards as string) as Array<Flashcard>).sort(() => Math.random() - 0.5))

    function submitAnswer() {
        console.warn("Submit Triggered")
        // remove first element
        remainingCards.splice(0, 1)
        setUpdates(updates + 1)
        console.log(remainingCards)
    }

    useEffect(() => {
        
    }, [updates])

    return(
        <>
            <div>{remainingCards.length} questions left</div>
            <div>
                {/* <button onClick={() => arrayShuffle()}>shuffle</button> */}
                {remainingCards[0].que}
                <button onClick={() => submitAnswer()}></button>
            </div>
        </>
    )
}

export default FCGame