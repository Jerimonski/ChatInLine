import Logout from "../Logout"

interface RoomFormProps {
  SetIsRegister: (state: boolean) => void
  SetShowChat: (state: boolean) => void
  Room: string
  SetRoom: (state: string) => void
}

export default function RoomForm({
  SetIsRegister,
  SetShowChat,
  Room,
  SetRoom,
}: RoomFormProps) {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    Logout({
      IsRegister: SetIsRegister,
    })
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!Room) return

    SetShowChat(true)
  }
  return (
    <div className='home__form'>
      <form onSubmit={handleJoinRoom}>
        <article className='home__form-header'>
          <h1>ROOM</h1>
          <p>Enter a room code</p>
        </article>

        <div className='home__form-input-container'>
          <label>
            Room ID
            <input
              type='text'
              value={Room}
              onChange={(e) => SetRoom(e.target.value)}
              required
            />
          </label>
        </div>
        <button type='submit'>Join Room</button>
      </form>
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
