import { useState } from "react"
import NumberInput from "../components/NumberInput"
import { SpecCard } from "../components/SpecCard"
import { useNavigate } from "react-router"

type FormData = {
  title: string
  context: string
  durationMinutes: number
  durationHours: number
  number_of_participants: number
}

type InitFormProps = {
  formData: FormData
  onInputChange: (field: string, value: string | number) => void
  onNext: () => void
}

const InitForm = ({
  formData,
  onInputChange,
  onNext,
}: InitFormProps) => (
  <>
  <div className="mb-6 md:mb-8">
          <h3 className="text-xs md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
            Decision making workshop details
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Fill in the details of this form before starting the workshop !
          </p>
        </div>
  <form className="space-y-4 md:space-y-6">
    {/* Decision Title */}
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
        Decision title <span className="text-red-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        placeholder="Decision title"
        value={formData.title}
        onChange={(e) => onInputChange('title', e.target.value)}
        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <p className="text-xs md:text-sm text-gray-500 mt-1">Enter your decision title</p>
    </div>

    {/* Decision Context */}
    <div>
      <label htmlFor="context" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
        Decision context <span className="text-red-500">*</span>
      </label>
      <textarea
        id="context"
        rows={3}
        placeholder="The decision context could focus on constraints that participants need to take into account for their proposals"
        value={formData.context}
        onChange={(e) => onInputChange('context', e.target.value)}
        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
      <p className="text-xs md:text-sm text-gray-500 mt-1">Enter your decision context</p>
    </div>

    {/* Workshop Duration */}
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
        Voting duration <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Hours
          </label>
          <NumberInput
            value={formData.durationHours}
            onChange={(value) => onInputChange('durationHours', value)}
            placeholder="Hours"
            min={0}
            max={23}
            step={1}
          />
        </div>
        <div>
          <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Minutes
          </label>
          <NumberInput
            value={formData.durationMinutes}
            onChange={(value) => onInputChange('durationMinutes', value)}
            placeholder="Minutes"
            min={0}
            max={59}
          />
        </div>
      </div>
    </div>

    {/* Number of Participants */}
    <div>
      <label htmlFor="number_of_participants" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
        Number of participants <span className="text-red-500">*</span>
      </label>
      <input
        id="number_of_participants"
        type="number"
        placeholder="Number of participants"
        value={formData.number_of_participants}
        onChange={(e) => onInputChange('number_of_participants', e.target.value)}
        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        min={0}
      />
      <p className="text-xs md:text-sm text-gray-500 mt-1">Enter number of participants</p>
    </div>

    {/* Next Button */}
    <div className="flex justify-center pt-2 md:pt-4">
      <button
        type="button"
        onClick={onNext}
        className="bg-[#000091] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  </form>
</>
)

export const InitScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    context: '',
    durationHours: 0,
    durationMinutes: 0,
    number_of_participants: 0
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => {
      if (field === 'number_of_participants') {
        let intValue = 0
        if (typeof value === 'string') {
          intValue = value === '' ? 0 : parseInt(value, 10)
        } else {
          intValue = value
        }
        return {
          ...prev,
          [field]: isNaN(intValue) ? 0 : intValue
        }
      }
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const [showSpecCard, setShowSpecCard] = useState(false)

  const handleNext = () => {
    setShowSpecCard(true)
  }

  const navigate = useNavigate();

  const computeDuration = () => {
    return formData.durationHours * 3600 + formData.durationMinutes * 60
  }

  const handleSubmitSpecCard = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/decision/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          context: formData.context,
          duration: computeDuration(),
          number_of_participants: formData.number_of_participants
        })
      });
      const data = await response.json();
      localStorage.setItem(`organizer_of_decision_${data.id}`, "Yes");
      const formattedLink = data.link.replace(/^https?:\/\/[^/]+/, '');
      navigate(formattedLink, { state: { shareLink: data.link, isOwner: true } });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Helper to convert total minutes to hours/minutes
  const getDurationObj = () => ({
    hours: formData.durationHours,
    minutes: formData.durationMinutes
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-4 md:p-8 shadow-sm">
        {!showSpecCard ? (
          <InitForm
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        ) : 
          <SpecCard
            decisionTitle={formData.title}
            decisionContext={formData.context}
            duration={getDurationObj()}
            participants={formData.number_of_participants}
            handleCancel={() => setShowSpecCard(false)}
            handleSubmit={handleSubmitSpecCard}
          />
        }
      </div>
    </div>
  )
}