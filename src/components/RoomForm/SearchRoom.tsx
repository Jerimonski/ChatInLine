interface SearchRoomProp {
  RoomCode: string
}

export default async function SearchRoom({ RoomCode }: SearchRoomProp) {
  const URL = import.meta.env.VITE_URL
  try {
    const res = await fetch(`${URL}/rooms/${RoomCode}`, {
      method: "GET",
      credentials: "include",
    })
    return res.ok
  } catch (error) {
    console.error("Error sala no encontrada:", error)
    alert("Error de conexión")
    return false
  }
}
