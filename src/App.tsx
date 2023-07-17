import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Views/Auth";
import MainContainer from "./components/MainContainer";
import ErrorBoundary from "./utils/ErrorBoundary";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<MainContainer />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
