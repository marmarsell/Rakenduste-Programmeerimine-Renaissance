// import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css'

import Form from './components/form'

function App() {

  return <MantineProvider> 
  (
    <>
      <Form />
    </>
  ) 
  </ MantineProvider>
}

export default App
