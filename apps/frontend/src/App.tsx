import './App.css'
import { InitScreen } from './screens/InitScreen'
import { BrowserRouter, Routes, Route } from 'react-router'
import { StepsHandler } from './components/StepsHandler'
import { WelcomeScreen } from './screens/WelcomeScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomeScreen/> } />
        <Route path="/init" element={<InitScreen />} />
        <Route path="/decision/:uuid" element={<StepsHandler />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
