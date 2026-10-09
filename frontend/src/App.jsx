import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Identity from "./pages/Identity"
import Credentials from "./pages/Credentials"
import Authenticate from "./pages/Authenticate"
import Wallet from "./pages/Wallet"
import Verify from "./pages/Verify"
import ActivityPage from "./pages/Activity"
import SettingsPage from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App