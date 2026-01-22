import { useEffect } from "react"
import type { Message } from "../types/message"
interface UseLastMessage {
  roomCode: string
  SetMessageList: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function useLastMessage({
  roomCode,
  SetMessageList,
}: UseLastMessage) {
  const URL = import.meta.env.VITE_URL
  useEffect(() => {
    if (!roomCode) return

    const fetchMessages = async () => {
      const res = await fetch(`${URL}/messages/${roomCode}`, {
        credentials: "include",
      })

      if (!res.ok) return

      const data = await res.json()

      const formattedMessages: Message[] = data.lastMessages
        .reverse()
        .map((msg: any) => {
          return {
            roomCode,
            id: msg.userId?._id,
            username: msg.userId?.username || "Unknown",
            message: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        })

      SetMessageList(formattedMessages)
    }

    fetchMessages()
  }, [roomCode, URL, SetMessageList])

  return null
}
