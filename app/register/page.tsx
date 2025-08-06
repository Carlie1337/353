"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Home, Phone, Mail, Calendar, MapPin, FileText, CheckCircle, ArrowRight, ArrowLeft, AlertCircle, Shield, Eye, EyeOff } from 'lucide-react'
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  dob: string
  gender: string
  maritalStatus: string
  
  // Contact Information
  contactNumber: string
  email: string
  
  // Address Information
  houseNumber: string
  street: string
  purok: string
  barangay: string
  city: string
  province: string
  zipCode: string
  
  // Additional Information
  govId: string
  occupation: string
  
  // Account Information
  password: string
  confirmPassword: string
}

const initialFormData: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  contactNumber: "",
  email: "",
  houseNumber: "",
  street: "",
  purok: "",
  barangay: "76-A Bucana",
  city: "Davao City",
  province: "Davao del Sur",
  zipCode: "8000",
  govId: "",
  occupation: "",
  password: "",
  confirmPassword: "",
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const stepTitles = [
    "Personal Information",
    "Contact Details", 
    "Address Information",
    "Additional Details",
    "Account Setup"
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.dob) newErrors.dob = "Date of birth is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        break

      case 2: // Contact Details
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
        break

      case 3: // Address Information
        if (!formData.houseNumber.trim()) newErrors.houseNumber = "House number is required"
        if (!formData.street.trim()) newErrors.street = "Street is required"
        if (!formData.purok.trim()) newErrors.purok = "Purok is required"
        break

      case 4: // Additional Details (optional fields, no validation needed)
        break

      case 5: // Account Setup
        if (!formData.password) newErrors.password = "Password is required"
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setLoading(true)
    try {
      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: undefined, // Bypass email verification for testing
        }
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (!authData.user) {
        throw new Error("Failed to create user account")
      }

      // 2. Create household record
      const { data: householdData, error: householdError } = await supabase
        .from("households")
        .insert({
          house_number: formData.houseNumber,
          street: formData.street,
          purok: formData.purok,
          barangay: formData.barangay,
          city: formData.city,
          province: formData.province,
          zip_code: formData.zipCode,
        })
        .select()
        .single()

      if (householdError) {
        throw new Error("Failed to create household record: " + householdError.message)
      }

      // 3. Create resident record
      const { error: residentError } = await supabase
        .from("residents")
        .insert({
          user_id: authData.user.id,
          household_id: householdData.id,
          first_name: formData.firstName,
          middle_name: formData.middleName || null,
          last_name: formData.lastName,
          suffix: formData.suffix || null,
          dob: formData.dob,
          gender: formData.gender,
          marital_status: formData.maritalStatus || null,
          contact_number: formData.contactNumber,
          email: formData.email,
          gov_id: formData.govId || null,
          occupation: formData.occupation || null,
        })

      if (residentError) {
        throw new Error("Failed to create resident record: " + residentError.message)
      }

      // 4. Assign resident role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: authData.user.id,
          role: "resident",
        })

      if (roleError) {
        throw new Error("Failed to assign user role: " + roleError.message)
      }

      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully. You can now log in.",
      })

      // Redirect to success page
      router.push("/register/success")

    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <Label htmlFor="suffix">Suffix</Label>
                <Select value={formData.suffix} onValueChange={(value) => handleInputChange("suffix", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select suffix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="Jr.">Jr.</SelectItem>
                    <SelectItem value="Sr.">Sr.</SelectItem>
                    <SelectItem value="II">II</SelectItem>
                    <SelectItem value="III">III</SelectItem>
                    <SelectItem value="IV">IV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className={errors.dob ? "border-red-500" : ""}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                placeholder="e.g., +63 912 345 6789"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              <p className="text-sm text-gray-500 mt-1">
                This will be used as your login username
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="houseNumber">House Number *</Label>
                <Input
                  id="houseNumber"
                  placeholder="e.g., 123, Blk 5 Lot 10"
                  value={formData.houseNumber}
                  onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                  className={errors.houseNumber ? "border-red-500" : ""}
                />
                {errors.houseNumber && <p className="text-red-500 text-sm mt-1">{errors.houseNumber}</p>}
              </div>
              <div>
                <Label htmlFor="street">Street *</Label>
                <Input
                  id="street"
                  placeholder="e.g., Mabini Street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className={errors.street ? "border-red-500" : ""}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="purok">Purok *</Label>
              <Input
                id="purok"
                placeholder="e.g., Purok 1, Purok Mabini"
                value={formData.purok}
                onChange={(e) => handleInputChange("purok", e.target.value)}
                className={errors.purok ? "border-red-500" : ""}
              />
              {errors.purok && <p className="text-red-500 text-sm mt-1">{errors.purok}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="barangay">Barangay</Label>
                <Input
                  id="barangay"
                  value={formData.barangay}
                  onChange={(e) => handleInputChange("barangay", e.target.value)}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="govId">Government ID Number</Label>
              <Input
                id="govId"
                placeholder="e.g., National ID, SSS, PhilHealth, etc."
                value={formData.govId}
                onChange={(e) => handleInputChange("govId", e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Any valid government-issued ID number
              </p>
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="e.g., Teacher, Engineer, Student, etc."
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your account will be created with resident privileges. You'll be able to access all resident services 
                including document requests, health appointments, and community announcements.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="Barangay Logo"
              className="h-12 w-12 rounded-full border-2 border-blue-600 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resident Registration</h1>
              <p className="text-sm text-gray-600">Barangay 76-A Bucana Management System</p>
            </div>
          </div>
          <p className="text-gray-600">
            Create your account to access barangay services and stay connected with your community.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <User className="h-5 w-5 mr-2 text-blue-600" />}
              {currentStep === 2 && <Phone className="h-5 w-5 mr-2 text-blue-600" />}
              {currentStep === 3 && <MapPin className="h-5 w-5 mr-2 text-blue-600" />}
              {currentStep === 4 && <FileText className="h-5 w-5 mr-2 text-blue-600" />}
              {currentStep === 5 && <Shield className="h-5 w-5 mr-2 text-blue-600" />}
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your basic personal information"}
              {currentStep === 2 && "How can we reach you?"}
              {currentStep === 3 && "Where do you live in our barangay?"}
              {currentStep === 4 && "Additional information (optional)"}
              {currentStep === 5 && "Create your account credentials"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="flex items-center">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
