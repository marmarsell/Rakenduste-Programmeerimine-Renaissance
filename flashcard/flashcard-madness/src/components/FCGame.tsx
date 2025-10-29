import { useEffect, useState } from "react";


function FCGame() {

    type Flashcard = {
        que: string,
        ans: string
    }

    // game variables
    const [updates, setUpdates] = useState(0)
    const saved = localStorage.getItem("flashcard")
    const courseLength = (JSON.parse(saved as string) as Array<Flashcard>).length
    const [goodBois, setGoodBois] = useState(0)

    //flashcards initialisation
    const savedFlashcards = localStorage.getItem("flashcard");
    const [remainingCards, setRemainingCards] = useState<Array<Flashcard>>((JSON.parse(savedFlashcards as string) as Array<Flashcard>).sort(() => Math.random() - 0.5))

    function submitAnswer() {
        // Check the answer
        const answer = (document.getElementById("answer") as unknown as HTMLInputElement).value as unknown as string
        console.log("comparing: " + answer + " vs " + remainingCards[0].ans)
        if(answer == remainingCards[0].ans) {
            setGoodBois(goodBois + 1)
        }
        console.warn("Submit Triggered")
        // remove first element
        remainingCards.splice(0, 1)
        setUpdates(updates + 1)
        // check if game ended
        if(remainingCards.length == 0) {
            const calculatedResult = goodBois * 100 / (courseLength)
            console.log(goodBois + " * 100 / " + courseLength + "=" + calculatedResult)
            localStorage.setItem("lastScore", calculatedResult.toString())
        }
    }

    useEffect(() => {
        console.log(remainingCards)
    }, [updates])

    return(
        <>
            <div>{remainingCards.length} questions left</div>
            <div>{goodBois}/{courseLength} correct</div>
            <div>
                <hr />
                <h3>{remainingCards[0].que}</h3>
                <hr />
                <input type="text" id="answer" placeholder="your answer" />
                <div>
                    <button onClick={() => submitAnswer()}></button>
                </div>
            </div>
        </>
    )
}

export default FCGame