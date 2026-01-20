import { useEffect } from "react"

interface UseCheckProps {
  Url: string
  Loading: (state: boolean) => void
  Authenticated: (state: boolean) => void
}

export default function useCheck({
  Url,
  Loading,
  Authenticated,
}: UseCheckProps) {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${Url}/auth/me`, {
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
  }, [Url, Loading, Authenticated])
  return null
}
