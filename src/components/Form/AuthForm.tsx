import React, { useState } from "react"
import LoginUser from "../LoginUser"
import RegisterUser from "../RegisterUser"

interface AuthFormProps {
  Registered: boolean
  SetIsAuthenticated: (state: boolean) => void
  SetIsRegister: (state: boolean) => void
  SetCurrentUsername: (string: string) => void
}

export default function LoginForm({
  Registered,
  SetIsAuthenticated,
  SetIsRegister,
  SetCurrentUsername,
}: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    SetCurrentUsername(email)

    LoginUser({
      email,
      password,
      Authenticated: SetIsAuthenticated,
      e,
    })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    RegisterUser({
      email,
      password,
      IsRegister: SetIsRegister,
    })
  }

  return (
    <form
      className='home__form animate__animated animate__fadeInDown'
      onSubmit={Registered ? handleRegister : handleLogin}
    >
      <article className='home__form-header'>
        <h1>{Registered ? "Registro" : "Bienvenido"}</h1>
        <p>
          {Registered
            ? "Crea un usuario para continuar"
            : "Ingresa tu usuario para continuar"}
        </p>
      </article>

      <div className='home__form-input-container'>
        <label>
          Correo
          <input
            type='email'
            value={email}
            placeholder='ejemplo@correo.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type='password'
            value={password}
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='home__form-button-container'>
        <button className='home_form-button' type='submit'>
          {Registered ? "Registrarse" : "Iniciar sesión"}
        </button>
        <button
          className='home_form-button'
          type='button'
          onClick={() => SetIsRegister(!Registered)}
        >
          {Registered ? "Ya tienes una cuenta?" : "Registrarse"}
        </button>
      </div>
    </form>
  )
}
