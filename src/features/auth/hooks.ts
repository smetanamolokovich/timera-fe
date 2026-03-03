import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useAuthStore } from '@/features/auth/store'
import { login, getMe, switchOrg, register } from './api'

export function useLogin() {
  const router = useRouter()
  const setToken = useAuthStore((s) => s.setToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setToken(data.accessToken)
      document.cookie = `timera-auth-token=${data.accessToken}; path=/`
      queryClient.clear()
      router.push('/projects')
    },
    onError: () => {
      notifications.show({
        color: 'red',
        title: 'Login failed',
        message: 'Invalid email or password',
      })
    },
  })
}

export function useMe() {
  const token = useAuthStore((s) => s.token)

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
  })
}

export function useSwitchOrg() {
  const setToken = useAuthStore((s) => s.setToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (organizationId: string) => switchOrg(organizationId),
    onSuccess: (data) => {
      setToken(data.accessToken)
      document.cookie = `timera-auth-token=${data.accessToken}; path=/`
      queryClient.clear()
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const setToken = useAuthStore((s) => s.setToken)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: register,
    onSuccess: async (_, variables) => {
      const data = await login(variables.email, variables.password)
      setToken(data.accessToken)
      document.cookie = `timera-auth-token=${data.accessToken}; path=/`
      queryClient.clear()
      router.push('/projects')
    },
    onError: () => {
      notifications.show({
        color: 'red',
        title: 'Registration failed',
        message: 'This email may already be in use',
      })
    },
  })
}
