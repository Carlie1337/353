"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    gender: "",
    birthdate: "",
    birthplace: "",
    civilStatus: "",
    nationality: "Filipino",
    occupation: "",

    // Contact Information
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    telephoneNumber: "",

    // Address Information
    houseNumber: "",
    street: "",
    barangay: "Bucana",
    city: "Davao City",
    province: "Davao del Sur",
    zipCode: "8000",

    // Additional Information
    educationalAttainment: "",
    monthlyIncome: "",
    isVoter: false,
    isPWD: false,
    isSeniorCitizen: false,
    is4Ps: false,
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelationship: "",

    // Terms and Conditions
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateStep = (step: number) => {
    setError(null)

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.birthdate) {
        setError("Please fill in all required fields in Personal Information")
        return false
      }
    } else if (step === 2) {
      if (!formData.email || !formData.password || !formData.mobileNumber) {
        setError("Please fill in all required fields in Contact Information")
        return false
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return false
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long")
        return false
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address")
        return false
      }

      // Mobile number validation (Philippine format)
      const mobileRegex = /^(09|\+639)\d{9}$/
      if (!mobileRegex.test(formData.mobileNumber.replace(/\s/g, ""))) {
        setError("Please enter a valid Philippine mobile number (09XXXXXXXXX)")
        return false
      }
    } else if (step === 3) {
      if (!formData.street || !formData.barangay || !formData.city || !formData.province) {
        setError("Please fill in all required fields in Address Information")
        return false
      }
    } else if (step === 4) {
      // Additional information is optional
      return true
    } else if (step === 5) {
      if (!formData.agreeToTerms) {
        setError("You must agree to the terms and conditions")
        return false
      }
    }

    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(5)) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Mock registration process (since we're in sandbox environment)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a mock user ID
      const mockUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Mock successful registration
      const registrationData = {
        userId: mockUserId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        registrationDate: new Date().toISOString(),
        status: "pending_verification",
      }

      // Store in localStorage for demo purposes
      localStorage.setItem("pendingRegistration", JSON.stringify(registrationData))

      setSuccess("Registration successful! Please check your email for verification instructions.")

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push("/register/success")
      }, 3000)
    } catch (err: any) {
      setError("Registration failed. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder="Enter your middle name (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleInputChange}
                  placeholder="Jr., Sr., III, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate *</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthplace">Birthplace</Label>
                <Input
                  id="birthplace"
                  name="birthplace"
                  value={formData.birthplace}
                  onChange={handleInputChange}
                  placeholder="City, Province"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="civilStatus">Civil Status</Label>
                <Select
                  value={formData.civilStatus}
                  onValueChange={(value) => handleSelectChange("civilStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select civil status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Filipino"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                placeholder="Your current occupation"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-muted-foreground">We'll send verification instructions to this email</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Re-enter your password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="09XXXXXXXXX"
                />
                <p className="text-xs text-muted-foreground">Philippine mobile number format</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephoneNumber">Telephone Number</Label>
                <Input
                  id="telephoneNumber"
                  name="telephoneNumber"
                  value={formData.telephoneNumber}
                  onChange={handleInputChange}
                  placeholder="(082) XXX-XXXX"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="houseNumber">House/Unit Number</Label>
              <Input
                id="houseNumber"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleInputChange}
                placeholder="House/Unit/Block/Lot Number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street/Subdivision *</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
                placeholder="Street name or subdivision"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barangay">Barangay *</Label>
              <Input
                id="barangay"
                name="barangay"
                value={formData.barangay}
                onChange={handleInputChange}
                required
                readOnly
                className="bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">
                Registration is currently limited to Barangay Bucana residents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City/Municipality *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
                <Input
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="educationalAttainment">Educational Attainment</Label>
              <Select
                value={formData.educationalAttainment}
                onValueChange={(value) => handleSelectChange("educationalAttainment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select educational attainment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="highSchool">High School</SelectItem>
                  <SelectItem value="vocational">Vocational</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="postGraduate">Post Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Select
                value={formData.monthlyIncome}
                onValueChange={(value) => handleSelectChange("monthlyIncome", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select monthly income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below10k">Below ₱10,000</SelectItem>
                  <SelectItem value="10kTo20k">₱10,000 - ₱20,000</SelectItem>
                  <SelectItem value="20kTo30k">₱20,000 - ₱30,000</SelectItem>
                  <SelectItem value="30kTo50k">₱30,000 - ₱50,000</SelectItem>
                  <SelectItem value="above50k">Above ₱50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVoter"
                    checked={formData.isVoter}
                    onCheckedChange={(checked) => handleCheckboxChange("isVoter", checked as boolean)}
                  />
                  <Label htmlFor="isVoter">Registered Voter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPWD"
                    checked={formData.isPWD}
                    onCheckedChange={(checked) => handleCheckboxChange("isPWD", checked as boolean)}
                  />
                  <Label htmlFor="isPWD">Person with Disability (PWD)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isSeniorCitizen"
                    checked={formData.isSeniorCitizen}
                    onCheckedChange={(checked) => handleCheckboxChange("isSeniorCitizen", checked as boolean)}
                  />
                  <Label htmlFor="isSeniorCitizen">Senior Citizen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is4Ps"
                    checked={formData.is4Ps}
                    onCheckedChange={(checked) => handleCheckboxChange("is4Ps", checked as boolean)}
                  />
                  <Label htmlFor="is4Ps">4Ps Beneficiary</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Emergency Contact Information</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    placeholder="Full name of emergency contact"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                  <Input
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    placeholder="Parent, Spouse, Sibling, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactNumber">Contact Number</Label>
                <Input
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  placeholder="09XXXXXXXXX"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="border p-4 rounded-md bg-gray-50 max-h-60 overflow-y-auto">
              <h3 className="font-semibold mb-2">Terms and Conditions</h3>
              <p className="text-sm text-gray-700 mb-3">
                By registering as a resident in the Barangay Bucana Management System, you agree to the following terms
                and conditions:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>All information provided is true and correct to the best of your knowledge.</li>
                <li>
                  You consent to the collection, storage, and processing of your personal information for the purpose of
                  barangay services and management in accordance with the Data Privacy Act of 2012.
                </li>
                <li>
                  You understand that providing false information may result in the rejection of your application or
                  termination of your registration.
                </li>
                <li>
                  You agree to update your information promptly if there are any changes to ensure accuracy of records.
                </li>
                <li>
                  You consent to receive notifications and communications from the barangay through the contact details
                  you provided.
                </li>
                <li>
                  You understand that your account will be subject to verification by barangay officials before
                  activation.
                </li>
                <li>
                  You agree to use the system responsibly and in accordance with barangay policies and procedures.
                </li>
                <li>You understand that misuse of the system may result in account suspension or termination.</li>
              </ul>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                required
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I have read, understood, and agree to the terms and conditions stated above. I confirm that all
                information provided is accurate and complete. *
              </Label>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                Your registration will be reviewed by barangay officials. You will receive an email notification once
                your account has been verified and activated.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  const renderProgressBar = () => {
    const steps = [
      "Personal Information",
      "Contact Information",
      "Address",
      "Additional Information",
      "Terms & Conditions",
    ]

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-xs">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`font-medium transition-colors ${
                currentStep === index + 1
                  ? "text-primary"
                  : currentStep > index + 1
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              <span className="hidden md:inline">
                {index + 1}. {step}
              </span>
              <span className="md:hidden">{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resident Registration</CardTitle>
          <CardDescription>
            Register as a resident of Barangay Bucana to access online services and stay connected with your community.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {renderProgressBar()}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>{renderStepContent()}</form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isSubmitting} type="button">
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={handleNext} disabled={isSubmitting} type="button">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting || !formData.agreeToTerms} type="submit">
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
