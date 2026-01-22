import { useEffect } from "react"
import { Socket } from "socket.io-client"
import SearchRoom from "./SearchRoom"

interface CreateRoomProps {
  RoomCode: string
  socket: Socket
}

export default function CreateRoom({ RoomCode, socket }: CreateRoomProps) {
  const URL = import.meta.env.VITE_URL

  useEffect(() => {
    const initRoom = async () => {
      const roomExist = await SearchRoom({ RoomCode })

      if (!roomExist) {
        try {
          const res = await fetch(`${URL}/rooms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code: RoomCode }),
          })

          if (!res.ok) {
            alert("Error creating room")
            return
          }
        } catch (error) {
          console.error("Error en create room:", error)
          return
        }
      }

      socket.emit("join-room", RoomCode)
    }

    initRoom()
  }, [RoomCode])

  return null
}
