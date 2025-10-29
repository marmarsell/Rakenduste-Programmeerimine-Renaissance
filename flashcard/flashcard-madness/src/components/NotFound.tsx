

function notFound () {

    function yayeetBackHome() {
        window.location.replace("/flashcards/home");
    }

    return(
        <>
            <h2>「 ERROR 404 」</h2>
            <p>thy hath utterly lost, turn back or face my wrath</p>
            <div><button onClick={() => yayeetBackHome()}>bail home ⌂</button></div>
        </>
    )
}

export default notFound