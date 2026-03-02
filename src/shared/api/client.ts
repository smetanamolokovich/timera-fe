import type { ApiError } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError,
  ) {
    super(Array.isArray(body.message) ? body.message.join(', ') : body.message)
    this.name = 'ApiRequestError'
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | number | boolean | undefined | null>
  body?: unknown
}

async function request<T>(
  method: string,
  path: string,
  { params, body, ...init }: RequestOptions = {},
): Promise<T> {
  const token = getToken()

  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, String(value))
    })
  }

  const response = await fetch(url.toString(), {
    ...init,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let errorBody: ApiError
    try {
      errorBody = await response.json()
    } catch {
      errorBody = { statusCode: response.status, message: response.statusText }
    }
    throw new ApiRequestError(response.status, errorBody)
  }

  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>('DELETE', path, options),
}
