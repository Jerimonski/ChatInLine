import React, { useState } from "react"
import LoginUser from "../LoginUser"
import RegisterUser from "../RegisterUser"

interface AuthFormProps {
  Url: string
  Registered: boolean
  SetIsAuthenticated: (state: boolean) => void
  SetIsRegister: (state: boolean) => void
}

export default function LoginForm({
  Url,
  Registered,
  SetIsAuthenticated,
  SetIsRegister,
}: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  /* =========================
         LOGIN
      ========================= */
  const handleLogin = (e: React.FormEvent) => {
    LoginUser({
      Url: Url,
      email,
      password,
      Authenticated: SetIsAuthenticated,
      e,
    })
  }

  /* =========================
         REGISTER
      ========================= */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    RegisterUser({
      Url: Url,
      email,
      password,
      IsRegister: SetIsRegister,
    })
  }

  return (
    <form
      className='home__form'
      onSubmit={Registered ? handleRegister : handleLogin}
    >
      <article className='home__form-header'>
        <h1>{Registered ? "REGISTER" : "LOGIN"}</h1>
        <p>
          {Registered ? "Create an account to continue" : "Login to continue"}
        </p>
      </article>

      <div className='home__form-input-container'>
        <label>
          Email
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>

      <button type='submit'>{Registered ? "Register" : "Login"}</button>

      <button type='button' onClick={() => SetIsRegister(!Registered)}>
        {Registered ? "Already have an account?" : "Create account"}
      </button>
    </form>
  )
}
