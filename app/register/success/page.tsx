"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Mail, Shield, FileText, Calendar, Users, MapPin, Phone, ArrowRight, Clock, Info } from 'lucide-react'

export default function RegistrationSuccessPage() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/auth/login")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const services = [
    {
      icon: FileText,
      title: "Document Requests",
      description: "Request barangay certificates, clearances, and permits online"
    },
    {
      icon: Calendar,
      title: "Health Appointments",
      description: "Schedule appointments at the barangay health center"
    },
    {
      icon: Users,
      title: "Community Programs",
      description: "Stay updated on community events and programs"
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Access maps and location-based services"
    },
    {
      icon: Phone,
      title: "Emergency Services",
      description: "Quick access to emergency contacts and reporting"
    },
    {
      icon: Shield,
      title: "Security Features",
      description: "Secure access to your personal information and records"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Welcome to the Barangay 76-A Bucana Management System
          </p>
          <Badge variant="secondary" className="text-sm">
            Account Created Successfully
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Account Status
                </CardTitle>
                <CardDescription>
                  Your account has been created and is ready to use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Account Created</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Complete
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium">Email Verification</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium">Profile Verification</span>
                  </div>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    Optional
                  </Badge>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Email Verification:</strong> Please check your email inbox and click the verification link to activate all features. 
                    You can still access basic services without verification.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Available Services */}
            <Card>
              <CardHeader>
                <CardTitle>Available Services</CardTitle>
                <CardDescription>
                  Here's what you can do with your new account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <service.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Check Your Email</p>
                      <p className="text-xs text-gray-600">Verify your email address to unlock all features</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Complete Your Profile</p>
                      <p className="text-xs text-gray-600">Add additional information for better services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Explore Services</p>
                      <p className="text-xs text-gray-600">Start using barangay services and features</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Redirecting to login in
                  </p>
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {countdown}s
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/auth/login">
                      Sign In Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>(082) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>support@barangay76a.gov.ph</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Barangay Hall, 76-A Bucana</span>
                  </div>
                </div>
                <Separator />
                <p className="text-xs text-gray-600">
                  Office Hours: Monday - Friday, 8:00 AM - 5:00 PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Thank you for joining the Barangay 76-A Bucana digital community!
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Link href="/portal" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Resident Portal
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/about" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
