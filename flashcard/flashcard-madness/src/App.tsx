//import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'

import FCMaker from './components/FCMaker.tsx'
import NotFound from './components/NotFound.tsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="maker" element={<FCMaker/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
