import { useState } from "react"
import { SpecCard } from "../components/SpecCard"

export const ProposalScreen = () => {
  const [proposal, setProposal] = useState("")

  const handleSubmitProposal = () => {
    console.log("Submitting proposal:", proposal)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-y-auto">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Left side - Workshop specs */}
        <div className="flex-1">
          <SpecCard
            decisionTitle="Lorem ipsum dolor sit amet"
            decisionContext="Lorem ipsum dolor sit amet consectetur. Tempus et non vel egestas. Sit vel commodo nibh ullamcorper dolor."
            duration={{ hours: 1, minutes: 30 }}
            participants={6}
            displayButtons={false}
          />
        </div>

        {/* Right side - Proposal input */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Proposal box title
            </h2>
            
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Enter only one proposal"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            />

            <div className="flex justify-between items-center">
              <button
                onClick={handleSubmitProposal}
                className="px-6 py-2 text-white bg-gray-800 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Submit proposal
              </button>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">TA</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">CN</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">BO</div>
                </div>
                <span className="text-sm text-gray-600">4 participants submitted their proposals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
