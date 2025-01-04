import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartHire from './SmartHire';
import RegisterLogin from './component/RegisterLogin';
import UpdateAcount from './component/UpdateAcount';


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/smartHire" element={< SmartHire/>} />
        <Route path="/updateAccount" element={< UpdateAcount/>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
