export interface LoginResponse {
  accessToken: string
}

export interface JwtPayload {
  id: string
  email: string
  organizationId: string | null
  role: OrganizationRole | null
}

export interface UserResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  timezone?: string
  locale?: string
  avatarUrl?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationResponse {
  id: string
  name: string
  address?: string
  phoneNumber?: string
  email?: string
  logoUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type OrganizationRole = 'OWNER' | 'MANAGER' | 'MEMBER'

export interface ProjectResponse {
  id: string
  name: string
  organizationId: string
  createdAt: string
  updatedAt: string
}

export interface TimeEntryResponse {
  id: string
  projectId: string
  employeeId: string
  workTypeId: string
  description?: string
  date: string
  minutes: number
  createdAt: string
  updatedAt: string
}

export interface EmployeeResponse {
  id: string
  organizationId: string
  firstName: string
  lastName: string
  hourlyRate?: number
  createdAt: string
  updatedAt: string
}

export interface WorkTypeResponse {
  id: string
  organizationId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface InvitationResponse {
  id: string
  email: string
  organizationId: string
  token: string
  expiresAt: string
  createdAt: string
}

export interface ProjectSummaryResponse {
  projectId: string
  projectName: string
  totalMinutes: number
  totalCost: number
  entriesCount: number
}
