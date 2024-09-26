import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
