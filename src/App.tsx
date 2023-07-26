import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Views/Auth";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./utils/ErrorBoundary";
import Chat from "./components/Chat/Chat";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/routine" element={<div>routine</div>} />
          <Route path="/failure" element={<div>failure</div>} />
          <Route path="/partsOfMachines" element={<div>partsOfMachines</div>} />
          <Route path="/outlook" element={<div>outlook</div>} />
          <Route path="/mgpro" element={<div>mgpro</div>} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
