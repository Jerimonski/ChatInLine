interface LoginProps {
  Url: string
  email: string
  password: string
  Authenticated: (state: boolean) => void
  e: React.FormEvent
}

export default async function LoginUser({
  Url,
  email,
  password,
  Authenticated,
  e,
}: LoginProps) {
  e.preventDefault()

  try {
    const res = await fetch(`${Url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      Authenticated(true)
    } else {
      alert("Login failed")
    }
  } catch (error) {
    console.error("Error en el login:", error)
    alert("Error de conexión")
  }
}
