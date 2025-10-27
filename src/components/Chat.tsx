import { Socket } from "socket.io-client"
import { useEffect, useState } from "react"

interface ChatProps {
  socket: Socket
  username: string
  room: string
}
interface Message {
  room: string
  id: string | undefined
  author: string
  message: string
  time: string
}

export default function Chat({ socket, username, room }: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState<string>("")
  const [messageList, setMessageList] = useState<Message[]>([])

  const sendMessage = async () => {
    if (currentMessage) {
      const timeString = new Date().toLocaleTimeString([], {
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      console.log(timeString)

      const message: Message = {
        room,
        id: socket.id,
        author: username,
        message: currentMessage,
        time: timeString,
      }

      setMessageList((prev) => [...prev, message])
      await socket.emit("send_message", message)
      setCurrentMessage("")
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessageList((prev) => [...prev, data])
    })

    return () => {
      socket.off("receive_message")
    }
  }, [socket])

  return (
    <main className='chat'>
      <section className='chat__header'>
        <div className='chat__user-info'>
          <h2 className='chat__title'>Open Chat</h2>
          <span className='chat__username'>Chateando como: {username}</span>
        </div>
        <div className='chat__stats'>
          <span className='chat__messages-count'>
            Room: {room} "usuarios activos"
          </span>
        </div>
      </section>
      <section className='chat__messages'>
        <div className='chat__message-list'>
          {messageList.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col p-2.5 mb-2 rounded-md w-[70%] sm:w-80 ${
                  message.id === socket.id
                    ? "bg-purple-800 self-end"
                    : "bg-slate-800 self-start"
                }`}
              >
                <p className='font-bold'>{message.author}</p>
                <p>{message.message}</p>
                <p className='text-sm font-light text-end'>{message.time}</p>
              </div>
            )
          })}
        </div>
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
            IC
          </button>
        </div>
      </section>
    </main>
  )
}
