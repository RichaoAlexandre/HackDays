import { useParams } from "react-router";

interface WaitScreenProps {
  connexionNumber: number;
  expectedUserNumber: number
  titleLabel?:string ,
  actionLabel?: string,
}

export const WaitScreen = ({
  connexionNumber,
  expectedUserNumber,
  titleLabel, 
  actionLabel
}: WaitScreenProps) => {

  const params = useParams()
  const isOrganizer = () => {
    return localStorage.getItem(`organizer_of_decision_${params.uuid}`) == "Yes"
  }

  const triggerNextStep = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/decision/${params.uuid}/next_step/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg font-semibold text-gray-900">
            {titleLabel}
          </span>
          <svg
            className="animate-spin h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-900 font-semibold text-sm">
            {connexionNumber}
          </span>
          <span className="text-sm text-gray-500">
            {/* out of {expectedUserNumber} participants joined the workshop */}
            out of {expectedUserNumber} participants {actionLabel}
          </span>
        </div>
        {isOrganizer() && (
          <button
            onClick={() => triggerNextStep()}
            className="mt-6 px-6 py-2 bg-[#000091] text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start workshop
          </button>
        )}
      </div>
    </div>
  );
};

export default WaitScreen;
