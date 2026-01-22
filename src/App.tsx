import { useEffect, useState } from "react"
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
  const [currentUsername, setCurrentUsername] = useState<string>(() => {
    return localStorage.getItem("username") || ""
  })

  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  useCheck({
    Loading: setLoading,
    Authenticated: setIsAuthenticated,
  })

  useEffect(() => {
    const savedRoom = localStorage.getItem("room")
    const inRoom = localStorage.getItem("inRoom")

    if (savedRoom && inRoom === "true") {
      setRoom(savedRoom)
      setShowChat(true)
    }
  }, [])

  if (loading) return null

  return (
    <main>
      <div className='home'>
        {!isAuthenticated ? (
          <AuthForm
            Registered={isRegister}
            SetIsAuthenticated={setIsAuthenticated}
            SetIsRegister={setIsRegister}
            SetCurrentUsername={(username) => {
              setCurrentUsername(username)
              localStorage.setItem("username", username)
            }}
          />
        ) : !showChat ? (
          <RoomForm
            SetIsRegister={setIsRegister}
            SetShowChat={(value) => {
              setShowChat(value)
              if (!value) {
                localStorage.removeItem("room")
                localStorage.removeItem("inRoom")
              }
            }}
            Room={room}
            SetRoom={(value) => {
              setRoom(value)
              localStorage.setItem("room", value)
              localStorage.setItem("inRoom", "true")
            }}
          />
        ) : (
          <Chat
            socket={socket}
            roomCode={room}
            SetIsRegister={setIsRegister}
            currentUsername={currentUsername.split("@")[0]}
          />
        )}
      </div>
    </main>
  )
}

export default App
