// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ExcpPage from './pages/ExcpPage'
import { GlobalStyle } from './Globalstyles'
import AdPage from './pages/AdPage'
import AnswerPage from './pages/AnswerPage'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<AdPage />} />
        <Route path="/answer/:adId/:timestamp" element={<AnswerPage />} />
        <Route path="/excp/:reason" element={<ExcpPage />} />
      </Routes>
    </>
  )
}

export default App
