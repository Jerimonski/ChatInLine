import { useEffect } from "react"

interface UseCheckProps {
  Loading: (state: boolean) => void
  Authenticated: (state: boolean) => void
}

export default function useCheck({ Loading, Authenticated }: UseCheckProps) {
  const URL = import.meta.env.VITE_URL
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${URL}/auth/me`, {
          credentials: "include",
        })

        if (res.ok) {
          Authenticated(true)
        }
      } catch {
        return
      } finally {
        Loading(false)
      }
    }

    checkAuth()
  }, [Loading, Authenticated])
  return null
}
