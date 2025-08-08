import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Allow API routes to pass through without authentication
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Allow public routes
  if (pathname === '/' || 
      pathname.startsWith('/blog') || 
      pathname.startsWith('/docs') || 
      pathname.startsWith('/guides') ||
      pathname.startsWith('/pricing') ||
      pathname.startsWith('/privacy') ||
      pathname.startsWith('/terms')) {
    return NextResponse.next()
  }

  // Require authentication for protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}