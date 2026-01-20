interface LogoutProps {
  Url: string
  IsRegister: (state: boolean) => void
}

export default async function Logout({ Url, IsRegister }: LogoutProps) {
  const res = await fetch(`${Url}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
  if (res.ok) {
    IsRegister(false)
    window.location.reload()
  } else {
    alert("Logout failed")
  }
  return null
}
