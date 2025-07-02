"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Phone,
  Mail,
  Calendar,
  Home,
  Users,
  Edit,
  Camera,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  MapPin,
  Download,
  Eye,
  FileText,
  QrCode,
} from "lucide-react"
import Link from "next/link"
import { SimpleLocationMap } from "@/components/simple-location-map"

export default function ResidentProfilePage() {
  const [verificationStatus, setVerificationStatus] = useState("semi-verified") // non-verified, semi-verified, fully-verified

  // Mock user data
  const user = {
    id: "RES-2025-0089",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "09123456789",
    address: "123 Main St, Purok 2, Barangay Bucana",
    birthDate: "1985-01-15",
    civilStatus: "Married",
    occupation: "Teacher",
    householdId: "HH-2025-001",
    profilePhoto: null,
    location: {
      lat: 7.0731,
      lng: 125.6128,
      verified: true,
    },
    verificationSteps: {
      email: true,
      phone: true,
      photo: false,
      location: true,
      documents: true,
    },
    documents: [
      { type: "Valid ID", status: "verified", date: "2025-01-15" },
      { type: "Proof of Residence", status: "verified", date: "2025-01-15" },
      { type: "Birth Certificate", status: "pending", date: "2025-01-20" },
    ],
    recentActivity: [
      {
        action: "Location Verified",
        date: "January 20, 2025",
        description: "Barangay official verified your house location",
        type: "success",
      },
      {
        action: "Phone Number Verified",
        date: "January 16, 2025",
        description: "SMS verification completed",
        type: "success",
      },
      {
        action: "Email Verified",
        date: "January 15, 2025",
        description: "Email verification completed",
        type: "success",
      },
      {
        action: "Profile Created",
        date: "January 15, 2025",
        description: "Initial registration completed",
        type: "info",
      },
    ],
  }

  const getVerificationBadge = () => {
    switch (verificationStatus) {
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
      case "non-verified":
        return (
          <Badge variant="destructive">
            <Clock className="h-3 w-3 mr-1" />
            Not Verified
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getVerificationProgress = () => {
    const steps = Object.values(user.verificationSteps)
    const completed = steps.filter(Boolean).length
    return (completed / steps.length) * 100
  }

  const getVerificationMessage = () => {
    switch (verificationStatus) {
      case "fully-verified":
        return "Your profile is fully verified. You have access to all barangay services."
      case "semi-verified":
        return "Your profile is partially verified. Complete all steps to access full services."
      case "non-verified":
        return "Your profile needs verification. Please complete the verification steps below."
      default:
        return "Verification status unknown."
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and verification status</p>
        </div>
        <Button asChild>
          <Link href="/portal/profile/edit">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>

      {/* Verification Status Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Verification Status
            </CardTitle>
            {getVerificationBadge()}
          </div>
          <CardDescription>{getVerificationMessage()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Verification Progress</span>
                <span>{Math.round(getVerificationProgress())}% Complete</span>
              </div>
              <Progress value={getVerificationProgress()} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${user.verificationSteps.email ? "text-green-600" : "text-gray-400"}`}
                />
                <span className="text-sm">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${user.verificationSteps.phone ? "text-green-600" : "text-gray-400"}`}
                />
                <span className="text-sm">Phone</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${user.verificationSteps.photo ? "text-green-600" : "text-gray-400"}`}
                />
                <span className="text-sm">Photo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${user.verificationSteps.location ? "text-green-600" : "text-gray-400"}`}
                />
                <span className="text-sm">Location</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`h-4 w-4 ${user.verificationSteps.documents ? "text-green-600" : "text-gray-400"}`}
                />
                <span className="text-sm">Documents</span>
              </div>
            </div>

            {!user.verificationSteps.photo && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <Camera className="h-4 w-4" />
                <AlertDescription>
                  Please upload a profile photo to complete verification.{" "}
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/portal/profile/edit">Upload now</Link>
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24">
                    <AvatarImage src={user.profilePhoto || ""} />
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">Resident ID: {user.id}</p>
                    {!user.verificationSteps.photo && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/portal/profile/edit">
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-600 break-all">{user.email}</p>
                        {user.verificationSteps.email && (
                          <Badge variant="outline" className="text-xs mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                        {user.verificationSteps.phone && (
                          <Badge variant="outline" className="text-xs mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Birth Date</p>
                        <p className="text-sm text-gray-600">{user.birthDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Civil Status</p>
                        <p className="text-sm text-gray-600">{user.civilStatus}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Occupation</p>
                        <p className="text-sm text-gray-600">{user.occupation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-gray-600">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Household ID</p>
                    <p className="text-sm text-gray-600 font-mono">{user.householdId}</p>
                    <Button variant="link" className="p-0 h-auto text-xs" asChild>
                      <Link href="/portal/household">View household details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>House Location</CardTitle>
              <CardDescription>Your registered house location and verification status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Location Status</span>
                  </div>
                  {user.location.verified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="h-96 rounded-lg overflow-hidden border">
                  <SimpleLocationMap
                    userRole="resident"
                    userId={user.id}
                    userName={user.name}
                    initialLat={user.location.lat}
                    initialLng={user.location.lng}
                    editable={false}
                    height="100%"
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Coordinates:</strong> {user.location.lat}, {user.location.lng}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
              <CardDescription>Documents submitted for identity verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.type}</p>
                        <p className="text-sm text-gray-600">Submitted: {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={doc.status === "verified" ? "default" : "secondary"}
                        className={doc.status === "verified" ? "bg-green-100 text-green-800" : ""}
                      >
                        {doc.status === "verified" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/portal/profile/edit">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Additional Documents
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent verification and profile activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      activity.type === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <User className="h-5 w-5 text-blue-600 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common profile-related actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/profile/qr">
                <QrCode className="h-6 w-6" />
                <span className="text-sm">View QR Code</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/profile/edit">
                <Edit className="h-6 w-6" />
                <span className="text-sm">Edit Profile</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/household">
                <Users className="h-6 w-6" />
                <span className="text-sm">Household</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
              <Link href="/portal/documents">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Documents</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
