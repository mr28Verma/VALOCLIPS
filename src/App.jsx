import { useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
// import DemoProfile from "./pages/DemoProfile"
import Agents from "./pages/Agents"
import Weekly from "./pages/Weekly"
import LegalPage from "./pages/LegalPage"
import Footer from "./components/Footer"
import Profile from "./pages/Profile"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])

  return null
}

function App() {
  const user = {
    username: "ZALZALA",
    tagline: "4444",
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/dmca" element={<LegalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer user={user} />
    </BrowserRouter>
  )
}

export default App