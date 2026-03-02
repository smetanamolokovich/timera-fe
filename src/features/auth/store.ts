import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JwtPayload } from '@/types/api'

interface AuthState {
  token: string | null
  user: JwtPayload | null
  setToken: (token: string) => void
  clearAuth: () => void
}

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    return JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    ) as JwtPayload
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => {
        localStorage.setItem('access_token', token)
        set({ token, user: decodeToken(token) })
      },

      clearAuth: () => {
        localStorage.removeItem('access_token')
        set({ token: null, user: null })
      },
    }),
    {
      name: 'timera-auth',
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.user = decodeToken(state.token)
          localStorage.setItem('access_token', state.token)
        }
      },
    },
  ),
)
