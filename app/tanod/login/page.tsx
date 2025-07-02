"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Shield, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TanodLoginPage() {
  const router = useRouter()
  const [badgeNumber, setBadgeNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo validation - accept any badge number and password
      if (badgeNumber && password) {
        // Redirect to tanod dashboard
        router.push("/tanod")
      } else {
        throw new Error("Please enter both badge number and password")
      }
    } catch (err: any) {
      setError(err.message || "Failed to login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-white flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Barangay Bucana</h1>
          <p className="text-blue-200">Tanod Security Portal</p>
          <Badge variant="secondary" className="mt-2">
            Security & Emergency Response System
          </Badge>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Tanod Login</CardTitle>
            <CardDescription>Enter your badge number and password to access the security portal</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badgeNumber">Badge Number</Label>
                <Input
                  id="badgeNumber"
                  type="text"
                  placeholder="Enter your badge number (e.g., 12345)"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  required
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
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login to Portal"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Forgot your password?{" "}
              <Link href="/tanod/forgot-password" className="text-blue-600 hover:underline">
                Contact your supervisor
              </Link>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/login">Admin Portal</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Resident Portal</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <h4 className="font-medium text-yellow-800 mb-2">Demo Credentials</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>
                  Badge Number: <span className="font-mono">12345</span>
                </p>
                <p>
                  Password: <span className="font-mono">tanod123</span>
                </p>
                <p className="text-xs mt-2">Use any badge number and password for demo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
