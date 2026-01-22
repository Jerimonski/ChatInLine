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
