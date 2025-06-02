import { useState } from "react"
import NumberInput from "../components/NumberInput"

export const InitScreen = () => {
    const [formData, setFormData] = useState({
      decisionTitle: '',
      decisionContext: '',
      hours: '',
      minutes: '', 
      participants: ''
    })
  
    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  
    const handleNext = () => {
      // Handle form submission
      console.log('Form data:', formData)
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-4 md:p-8 shadow-sm">
          <div className="mb-6 md:mb-8">
            <h3 className="text-xs md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
              Decision making workshop details
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Massa venenatis fermentum orci eget tempus lacus maecenas.
            </p>
          </div>
  
          <form className="space-y-4 md:space-y-6">
            {/* Decision Title */}
            <div>
              <label htmlFor="decisionTitle" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
                Decision title <span className="text-red-500">*</span>
              </label>
              <input
                id="decisionTitle"
                type="text"
                placeholder="Decision title"
                value={formData.decisionTitle}
                onChange={(e) => handleInputChange('decisionTitle', e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs md:text-sm text-gray-500 mt-1">Enter your decision title</p>
            </div>
  
            {/* Decision Context */}
            <div>
              <label htmlFor="decisionContext" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
                Decision context <span className="text-red-500">*</span>
              </label>
              <textarea
                id="decisionContext"
                rows={3}
                placeholder="The decision context could focus on constraints that participants need to take into account for their proposals"
                value={formData.decisionContext}
                onChange={(e) => handleInputChange('decisionContext', e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs md:text-sm text-gray-500 mt-1">Enter your decision context</p>
            </div>
  
            {/* Workshop Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
                Workshop duration <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Hours
                  </label>
                  <NumberInput
                    value={formData.hours === '' ? '' : Number(formData.hours)}
                    onChange={(value) => handleInputChange('hours', value.toString())}
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
                    value={formData.minutes === '' ? '' : Number(formData.minutes)}
                    onChange={(value) => handleInputChange('minutes', value.toString())}
                    placeholder="Minutes"
                    min={0}
                    max={59}
                  />
                </div>
              </div>
            </div>
  
            {/* Number of Participants */}
            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-900 mb-1 md:mb-2">
                Number of participants <span className="text-red-500">*</span>
              </label>
              <input
                id="participants"
                type="number"
                placeholder="Number of participants"
                value={formData.participants}
                onChange={(e) => handleInputChange('participants', e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs md:text-sm text-gray-500 mt-1">Enter number of participants</p>
            </div>
  
            {/* Next Button */}
            <div className="flex justify-center pt-2 md:pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="bg-black text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }