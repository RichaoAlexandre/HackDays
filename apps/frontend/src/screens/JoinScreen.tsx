export const JoinScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Workshop Start Screen Title
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet consectetur. Magna tellus dictumst amet eu auctor tempor magna arcu magna. Ultrices velit egestas augue iaculis sit scelerisque. Curabitur augue nisl adipiscing sit.
        </p>

        <button
          className="px-6 py-3 bg-[#000091] text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() => {}}
        >
          Join Workshop
        </button>

        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">TA</div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">CN</div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">BO</div>
          </div>
          <span className="text-sm text-gray-600">+1 participants joined</span>
        </div>
      </div>
    </div>
  )
}
