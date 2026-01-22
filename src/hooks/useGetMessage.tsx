import { useEffect } from "react"
import type { Socket } from "socket.io-client"
import type { Message } from "../types/message"

interface UseGetMessage {
  socket: Socket
  room: string
  SetMessageList: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function useNewMessage({
  socket,
  room,
  SetMessageList,
}: UseGetMessage) {
  useEffect(() => {
    const onNewMessage = (data: any) => {
      SetMessageList((prev) => [
        ...prev,
        {
          room,
          id: data.userId,
          username: data.username,
          message: data.content,
          time: new Date(data.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
    }

    socket.on("new-message", onNewMessage)

    return () => {
      socket.off("new-message", onNewMessage)
    }
  }, [socket, room])
  return null
}
