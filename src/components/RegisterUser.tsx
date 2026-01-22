interface RegisterUserProps {
  email: string
  password: string
  IsRegister: (state: boolean) => void
}

export default async function RegisterUser({
  email,
  password,
  IsRegister,
}: RegisterUserProps) {
  const URL = import.meta.env.VITE_URL
  try {
    const res = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: email.split("@")[0],
        email,
        password,
      }),
    })

    if (res.ok) {
      IsRegister(false)
    } else {
      alert("Register failed")
    }
  } catch (error) {
    console.error("Error en el registro:", error)
    alert("Error de conexión")
  }
}
