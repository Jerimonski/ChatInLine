interface RegisterUserProps {
  Url: string
  email: string
  password: string
  IsRegister: (state: boolean) => void
}

export default async function RegisterUser({
  Url,
  email,
  password,
  IsRegister,
}: RegisterUserProps) {
  try {
    const res = await fetch(`${Url}/auth/register`, {
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
