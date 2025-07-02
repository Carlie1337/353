"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Mail, Clock, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function RegistrationSuccessPage() {
  const [registrationData, setRegistrationData] = useState<any>(null)

  useEffect(() => {
    // Get registration data from localStorage
    const data = localStorage.getItem("pendingRegistration")
    if (data) {
      setRegistrationData(JSON.parse(data))
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
            <CardDescription>
              Your registration has been submitted successfully and is now pending verification.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {registrationData && (
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-3">Registration Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration ID:</span>
                    <span className="font-mono">{registrationData.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{registrationData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>
                      {registrationData.firstName} {registrationData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Submitted:</span>
                    <span>{new Date(registrationData.registrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending Verification
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Check Your Email</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with further instructions. Please check your inbox and spam folder.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Verification Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Your registration will be reviewed by barangay officials. This process typically takes 1-3 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Account Activation</h4>
                  <p className="text-sm text-muted-foreground">
                    Once verified, you'll receive an email notification and can start using all barangay services.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3">What's Next?</h4>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Wait for email confirmation of successful registration</li>
                <li>• Barangay officials will verify your information</li>
                <li>• You'll receive an activation email once approved</li>
                <li>• Log in to access your resident portal and services</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/login">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Go to Login
                </Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>
                Need help? Contact the barangay office at{" "}
                <a href="tel:+63821234567" className="text-primary hover:underline">
                  (082) 123-4567
                </a>{" "}
                or email{" "}
                <a href="mailto:info@barangaybucana.gov.ph" className="text-primary hover:underline">
                  info@barangaybucana.gov.ph
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
