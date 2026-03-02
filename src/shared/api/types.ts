export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    cursor?: string
  }
}

export interface ApiError {
  statusCode: number
  message: string | string[]
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  cursor?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
