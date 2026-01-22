import { useEffect } from "react"
import type { Socket } from "socket.io-client"

interface UseRoomProps {
  roomCode: string
  socket: Socket
}

export default function useRoom({ roomCode, socket }: UseRoomProps) {
  useEffect(() => {
    if (!roomCode) return

    socket.emit("join-room", roomCode)

    return () => {
      socket.emit("leave-room", roomCode)
    }
  }, [socket, roomCode])
  return <div>useRoom</div>
}
