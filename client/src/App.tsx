import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Logout from "./components/Logout"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
