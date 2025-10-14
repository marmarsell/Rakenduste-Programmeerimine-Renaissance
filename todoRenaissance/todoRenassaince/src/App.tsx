import { useEffect, useState } from 'react'
import './App.css'

function App() {

  type Note = {
    name: string
    content: string

    active: boolean
  }

  const devName = "marsell"

  const [notes, setNotes] = useState(() => {
    if(localStorage.getItem("notesList") != null) {
      const saved = localStorage.getItem("notesList")
      return JSON.parse(saved as string) as Array<Note>

    }
    else {
      localStorage.setItem("notesList", JSON.stringify(
        [
          {
            name: "test", 
            content: "lorem ipsum wawawawaw",

            active: true
          }
        ]
      ))
    }
  })

  const tweakedArray = [] as Array<Note>

  const [name, setName] = useState<string>()
  const [content, setContent] = useState<string>()

  notes?.forEach(element => {
    if(element.active == true) {
      tweakedArray.push(element)
    }
    else {
      element.content = "task inactive"
      tweakedArray.push(element)
    }
  });
  
  function beginSubmission() {
    const saved = localStorage.getItem("notesList")
    const noteArray = JSON.parse(saved as string) as Array<Note>
    noteArray.push({name: name as string, content: content as string, active: true})
    localStorage.setItem("notesList", JSON.stringify(noteArray))
    window.location.reload()
  }

  function beginDeletion(deletableID: number) {
    const saved = localStorage.getItem("notesList")
    const noteArray = JSON.parse(saved as string) as Array<Note>
    noteArray.splice(deletableID, 1)
    localStorage.setItem("notesList", JSON.stringify(noteArray))
    window.location.reload()
  }

  function deactivitinator(disablableID: number) {
    const saved = localStorage.getItem("notesList")
    const noteArray = JSON.parse(saved as string) as Array<Note>

    if(noteArray[disablableID].active == true) {
      noteArray[disablableID].active = false
    }
    else {
      noteArray[disablableID].active = true
    }
    
    localStorage.setItem("notesList", JSON.stringify(noteArray))
    window.location.reload()
  }

  useEffect(() => {
    localStorage.setItem("devName", JSON.stringify(devName))
  }, [devName])

  return (
    <>
      <title>Admin Panel :3</title>
      <h1 className='text-3x1 font-bold underline'>TODO LIST :3</h1>
      <br />

      <div>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)} placeholder={"name"}
        /> <input 
          type="text" 
          onChange={(e) => setContent(e.target.value)} placeholder={"content"}
        /> <button onClick={() => beginSubmission()}>
          submit :3c
        </button>
      </div>

      <br />

      <div>
        <hr />
        {tweakedArray?.map((notes, index) => (
          <div>
            <hr />
            <div key={index}>
              {notes.name} <a onClick={() => deactivitinator(index)}>toggle</a>
              <hr />
              <br />
              <div>{notes.content}</div>
              <br />
              <button onClick={() => beginDeletion(index)}>yoink</button>
              <hr />
            </div>
          </div>
        ))}
        <hr />
      </div>
    </>
  )
}

export default App