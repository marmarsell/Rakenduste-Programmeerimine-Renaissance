//import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'

import FCMaker from './components/FCMaker.tsx'
import NotFound from './components/NotFound.tsx'
import Home from './components/Home.tsx'
import FCGame from './components/FCGame.tsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="flashcards/home" element={<Home/>}/>
        <Route path="flashcards/editor" element={<FCMaker/>}/>
        <Route path="flashcards/play" element={<FCGame/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
