import { useState } from "react";
import reactLogo from "./assets/react.svg";
import AuthContextProvider, { useAuth } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();

  return <>{user ? <Home /> : <Login />}</>;
}

export default App;
