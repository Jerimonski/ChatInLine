import { Socket } from "socket.io-client"
import { useState } from "react"
import CreateRoom from "./RoomForm/CreateRoom"
import Logout from "./Logout"
import useGetMessage from "../hooks/useGetMessage"
import type { Message } from "../types/message"
import useLastMessage from "../hooks/useLastMessage"
import useRoom from "../hooks/useRoom"
import useMessage from "../hooks/useMessage"
import MessageBox from "./RoomChat/MessageBox"
import { SendIcon, UserIcon } from "./common/icons"

interface ChatProps {
  socket: Socket
  roomCode: string
  SetIsRegister: (state: boolean) => void
  currentUsername: string
}

export default function Chat({
  socket,
  roomCode,
  currentUsername,
  SetIsRegister,
}: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState<Message[]>([])

  useLastMessage({
    roomCode,
    SetMessageList: setMessageList,
  })

  useRoom({
    roomCode: roomCode,
    socket: socket,
  })

  const { sendMessage } = useMessage({
    roomCode,
    socket,
    currentMessage,
    setCurrentMessage,
    SetMessageList: setMessageList,
  })

  useGetMessage({
    socket,
    room: roomCode,
    SetMessageList: setMessageList,
  })

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.removeItem("room")
    localStorage.removeItem("inRoom")
    Logout({
      IsRegister: SetIsRegister,
    })
  }
  const handleRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.removeItem("inRoom")
    window.location.reload()
  }

  return (
    <main className='chat'>
      <CreateRoom RoomCode={roomCode} socket={socket} />

      <div className='chat__container'>
        <section className='chat__header'>
          <div className='chat__user-info'>
            <div className='chat__user-icon'>
              <UserIcon size='3rem' color='#DFE9F5' />
            </div>
            <div>
              <h2>{currentUsername}</h2>
              <span>Sala: {roomCode}</span>
            </div>
          </div>
          <div className='chat__buttons-header'>
            <button type='submit' onClick={handleRoom}>
              Salir de la sala
            </button>
            <button type='submit' onClick={handleLogout}>
              Cerrar sesion
            </button>
          </div>
        </section>

        <section className='chat__messages'>
          <MessageBox
            messageList={messageList}
            currentUsername={currentUsername}
          />
          <hr />
          <div className='chat__box-input-message'>
            <input
              className='chat__input-message'
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder='Ingresa un comentario'
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type='text'
            />
            <button className='chat__send-button' onClick={sendMessage}>
              <SendIcon size='2rem' color='white' />
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
