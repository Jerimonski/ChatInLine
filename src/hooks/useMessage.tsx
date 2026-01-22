import { Socket } from "socket.io-client"
import type { Message } from "./../types/message"

interface useMessageProps {
  roomCode: string
  socket: Socket
  currentMessage: string
  setCurrentMessage: (state: string) => void
  SetMessageList: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function useMessage({
  roomCode,
  socket,
  currentMessage,
  setCurrentMessage,
  SetMessageList,
}: useMessageProps) {
  const URL = import.meta.env.VITE_URL
  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const res = await fetch(`${URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        roomCode: roomCode,
        content: currentMessage,
      }),
    })

    if (!res.ok) return

    const { newMessage } = await res.json()

    SetMessageList((prev) => [
      ...prev,
      {
        room: roomCode,
        id: newMessage.userId,
        username: newMessage.username,
        message: newMessage.content,
        time: new Date(newMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ])

    socket.emit("send-message", {
      roomCode: roomCode,
      content: newMessage.content,
      userId: newMessage.userId,
      username: newMessage.username,
      createdAt: newMessage.createdAt,
    })

    setCurrentMessage("")
  }

  return { sendMessage }
}
