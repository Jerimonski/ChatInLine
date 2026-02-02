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
          <h1>Sala</h1>
          <p>Ingresa un codigo de sala</p>
        </article>
        <div className='home__form-input-container'>
          <input
            type='text'
            value={Room}
            onChange={(e) => SetRoom(e.target.value)}
            maxLength={24}
            required
          />
        </div>
        <div className='home__form-button-container'>
          <button className='home_form-button' type='submit'>
            Ingresar
          </button>
          <button
            className='home_form-button'
            type='submit'
            onClick={handleLogout}
          >
            Cerrar Sesion
          </button>
        </div>
      </form>
    </div>
  )
}
