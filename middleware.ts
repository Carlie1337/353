import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ["/portal", "/admin", "/bms", "/tanod", "/health-portal", "/heartclif", "/net", "/ResQNet"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // If accessing a protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated, check role-based access
  if (session && isProtectedRoute) {
    const { data: profile } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    const userRole = profile?.role

    // Role-based route protection
    const roleRoutes: Record<string, string[]> = {
      resident: ["/portal"],
      health_worker: ["/health-portal", "/portal"],
      tanod: ["/tanod", "/net", "/portal"],
      barangay_official: ["/bms", "/Bofficial", "/portal"],
      admin: ["/admin", "/bms", "/portal", "/health-portal", "/tanod"],
      superadmin: ["/heartclif", "/admin", "/bms", "/portal", "/health-portal", "/tanod", "/ResQNet"],
    }

    const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || ["/portal"]
    const hasAccess = allowedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    // If user doesn't have access to this route, redirect to their default route
    if (!hasAccess) {
      const defaultRoute = getDefaultRoute(userRole)
      return NextResponse.redirect(new URL(defaultRoute, req.url))
    }
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (session && (req.nextUrl.pathname.startsWith("/auth") || req.nextUrl.pathname === "/login")) {
    const { data: profile } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    const defaultRoute = getDefaultRoute(profile?.role)
    return NextResponse.redirect(new URL(defaultRoute, req.url))
  }

  return res
}

function getDefaultRoute(role?: string): string {
  switch (role) {
    case "resident":
      return "/portal"
    case "health_worker":
      return "/health-portal"
    case "tanod":
      return "/tanod"
    case "barangay_official":
      return "/bms"
    case "admin":
      return "/admin"
    case "superadmin":
      return "/heartclif"
    default:
      return "/portal"
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
