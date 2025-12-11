import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<Login />} />
            <Route path="/about" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
