"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Download,
  Share2,
  QrCode,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  Home,
  Calendar,
  Copy,
  Smartphone,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

export default function QRCodePage() {
  const [copied, setCopied] = useState(false)

  // Mock user data
  const user = {
    id: "RES-2025-0089",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "09123456789",
    address: "123 Main St, Purok 2, Barangay Bucana",
    birthDate: "1985-01-15",
    verificationStatus: "semi-verified",
    profilePhoto: null,
    qrData: {
      id: "RES-2025-0089",
      name: "Juan Dela Cruz",
      status: "semi-verified",
      issued: "2025-01-15",
      expires: "2026-01-15",
      barangay: "Bucana",
      city: "Davao City",
    },
  }

  const qrCodeData = JSON.stringify(user.qrData)
  const qrCodeUrl = `https://barangay-bucana.gov.ph/verify/${user.id}`

  const handleCopyQR = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = `qr-code-${user.id}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  const getVerificationBadge = () => {
    switch (user.verificationStatus) {
      case "fully-verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Fully Verified
          </Badge>
        )
      case "semi-verified":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Semi-Verified
          </Badge>
        )
      default:
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Not Verified
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/portal/profile">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My QR Code</h1>
          <p className="text-muted-foreground">Your digital identification for barangay services and verification</p>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Digital ID QR Code
            </CardTitle>
            <CardDescription>Scan this code for quick verification and access to services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="p-6 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                <QRCodeSVG
                  id="qr-code"
                  value={qrCodeData}
                  size={200}
                  level="M"
                  includeMargin={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Resident ID: {user.id}</p>
              <div className="flex justify-center">{getVerificationBadge()}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleDownloadQR} variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleCopyQR} variant="outline" className="w-full bg-transparent">
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Information encoded in your QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo and Basic Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.profilePhoto || ""} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">Resident ID: {user.id}</p>
                {getVerificationBadge()}
              </div>
            </div>

            {/* Encoded Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Encoded Information:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-muted-foreground">Name:</span>
                  <span>{user.qrData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-muted-foreground">Status:</span>
                  <span className="capitalize">{user.qrData.status.replace("-", " ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-muted-foreground">Issued:</span>
                  <span>{user.qrData.issued}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-muted-foreground">Expires:</span>
                  <span>{user.qrData.expires}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-gray-500" />
                  <span className="text-muted-foreground">Barangay:</span>
                  <span>
                    {user.qrData.barangay}, {user.qrData.city}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code URL */}
            <div className="space-y-2">
              <h4 className="font-medium">Verification URL:</h4>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <code className="text-xs break-all">{qrCodeUrl}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Your QR Code</CardTitle>
          <CardDescription>Instructions for using your digital ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <Smartphone className="h-8 w-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-800">Mobile Verification</h4>
                <p className="text-sm text-blue-700">
                  Show your QR code to barangay officials for quick identity verification during transactions.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-800">Service Access</h4>
                <p className="text-sm text-green-700">
                  Use your QR code to access barangay services, document requests, and health programs.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-800">Event Check-in</h4>
                <p className="text-sm text-purple-700">
                  Scan your QR code at barangay events, meetings, and community programs for attendance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> Your QR code contains personal information. Only share it with authorized
          barangay officials and trusted service providers. If you suspect your QR code has been compromised, please
          contact the barangay office immediately.
        </AlertDescription>
      </Alert>

      {/* Additional Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Actions</CardTitle>
          <CardDescription>Manage your digital ID and verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/profile">
                <User className="h-6 w-6" />
                <span>Update Profile</span>
                <span className="text-xs text-muted-foreground">Modify your personal information</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/profile/edit">
                <Shield className="h-6 w-6" />
                <span>Complete Verification</span>
                <span className="text-xs text-muted-foreground">Improve your verification status</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
