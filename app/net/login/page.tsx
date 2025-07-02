"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Eye, EyeOff } from "lucide-react"

export default function NETLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/net"
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">NET Portal</CardTitle>
          <CardDescription>Network Enforcement Team - Demo Access</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agency">Agency</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your agency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pnp">Philippine National Police (PNP)</SelectItem>
                  <SelectItem value="afp">Armed Forces of the Philippines (AFP)</SelectItem>
                  <SelectItem value="bjmp">Bureau of Jail Management (BJMP)</SelectItem>
                  <SelectItem value="bfp">Bureau of Fire Protection (BFP)</SelectItem>
                  <SelectItem value="pcg">Philippine Coast Guard (PCG)</SelectItem>
                  <SelectItem value="dilg">DILG</SelectItem>
                  <SelectItem value="barangay">Barangay Tanod</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="badge">Badge/ID Number</Label>
              <Input id="badge" type="text" placeholder="Enter your badge number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>This is a demo. Do not enter real data.</p>
            <p className="mt-1">Contact support for access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
