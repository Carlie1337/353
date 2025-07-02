"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, ArrowLeft, Shield, Users, Heart, Radio, Zap, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("resident")
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const portals = [
    {
      id: "resident",
      name: "Resident Portal",
      description: "Access your personal services and documents",
      icon: Users,
      color: "bg-blue-500",
      route: "/portal",
    },
    {
      id: "admin",
      name: "Admin Portal",
      description: "Administrative dashboard and management",
      icon: Shield,
      color: "bg-purple-500",
      route: "/admin",
    },
    {
      id: "health",
      name: "Health Portal",
      description: "Healthcare services and medical records",
      icon: Heart,
      color: "bg-red-500",
      route: "/health-portal",
    },
    {
      id: "net",
      name: "NET Portal",
      description: "Neighborhood Emergency Team coordination",
      icon: Radio,
      color: "bg-orange-500",
      route: "/net",
    },
    {
      id: "resqnet",
      name: "ResQNet",
      description: "Emergency response and disaster management",
      icon: Zap,
      color: "bg-green-500",
      route: "/ResQNet",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication - accept any email/password
      if (formData.email && formData.password) {
        const selectedPortal = portals.find((p) => p.id === activeTab)
        if (selectedPortal) {
          router.push(selectedPortal.route)
        }
      } else {
        setError("Please enter both email and password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError("")
  }

  const currentPortal = portals.find((p) => p.id === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image
              src="/images/dashboard-section.png"
              alt="Barangay Bucana Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">Barangay Bucana</h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Choose your portal and enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 h-auto p-1">
                {portals.map((portal) => (
                  <TabsTrigger
                    key={portal.id}
                    value={portal.id}
                    className="flex flex-col items-center space-y-1 p-3 data-[state=active]:bg-background"
                  >
                    <div className={`w-8 h-8 ${portal.color} rounded-lg flex items-center justify-center`}>
                      <portal.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{portal.name.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {portals.map((portal) => (
                <TabsContent key={portal.id} value={portal.id} className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div
                      className={`w-12 h-12 ${portal.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                    >
                      <portal.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{portal.name}</h3>
                    <p className="text-sm text-muted-foreground">{portal.description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="rounded" />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        `Sign in to ${portal.name}`
                      )}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-medium">Demo Credentials</p>
                  <p>Email: demo@bucana.gov.ph</p>
                  <p>Password: demo123</p>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <p className="font-medium">Need Help?</p>
                  <p>Call: (082) 123-4567</p>
                  <p>Email: support@bucana.gov.ph</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>© 2024 Barangay Bucana. All rights reserved.</p>
          <p>Powered by Digital Innovation</p>
        </div>
      </div>
    </div>
  )
}
