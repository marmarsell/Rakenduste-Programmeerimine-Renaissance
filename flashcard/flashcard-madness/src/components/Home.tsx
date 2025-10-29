
function Home() {

    function pressPlay() {
        window.location.replace("/flashcards/play");
    }

    function pressEdit() {
        window.location.replace("/flashcards/editor");
    }

    return(
        <>
            <div>
                <h2>FLASHCARD MADNESS</h2>
                <button onClick={() => pressEdit()}>✎ Edit</button>
            </div>
            <div>this is a home page</div>
            <button onClick={() => pressPlay()}>〘 PLAY 〙</button>
        </>
    )
}

export default Home