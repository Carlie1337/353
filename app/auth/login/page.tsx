"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Users, Heart, Building2, Crown } from "lucide-react"
import { signIn } from "@/lib/supabase-auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Get user profile to determine role
        const { supabase } = await import("@/lib/supabase-client")
        const { data: profile } = await supabase.from("users").select("role, name").eq("id", data.user.id).single()

        const role = profile?.role || "resident"
        const name = profile?.name || "User"

        toast({
          title: "Login Successful",
          description: `Welcome back, ${name}!`,
        })

        // Role-based routing
        switch (role) {
          case "resident":
            router.push("/portal")
            break
          case "health_worker":
            router.push("/health-portal")
            break
          case "tanod":
            router.push("/tanod")
            break
          case "barangay_official":
            router.push("/bms")
            break
          case "admin":
            router.push("/admin")
            break
          case "superadmin":
          case "master_admin":
            router.push("/heartclif")
            break
          default:
            router.push("/portal")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const roleCards = [
    {
      title: "Residents",
      description: "Access services, documents, and community information",
      icon: Users,
      color: "bg-blue-500",
      route: "/portal",
    },
    {
      title: "Health Workers",
      description: "Manage patient records and health programs",
      icon: Heart,
      color: "bg-green-500",
      route: "/health-portal",
    },
    {
      title: "Tanod/Security",
      description: "Monitor incidents and patrol management",
      icon: Shield,
      color: "bg-orange-500",
      route: "/tanod",
    },
    {
      title: "Barangay Officials",
      description: "Administrative oversight and governance",
      icon: Building2,
      color: "bg-purple-500",
      route: "/bms",
    },
    {
      title: "System Admin",
      description: "Complete system management and control",
      icon: Crown,
      color: "bg-red-500",
      route: "/heartclif",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">IBMS Login</CardTitle>
            <CardDescription>Sign in to access the Integrated Barangay Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Information */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Your Portal</h2>
            <p className="text-lg text-gray-600">
              Different roles have access to different features and modules within the system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roleCards.map((role, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${role.color}`}>
                      <role.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Resident:</strong> resident@demo.com / password123
              </p>
              <p>
                <strong>Admin:</strong> admin@demo.com / admin123
              </p>
              <p>
                <strong>Health:</strong> health@demo.com / health123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
