"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  QrCode,
  Camera,
  CheckCircle,
  User,
  MapPin,
  Scan,
  RefreshCw,
  X,
  Search,
  History,
  UserCheck,
  Shield,
  Phone,
  Calendar,
  AlertTriangle,
  Eye,
  Clock,
  BadgeIcon as IdCard,
  Fingerprint,
  CreditCard,
} from "lucide-react"

interface VerificationMethod {
  id: string
  name: string
  description: string
  icon: any
  available: boolean
  accuracy: string
}

export default function QRScannerPage() {
  const [verificationStep, setVerificationStep] = useState<"select" | "verify" | "complete">("select")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [manualId, setManualId] = useState("")
  const [verificationPurpose, setVerificationPurpose] = useState("")
  const [notes, setNotes] = useState("")
  const [scanHistory, setScanHistory] = useState([
    {
      id: "VER-2024-089",
      residentName: "Juan Dela Cruz",
      residentId: "RES-2025-0089",
      purpose: "Document Pickup",
      time: "15 minutes ago",
      status: "Verified",
      location: "Barangay Hall",
      tanod: "Tanod Garcia",
      method: "QR Code",
    },
    {
      id: "VER-2024-088",
      residentName: "Maria Santos",
      residentId: "RES-2025-0067",
      purpose: "Health Center Visit",
      time: "45 minutes ago",
      status: "Verified",
      location: "Health Center",
      tanod: "Tanod Garcia",
      method: "Manual ID",
    },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)

  const verificationMethods: VerificationMethod[] = [
    {
      id: "qr-code",
      name: "QR Code Scanner",
      description: "Scan resident's QR code for instant verification",
      icon: QrCode,
      available: true,
      accuracy: "99.9%",
    },
    {
      id: "manual-id",
      name: "Manual ID Entry",
      description: "Enter resident ID manually for verification",
      icon: IdCard,
      available: true,
      accuracy: "95%",
    },
    {
      id: "biometric",
      name: "Biometric Scan",
      description: "Fingerprint or facial recognition verification",
      icon: Fingerprint,
      available: false,
      accuracy: "99.8%",
    },
    {
      id: "nfc-card",
      name: "NFC Card Reader",
      description: "Tap resident's NFC-enabled ID card",
      icon: CreditCard,
      available: false,
      accuracy: "98%",
    },
  ]

  const purposes = [
    "Document Pickup",
    "Health Center Visit",
    "Community Event",
    "Business Transaction",
    "Emergency Response",
    "Official Meeting",
    "Service Request",
    "Complaint Filing",
    "Certificate Request",
    "Other",
  ]

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    setVerificationStep("verify")
  }

  const startScanning = async () => {
    try {
      setIsScanning(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setIsScanning(false)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const simulateQRScan = () => {
    const mockResult = {
      residentId: "RES-2025-0123",
      name: "Pedro Garcia",
      address: "Purok 3, Barangay Bucana",
      age: 35,
      civilStatus: "Married",
      occupation: "Teacher",
      contactNumber: "09123456789",
      emergencyContact: "Ana Garcia - 09987654321",
      validUntil: "2025-12-31",
      qrCode: "QR123456789",
      photo: "/placeholder.svg?height=150&width=150",
      verified: true,
    }
    setScanResult(mockResult)
    stopScanning()
  }

  const handleManualLookup = () => {
    if (manualId) {
      const mockResult = {
        residentId: manualId,
        name: "Manual Entry Resident",
        address: "Address verification required",
        age: "N/A",
        civilStatus: "N/A",
        occupation: "N/A",
        contactNumber: "N/A",
        emergencyContact: "N/A",
        validUntil: "N/A",
        qrCode: manualId,
        photo: "/placeholder.svg?height=150&width=150",
        verified: false,
      }
      setScanResult(mockResult)
    }
  }

  const verifyResident = () => {
    if (!scanResult || !verificationPurpose) return

    const newVerification = {
      id: `VER-2024-${String(Date.now()).slice(-3)}`,
      residentName: scanResult.name,
      residentId: scanResult.residentId,
      purpose: verificationPurpose,
      time: "Just now",
      status: "Verified",
      location: "Current Location",
      tanod: "Tanod Garcia",
      method: selectedMethod === "qr-code" ? "QR Code" : "Manual ID",
    }

    setScanHistory([newVerification, ...scanHistory])
    setVerificationStep("complete")

    // Reset after 3 seconds
    setTimeout(() => {
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setScanResult(null)
    setManualId("")
    setVerificationPurpose("")
    setNotes("")
    setSelectedMethod(null)
    setVerificationStep("select")
  }

  const formatTime = (timeStr: string) => {
    if (timeStr === "Just now") return timeStr
    return timeStr
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Identity Verification System</h1>
          <p className="text-gray-600 mt-1">Secure resident identity verification and access control</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            System Secure
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setVerificationStep("select")}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Verification
          </Button>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              verificationStep === "select" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full bg-blue-600 transition-all duration-300 ${
                verificationStep !== "select" ? "w-full" : "w-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              verificationStep === "verify" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full bg-blue-600 transition-all duration-300 ${
                verificationStep === "complete" ? "w-full" : "w-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              verificationStep === "complete" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-16 text-sm">
          <span className={verificationStep === "select" ? "text-blue-600 font-medium" : "text-gray-500"}>
            Select Method
          </span>
          <span className={verificationStep === "verify" ? "text-blue-600 font-medium" : "text-gray-500"}>
            Verify Identity
          </span>
          <span className={verificationStep === "complete" ? "text-green-600 font-medium" : "text-gray-500"}>
            Complete
          </span>
        </div>
      </div>

      {/* Step 1: Method Selection */}
      {verificationStep === "select" && (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Choose Verification Method
              </CardTitle>
              <CardDescription>Select the most appropriate method to verify resident identity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verificationMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        method.available
                          ? "hover:border-blue-300 hover:shadow-md"
                          : "opacity-50 cursor-not-allowed border-gray-200"
                      }`}
                      onClick={() => method.available && handleMethodSelect(method.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            method.available ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{method.name}</h3>
                            {!method.available && (
                              <Badge variant="secondary" className="text-xs">
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Accuracy: {method.accuracy}</span>
                            {method.available && (
                              <Button size="sm" variant="outline">
                                Select Method
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Verification Process */}
      {verificationStep === "verify" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* QR Code Scanner */}
          {selectedMethod === "qr-code" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-blue-600" />
                  QR Code Scanner
                </CardTitle>
                <CardDescription>Position the QR code within the camera frame</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isScanning ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Ready to scan QR codes</p>
                    <Button onClick={startScanning} className="bg-blue-600 hover:bg-blue-700">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg"></div>
                      </div>
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        Position QR code in the center
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={simulateQRScan} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Scan className="h-4 w-4 mr-2" />
                        Simulate Scan
                      </Button>
                      <Button onClick={stopScanning} variant="outline" className="flex-1 bg-transparent">
                        <X className="h-4 w-4 mr-2" />
                        Stop Camera
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Manual ID Entry */}
          {selectedMethod === "manual-id" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IdCard className="h-5 w-5 text-green-600" />
                  Manual ID Entry
                </CardTitle>
                <CardDescription>Enter resident ID manually for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Manual entry requires additional verification steps. Ensure you have proper authorization.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label htmlFor="manual-id">Resident ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="manual-id"
                      placeholder="Enter resident ID (e.g., RES-2025-0123)"
                      value={manualId}
                      onChange={(e) => setManualId(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={handleManualLookup} disabled={!manualId}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleManualLookup} disabled={!manualId} className="w-full">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Lookup Resident
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Verification Result */}
          {scanResult && (
            <Card
              className={`border-2 ${scanResult.verified ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={`flex items-center gap-2 ${scanResult.verified ? "text-green-800" : "text-yellow-800"}`}
                  >
                    {scanResult.verified ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                    {scanResult.verified ? "Identity Verified" : "Verification Required"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={scanResult.photo || "/placeholder.svg"}
                    alt="Resident Photo"
                    className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex-1 space-y-2">
                    <h3
                      className={`text-lg font-semibold ${scanResult.verified ? "text-green-900" : "text-yellow-900"}`}
                    >
                      {scanResult.name}
                    </h3>
                    <p className={`text-sm ${scanResult.verified ? "text-green-700" : "text-yellow-700"}`}>
                      ID: {scanResult.residentId}
                    </p>
                    <div
                      className={`grid grid-cols-2 gap-2 text-sm ${scanResult.verified ? "text-green-700" : "text-yellow-700"}`}
                    >
                      <div>
                        <span className="font-medium">Age:</span> {scanResult.age}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> {scanResult.civilStatus}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`space-y-3 text-sm ${scanResult.verified ? "text-green-700" : "text-yellow-700"}`}>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{scanResult.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>{scanResult.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{scanResult.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Valid until: {scanResult.validUntil}</span>
                  </div>
                </div>

                {/* Verification Form */}
                <div className="border-t pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Visit *</Label>
                    <Select value={verificationPurpose} onValueChange={setVerificationPurpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose of visit" />
                      </SelectTrigger>
                      <SelectContent>
                        {purposes.map((purpose) => (
                          <SelectItem key={purpose} value={purpose}>
                            {purpose}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes or observations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={verifyResident}
                      disabled={!verificationPurpose}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Verification
                    </Button>
                    <Button variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 3: Completion */}
      {verificationStep === "complete" && (
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Verification Complete!</h2>
              <p className="text-green-700 mb-4">Resident identity has been successfully verified and logged.</p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Verification ID:</strong> VER-2024-{String(Date.now()).slice(-3)}
                  </p>
                  <p>
                    <strong>Method:</strong> {selectedMethod === "qr-code" ? "QR Code Scanner" : "Manual ID Entry"}
                  </p>
                  <p>
                    <strong>Time:</strong> {new Date().toLocaleString()}
                  </p>
                  <p>
                    <strong>Officer:</strong> Tanod Garcia
                  </p>
                </div>
              </div>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                New Verification
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Verifications */}
      {verificationStep === "select" && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-purple-600" />
              Recent Verifications
            </CardTitle>
            <CardDescription>Latest identity verifications performed today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scanHistory.slice(0, 5).map((verification) => (
                <div
                  key={verification.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{verification.residentName}</p>
                      <p className="text-sm text-gray-600">{verification.purpose}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(verification.time)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {verification.method}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {verification.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">
                <History className="h-4 w-4 mr-2" />
                View All Verifications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
