import SubscriberPanel from "./components/SubscriberPanel";
import SenderPanel from "./components/SenderPanel";

import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Realtime Notification Dashboard</h1>

      <div className="wrapper">
        <SubscriberPanel />

        <SenderPanel />
      </div>
    </div>
  );
}

export default App;
