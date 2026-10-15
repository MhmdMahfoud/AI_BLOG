import Navbar from "./components/Navbar"
import AddBlog from "./pages/AddBlog"
import Home from "./pages/Home"
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Login from "./pages/Login"
function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="add-blog"element={<AddBlog/>}/>
      <Route path="/login" element={<Login />} />
   
    </Routes>
    </Router>
    </>
  )
}

export default App