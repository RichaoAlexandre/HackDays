import { useState } from 'react'
import './App.css'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InitScreen } from './screens/InitScreen'
import { ConfirmationScreen } from './screens/ConfirmationScreen'
import { JoinScreen } from './screens/JoinScreen'
import { ProposalScreen } from './screens/ProposalScreen'

function App() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    decisionTitle: 'How to cook pasta',
    decisionContext: 'i want it to be italian made',
    duration: {
      hours: 0,
      minutes: 0
    },
    participants: 0
  })

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <div>
      {step === 0 && <WelcomeScreen />}
      {step === 1 && <InitScreen />}
      {step === 2 && <ConfirmationScreen {...formData} />}
      {step === 3 && <JoinScreen />}
      {step === 4 && <ProposalScreen />}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {step > 0 && (
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        )}
        {step < 4 && (
          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default App
