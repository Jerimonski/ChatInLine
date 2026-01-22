interface LogoutProps {
  IsRegister: (state: boolean) => void
}

export default async function Logout({ IsRegister }: LogoutProps) {
  const URL = import.meta.env.VITE_URL
  const res = await fetch(`${URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
  if (res.ok) {
    IsRegister(false)
    localStorage.removeItem("username")
    window.location.reload()
  } else {
    alert("Logout failed")
  }
  return null
}
