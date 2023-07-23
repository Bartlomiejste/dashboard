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
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
