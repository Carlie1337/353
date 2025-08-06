import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define role-based route mappings
const ROLE_ROUTES = {
  resident: ['/portal'],
  health_worker: ['/health-portal'],
  tanod: ['/net', '/tanod'],
  barangay_official: ['/Bofficial'],
  admin: ['/admin'],
  superadmin: ['/heartclif', '/ResQNet', '/admin']
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/forgot-password', 
  '/register',
  '/register/success',
  '/emergency',
  '/documents',
  '/weather',
  '/enrollment'
]

// Routes that should redirect to appropriate portal after login
const LOGIN_ROUTES = ['/auth/login', '/login']

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    const { pathname } = request.nextUrl

    // Allow public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      return res
    }

    // Check for demo user in localStorage (client-side only)
    const demoUserHeader = request.headers.get('x-demo-user')
    let user = null
    let userRole = null

    if (demoUserHeader) {
      try {
        const demoUser = JSON.parse(demoUserHeader)
        user = { id: demoUser.id }
        userRole = demoUser.role
      } catch (e) {
        // Invalid demo user data
      }
    }

    // If no demo user, check Supabase session
    if (!user) {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()
      
      if (!supabaseUser) {
        // No authenticated user, redirect to login
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(loginUrl)
      }

      user = supabaseUser

      // Get user role from database
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single()

      userRole = roleData?.role || 'resident'
    }

    // Handle login redirects
    if (LOGIN_ROUTES.some(route => pathname.startsWith(route))) {
      const redirectTo = request.nextUrl.searchParams.get('redirectTo')
      
      if (redirectTo && redirectTo !== '/') {
        return NextResponse.redirect(new URL(redirectTo, request.url))
      }

      // Redirect to appropriate portal based on role
      switch (userRole) {
        case 'health_worker':
          return NextResponse.redirect(new URL('/health-portal', request.url))
        case 'tanod':
          return NextResponse.redirect(new URL('/net', request.url))
        case 'barangay_official':
          return NextResponse.redirect(new URL('/Bofficial', request.url))
        case 'admin':
          return NextResponse.redirect(new URL('/admin', request.url))
        case 'superadmin':
          return NextResponse.redirect(new URL('/heartclif', request.url))
        default:
          return NextResponse.redirect(new URL('/portal', request.url))
      }
    }

    // Check if user has access to the requested route
    const hasAccess = Object.entries(ROLE_ROUTES).some(([role, routes]) => {
      if (userRole === role || (userRole === 'superadmin' && role !== 'resident')) {
        return routes.some(route => pathname.startsWith(route))
      }
      return false
    })

    if (!hasAccess) {
      // Redirect to appropriate portal based on role
      switch (userRole) {
        case 'health_worker':
          return NextResponse.redirect(new URL('/health-portal', request.url))
        case 'tanod':
          return NextResponse.redirect(new URL('/net', request.url))
        case 'barangay_official':
          return NextResponse.redirect(new URL('/Bofficial', request.url))
        case 'admin':
          return NextResponse.redirect(new URL('/admin', request.url))
        case 'superadmin':
          return NextResponse.redirect(new URL('/heartclif', request.url))
        default:
          return NextResponse.redirect(new URL('/portal', request.url))
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
