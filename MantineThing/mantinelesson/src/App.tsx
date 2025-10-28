// import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css'

// import Form from './components/form'
import TramStop from './components/TramStop';

function App() {

  return <MantineProvider> 
  (
    <>
      {/*<Form />*/}
      <TramStop />
    </>
  ) 
  </ MantineProvider>
}

export default App
