import React from 'react';

interface AILoadingScreenProps {
  connexionNumber: number;
  expectedUserNumber: number;
}

export const AILoadingScreen: React.FC<AILoadingScreenProps> = ({
  connexionNumber,
  expectedUserNumber
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg font-semibold text-gray-900">
            AI is analyzing and clustering the proposals
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
            out of {expectedUserNumber} participants joined the workshop
          </span>
        </div>
      </div>
    </div>
  );
};

export default AILoadingScreen;
