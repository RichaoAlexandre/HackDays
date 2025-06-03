import { useEffect, useRef, useState } from 'react'
import { JoinScreen } from '../screens/JoinScreen'
import { ProposalScreen } from '../screens/ProposalScreen'
import WaitScreen from '../screens/WaitScreen'

export const StepsHandler = () => {
  const [step, setStep] = useState(1)
  const wsRef = useRef(null);

  useEffect(() => {
    // url of websocket: <url>/ws/decision/<decision_id>/current_step/
    const wsUrl = `http://localhost:8000/ws/decision/1/current_step/`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connecté pour process", 1);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "step.update") {
          setStep(data.step)
          console.log(data.step);
        }
      } catch (err) {
        console.error("Erreur lors du parsing du JSON WebSocket :", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error :", error);
    };

    ws.onclose = (e) => {
      console.log("WebSocket fermé :", e);
      // Si nécessaire, tenter une reconnexion ici
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const renderStep = () => {
    switch(step) {
        case 1:   return <WaitScreen />; // Wait screen could be the same for owner and user
        case 2:   return <ProposalScreen />; 
        case 3: return <WaitScreen />; // Screen to wait before AI clustering
        case 4:  return <JoinScreen />; // Screen of votes
        case 5:  return <WaitScreen />; // Screen of result
        default: return <JoinScreen />; // If the step is not beetwen 1-5, something may be wrong
      }
  }

  return (
    <>
      {renderStep()}
    </>
  )
}
