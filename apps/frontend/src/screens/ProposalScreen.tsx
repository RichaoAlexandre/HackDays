import { useState } from "react"
import { SpecCard } from "../components/SpecCard"

import type { Decision } from "../types/decision"
import type { ProposalFormData } from "../types/proposal"
import { ProposalSource } from "../types/proposal"


const submitted_proposals = 3; // Example number of submitted proposals, replace with actual logic to fetch this data

interface ProposalScreenProps {
  decision: Decision;
}

export const ProposalScreen = ({
  decision
}: ProposalScreenProps) => {
  const [proposal, setProposal] = useState<ProposalFormData>({ decision_id: decision.id , description: '', source: ProposalSource.HUMAN });
  const [haveSubmit, setHaveSubmit] = useState(false)

  const handleSubmitProposal = async () => {
     try {
      const response = await fetch( `http://${import.meta.env.VITE_BACKEND_URL}/api/proposal/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposal)
      });
      const data = await response.json();
      if (response.ok) {
        setHaveSubmit(true)
      }
      else if (!response.ok) {
        throw new Error(data.detail ?? 'Failed to submit proposal');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  }

  const handleProposalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProposal(prev => ({
      ...prev,
      description: e.target.value
    }));
  }

  const computeDuration = () => {
    if (!decision.duration) return {}
    const hours = Math.floor(decision.duration / 3600);
    const residue = decision.duration % 3600;
    const minutes = Math.floor(residue / 60);

    return { hours: hours, minutes: minutes };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-y-auto">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Left side - Workshop specs */}
        <div className="flex-1">
          <SpecCard
            decisionTitle={decision.title ?? ''}
            decisionContext={decision.context ?? ''}
            duration={computeDuration()}
            participants={decision.number_of_participants ?? 0}
          />
        </div>

        {/* Right side - Proposal input */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {!haveSubmit ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's your proposal?
                </h2>
                
                <textarea
                  value={proposal.description ?? ''}
                  onChange={handleProposalChange}
                  name="proposal"
                  id="proposal"
                  disabled={haveSubmit}
                  placeholder="Enter only one proposal"
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
                />
              </>
            ) :(
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your proposal:
                </h2>

                <div className="text-lg text-gray-800 mb-4">
                  {proposal.description}
                </div>
                
            
              </>
            )}

            <div className="flex justify-between items-center">
              {!haveSubmit && (
                <button
                  onClick={handleSubmitProposal}
                  disabled={haveSubmit}
                  className="px-6 py-2 text-white bg-gray-800 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Submit proposal
                </button>
              )}

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">TA</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">CN</div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">BO</div>
                </div>
                <span className="text-sm text-gray-600"> {submitted_proposals} participants submitted their proposals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
