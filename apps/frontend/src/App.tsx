import { useEffect, useRef } from 'react'
import './App.css'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InitScreen } from './screens/InitScreen'
import { JoinScreen } from './screens/JoinScreen'
import { ProposalScreen } from './screens/ProposalScreen'
import { BrowserRouter, Routes, Route } from 'react-router'
import { StartScreen } from './screens/StartScreen'
import WaitScreen from './screens/WaitScreen'

function App() {

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/init" element={<InitScreen />} />
        <Route path="/decision/:uuid" element={<StartScreen />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/propose" element={<ProposalScreen />} />
        <Route path="/wait" element={<WaitScreen />} />
        {/* <Route path="*" element={<Navigate to="/welcome" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
