import { useState } from "react"
import io, { Socket } from "socket.io-client"
import Chat from "./components/Chat"

const PORT: string = import.meta.env.PORT || "3001"
const VITE_SERVER_URL: string =
  import.meta.env.VITE_SERVER_URL || `http://localhost:${PORT}`
const socket: Socket = io(VITE_SERVER_URL)

function App() {
  const [username, setUserName] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", { room, username })
      setShowChat(true)
    }
  }

  return (
    <main>
      {!showChat ? (
        <div className='home'>
          <form className='home__form'>
            <h1>WELCOME</h1>
            <input
              type='text'
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              required
              placeholder='Your Name'
            />
            <input
              type='text'
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              required
              placeholder='Room ID'
            />
            <button type='submit' onClick={joinRoom}>
              Join a Room
            </button>
          </form>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </main>
  )
}

export default App
