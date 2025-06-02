import { useState } from 'react'
import './App.css'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InitScreen } from './screens/InitScreen'
import { JoinScreen } from './screens/JoinScreen'
import { ProposalScreen } from './screens/ProposalScreen'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { StartScreen } from './screens/StartScreen'

function App() {
  const [formData, setFormData] = useState({
    decisionTitle: 'How to cook pasta',
    decisionContext: 'i want it to be italian made',
    duration: {
      hours: 0,
      minutes: 0
    },
    participants: 0
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/init" element={<InitScreen />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/propose" element={<ProposalScreen />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
