import { useNavigate } from "react-router";

export const WelcomeScreen = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <h1 className="text-6xl font-bold mb-8 text-gray-800">Welcome Screen Title</h1>
        <p className="text-center max-w-2xl mb-12 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button 
          onClick={() => navigate('/init')}
          className="bg-black px-8 py-3 rounded-lg text-white"
        >
          Start
        </button>
      </div>
    )
}