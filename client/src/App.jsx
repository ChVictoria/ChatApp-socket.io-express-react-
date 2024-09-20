import {Routes, Route} from "react-router-dom"
import Login from "./pages/login/login.jsx"
import Chat from "./pages/chat/chat.jsx"



function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat />}/>
    </Routes>
  )
}

export default App
