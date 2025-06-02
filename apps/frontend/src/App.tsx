import './App.css'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InitScreen } from './screens/InitScreen'
import { JoinScreen } from './screens/JoinScreen'
import { ProposalScreen } from './screens/ProposalScreen'
import { BrowserRouter, Routes, Route } from 'react-router'
import { StartScreen } from './screens/StartScreen'
import WaitScreen from './screens/WaitScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/init" element={<InitScreen />} />
        <Route path="/decision/:uuid" element={<StartScreen />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/propose" element={<ProposalScreen />} />
        <Route path="/wait" element={<WaitScreen />} />
        {/* <Route path="*" element={<Navigate to="/welcome" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
