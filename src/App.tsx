import { useState } from "react"
import io, { Socket } from "socket.io-client"
import Chat from "./components/Chat"
import useCheck from "./hooks/useCheck"
import AuthForm from "./components/Form/AuthForm"
import RoomForm from "./components/Form/RoomForm"
const SERVER_URL = "http://localhost:3000"

const socket: Socket = io(SERVER_URL, {
  withCredentials: true,
})

function App() {
  const [isRegister, setIsRegister] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  /* =========================
     CHECK AUTH FROM BACKEND
  ========================= */
  useCheck({
    Url: SERVER_URL,
    Loading: setLoading,
    Authenticated: setIsAuthenticated,
  })

  if (loading) return null

  return (
    <main>
      <div className='home'>
        {!isAuthenticated ? (
          /* ---------- AUTH FORM ---------- */
          <AuthForm
            Url={SERVER_URL}
            Registered={isRegister}
            SetIsAuthenticated={setIsAuthenticated}
            SetIsRegister={setIsRegister}
          />
        ) : !showChat ? (
          /* ---------- ROOM FORM ---------- */
          <RoomForm
            Url={SERVER_URL}
            SetIsRegister={setIsRegister}
            SetShowChat={setShowChat}
            Room={room}
            SetRoom={setRoom}
            Socket={socket}
          />
        ) : (
          <Chat socket={socket} room={room} />
        )}
      </div>
    </main>
  )
}

export default App
