import { useParams } from "react-router";
import { useEffect, useState } from "react";


export const ResultScreen = () => {
  const params = useParams()
  const [result, setResult] = useState("")

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/decision/${params.uuid}/result/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const _result = await response.json();
        setResult(_result.result)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (params.uuid) getResult()

  }, [params.uuid])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Proposal accepted:
          </h2>
        </div>
        <div className="text-lg font-semibold text-gray-900">
          {result}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;