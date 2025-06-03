import { useEffect, useRef, useState } from 'react'
import { JoinScreen } from '../screens/JoinScreen'
import { ProposalScreen } from '../screens/ProposalScreen'
import WaitScreen from '../screens/WaitScreen'
import { useParams } from 'react-router'

export const StepsHandler = () => {
  const [step, setStep] = useState(1)
  const [connexionNumber, setConnexionNumber] = useState(0)
  const [decision, setDecision] = useState(null)
  const wsRef = useRef(null);
  const params = useParams()

  useEffect(() => {
    if (params.uuid) {
      // url of websocket: <url>/ws/decision/<decision_id>/current_step/
      const wsUrl = `ws://localhost:8000/ws/decision/${params.uuid}/current_step/`;
  
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
          }
          if (data.type === "connexion.number") {
            setConnexionNumber(data.count)
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

    }
  }, [params.uuid]);

  useEffect(() => {
    const fetchDecision = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/decision/${params.uuid}/`, {
          method: 'GET',
        });
        const data = await response.json();
        setDecision(data)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (params.uuid) {
      fetchDecision()
    }
  }, [params.uuid])

  const renderStep = () => {
    switch(step) {
        case 1:   return <WaitScreen connexionNumber={connexionNumber} expectedUserNumber={decision.number_of_participants} />; // Wait screen could be the same for owner and user
        case 2:   return <ProposalScreen />; 
        case 3: return <WaitScreen connexionNumber={connexionNumber} expectedUserNumber={decision.number_of_participants}/>; // Screen to wait before AI clustering
        case 4:  return <JoinScreen />; // Screen of votes
        case 5:  return <WaitScreen connexionNumber={connexionNumber} expectedUserNumber={decision.number_of_participants}/>; // Screen of result
        default: return <JoinScreen />; // If the step is not beetwen 1-5, something may be wrong
      }
  }

  return (
    <>
      {decision && renderStep()}
    </>
  )
}
