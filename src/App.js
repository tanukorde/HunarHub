import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(true);

  // 🔁 refresh nantar login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
  return (
    <Dashboard setIsLoggedIn={setIsLoggedIn} />
  );
}

if (showRegister) {
  return (
    <Register
      goToLogin={() => setShowRegister(false)}
    />
  );
}

return (
  <Login onLogin={() => setIsLoggedIn(true)} />
);
}
export default App;