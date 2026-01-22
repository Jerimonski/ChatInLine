interface LoginProps {
  email: string
  password: string
  Authenticated: (state: boolean) => void
  e: React.FormEvent
}

export default async function LoginUser({
  email,
  password,
  Authenticated,
  e,
}: LoginProps) {
  const URL = import.meta.env.VITE_URL
  e.preventDefault()

  try {
    const res = await fetch(`${URL}/auth/login`, {
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
