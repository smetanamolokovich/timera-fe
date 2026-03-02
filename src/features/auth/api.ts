import { apiClient } from '@/shared/api/client'
import { LoginResponse, UserResponse } from '@/types/api'

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>('/auth/login', { email, password })
}

export async function getMe(): Promise<UserResponse> {
  return apiClient.get<UserResponse>('/users/me')
}

export function updateMe(data: {
  firstName?: string
  lastName?: string
  phone?: string
  avatarUrl?: string
}) {
  return apiClient.patch<UserResponse>('/users/me', data)
}

export function switchOrg(organizationId: string) {
  return apiClient.post<LoginResponse>('/auth/switch-org', { organizationId })
}
