"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, User, Phone, MapPin, Heart, AlertCircle, CheckCircle2 } from "lucide-react"

export default function RegisterPatientPage() {
  const [registrationType, setRegistrationType] = useState("existing")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResident, setSelectedResident] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Mock resident data
  const residents = [
    {
      id: 1,
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      phone: "09123456789",
      address: "123 Main St, Sitio 1",
      email: "maria.santos@email.com",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      phone: "09234567890",
      address: "456 Oak Ave, Sitio 2",
      email: "juan.delacruz@email.com",
    },
  ]

  const [newPatientData, setNewPatientData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    age: "",
    gender: "",
    birthdate: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    medications: "",
    bloodType: "",
    hasInsurance: false,
    insuranceProvider: "",
    insuranceNumber: "",
  })

  const filteredResidents = residents.filter(
    (resident) => resident.name.toLowerCase().includes(searchTerm.toLowerCase()) || resident.phone.includes(searchTerm),
  )

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewPatientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
    }, 2000)
  }

  const handleResidentSelect = (resident: any) => {
    setSelectedResident(resident)
    // Pre-fill form with resident data
    setNewPatientData({
      ...newPatientData,
      firstName: resident.name.split(" ")[0],
      lastName: resident.name.split(" ").slice(-1)[0],
      age: resident.age.toString(),
      gender: resident.gender,
      phone: resident.phone,
      email: resident.email,
      address: resident.address,
    })
  }

  if (success) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Patient Registered Successfully!</h2>
            <p className="text-gray-600 mb-6">
              The patient has been added to the health portal system and can now book appointments.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSuccess(false)}>Register Another Patient</Button>
              <Button variant="outline">View Patient Record</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Register New Patient</h1>
        <p className="text-gray-600 dark:text-gray-400">Add a new patient to the health portal system</p>
      </div>

      <Tabs value={registrationType} onValueChange={setRegistrationType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="existing">From Existing Resident</TabsTrigger>
          <TabsTrigger value="new">New Patient Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="existing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Existing Residents</CardTitle>
              <CardDescription>Find and register an existing barangay resident as a patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {searchTerm && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredResidents.map((resident) => (
                    <div
                      key={resident.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedResident?.id === resident.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => handleResidentSelect(resident)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium">{resident.name}</p>
                            <p className="text-sm text-gray-600">
                              {resident.age} years, {resident.gender}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {resident.phone}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {resident.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredResidents.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No residents found</p>
                  )}
                </div>
              )}

              {selectedResident && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Selected: {selectedResident.name}. Complete the medical information below to register as patient.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This will create a new patient record for someone who is not a registered resident of the barangay.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Common Patient Information Form */}
        {(selectedResident || registrationType === "new") && (
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                {registrationType === "existing"
                  ? "Complete the medical information for the selected resident"
                  : "Enter complete patient information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {registrationType === "new" && (
                  <>
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={newPatientData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="middleName">Middle Name</Label>
                          <Input
                            id="middleName"
                            value={newPatientData.middleName}
                            onChange={(e) => handleInputChange("middleName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={newPatientData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="birthdate">Birthdate *</Label>
                          <Input
                            id="birthdate"
                            type="date"
                            value={newPatientData.birthdate}
                            onChange={(e) => handleInputChange("birthdate", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age *</Label>
                          <Input
                            id="age"
                            type="number"
                            value={newPatientData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender *</Label>
                          <RadioGroup
                            value={newPatientData.gender}
                            onValueChange={(value) => handleInputChange("gender", value)}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={newPatientData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newPatientData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          value={newPatientData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Medical Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={newPatientData.bloodType}
                        onValueChange={(value) => handleInputChange("bloodType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={newPatientData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={newPatientData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={newPatientData.medicalHistory}
                      onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      placeholder="Previous illnesses, surgeries, chronic conditions..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={newPatientData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      placeholder="Food allergies, drug allergies, environmental allergies..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={newPatientData.medications}
                      onChange={(e) => handleInputChange("medications", e.target.value)}
                      placeholder="List current medications and dosages..."
                    />
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Insurance Information</h3>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasInsurance"
                      checked={newPatientData.hasInsurance}
                      onCheckedChange={(checked) => handleInputChange("hasInsurance", checked as boolean)}
                    />
                    <Label htmlFor="hasInsurance">Patient has health insurance</Label>
                  </div>

                  {newPatientData.hasInsurance && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Input
                          id="insuranceProvider"
                          value={newPatientData.insuranceProvider}
                          onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceNumber">Insurance Number</Label>
                        <Input
                          id="insuranceNumber"
                          value={newPatientData.insuranceNumber}
                          onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Patient"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </Tabs>
    </div>
  )
}
