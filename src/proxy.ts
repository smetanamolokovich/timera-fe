import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/login', '/register', '/invite']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('timera-auth-token')?.value

  const isAuthPage = ['/login', '/register'].some((p) => pathname.startsWith(p))

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/projects', request.url))
  }

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))
  if (isPublic) return NextResponse.next()

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
