import { useEffect, useState } from "react"
import "./TramStop.css"

function TramStop() {

    type Transport = {
        name: string;
        route: number;
        expectedTime: number;
        scheduleTime: number;
        finalStop: string;
        departureIn: number;
        departureInString: string;
        disabledCompat: string;
    }

    const [content, setContent] = useState<Array<Transport>>();
    const [reiterations, setReiterations] = useState<number>(0);

    const selector = document.getElementById("stopselector") as HTMLSelectElement
    const [stopSelection, setStopSelection] = useState<number>(1424);

    async function getData() {
        // stop id's [ home tram stop = 1424 | bus + tram stop = 1418 | hobujaama = 3605]
        const url = "https://transport.tallinn.ee/siri-stop-departures.php?stopid=" + stopSelection;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.text();
            console.log(result);
            // begin formatting the result
            const transportList = [] as Array<Transport>
            // split string into lines and remove metadata and stop info
            let lines = result.split('\n');
            lines = lines.splice(2, lines.length - 3)
            // turn each line into Transport type object and add those to the list
            lines.forEach(element => {
                const splitElement = element.split(',')
                transportList.push(
                    new Object({
                        name: splitElement[0],
                        route: splitElement[1],
                        finalStop: splitElement[4],
                        departureIn: splitElement[5],
                        disabledCompat: splitElement[6]
                    }) as Transport
                );
            });
            // control if the list is empty, if so display a message
            if(transportList.length == 0) {
                transportList.push(
                    new Object({
                        name: ":(",
                        route: "",
                        finalStop: "not coming",
                        departureIn: null,
                        disabledCompat: "" 
                    }) as Transport
                );
            }

            // format all transport objects into proper units
            transportList.forEach(element => {

                // setTimeout(() => {
                //     transportList.forEach(element => {
                //         element.departureIn = element.departureIn - 1;
                //     })
                // }, 1000)

                // Format compatability for people with disabilities
                if(element.disabledCompat == 'Z') {
                    element.disabledCompat = '✓'
                }
                else {
                    element.disabledCompat = '⛒'
                }

                // Format estimated departure time
                let minutes = (Math.floor(element.departureIn / 60)).toString();
                if(Math.floor(element.departureIn / 60) < 10) {
                    minutes = "0" + minutes;
                }

                let seconds = (element.departureIn % 60).toString();
                if(element.departureIn % 60 < 10) {
                    seconds = "0" + seconds;
                }

                element.departureInString = minutes + "m " + seconds + "s";

                // Format transport type
                if(element.name == "tram") {
                    element.name = '🚊';
                }
                if(element.name == "bus") {
                    element.name = '🚍';
                }

                // Format destination
                if(element.finalStop.length > 10) {
                    element.finalStop = element.finalStop.slice(0, 10 - element.finalStop.length);
                }
                else if(element.finalStop.length < 10) {
                    let counter = Math.ceil((10 - element.finalStop.length) * 2);
                    while(counter > 0) {
                        element.finalStop = element.finalStop + "\u00A0";
                        counter = counter - 1;
                    }
                }
            })

            console.log(transportList);
            setContent(transportList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
        console.log(reiterations);
    }, [reiterations, stopSelection])

    setTimeout(() => {
        setReiterations(reiterations + 1);
    }, 3000);

    function handleStop() {
        setStopSelection(selector?.value as unknown as number)
    }

    function debugHandleStop() {
        const debugSelector = document.getElementById("manualstopselector") as HTMLSelectElement
        setStopSelection(debugSelector?.value as unknown as number)
    }

    return(
        <>
            :3)
            <div className="settings">
                |
                <div>Select</div>
                →
                <select name="stopselector" id="stopselector" defaultValue={stopSelection} onChange={() => handleStop()}>
                    <optgroup label="⌂">
                        <option value="1424">Majaka põik</option>
                        <option value="1427">Pae</option>
                        <option value="6884">Pae (ajutine)</option>
                    </optgroup>
                    <optgroup label="»">
                        <option value="3605">Hobujaama</option>
                        <option value="5796">Laikmaa</option>
                        <option value="1635">Viru</option>
                    </optgroup>
                </select>
                |
            </div>
            <div className="settings">
                |
                <div>Debug</div>
                →
                <input type="text" id="manualstopselector" placeholder="debug" onChange={() => debugHandleStop()} />
                |
            </div>
            <div className="box">
                <div className="header">
                    <hr />
                    <div className="entry">
                        <div>| Type</div>|<div>Ln</div>|<div>Destination</div>|<div>Departs in</div>|<div>♿️ |</div>
                    </div>
                    <hr />
                </div>
                {content?.map((vehicle, index) =>
                    <div key={index}>
                        <div className="entry">
                            <div>| {vehicle.name}</div>
                            <div>{vehicle.route}</div>
                            <div>{vehicle.finalStop}</div>
                            <div>{vehicle.departureInString}</div>
                            <div>{vehicle.disabledCompat} |</div>
                        </div>
                        <hr />
                    </div> 
                )}
            </div>
            (:3
        </>
    )
}

export default TramStop