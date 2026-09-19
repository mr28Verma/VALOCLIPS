import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import DemoProfile from "./pages/DemoProfile"
import Agents from "./pages/Agents"
import Leaderboards from "./pages/Leaderboard"

function App() {
  const user = {
    username: "ZALZALA",
    tagline: "4444",
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<DemoProfile />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/leaderboards" element={<Leaderboards />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App