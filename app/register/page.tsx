"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { User, Home, Users, FileText, Shield, ChevronLeft, ChevronRight, CheckCircle, Eye, EyeOff, Calendar, Phone, Mail, MapPin, Heart, Briefcase, GraduationCap } from 'lucide-react'

interface FormData {
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  nickname: string
  dob: string
  gender: string
  maritalStatus: string
  contactNumber: string
  email: string
  
  // Address Information
  houseNumber: string
  street: string
  purok: string
  
  // Additional Information
  occupation: string
  monthlyIncome: string
  educationalAttainment: string
  religion: string
  bloodType: string
  
  // Government IDs
  govId: string
  
  // Classifications
  isVoter: boolean
  isPwd: boolean
  isSeniorCitizen: boolean
  is4ps: boolean
  isSoloParent: boolean
  isOfw: boolean
  
  // Emergency Contact
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  
  // Account Setup
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

const initialFormData: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  nickname: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  contactNumber: "",
  email: "",
  houseNumber: "",
  street: "",
  purok: "",
  occupation: "",
  monthlyIncome: "",
  educationalAttainment: "",
  religion: "",
  bloodType: "",
  govId: "",
  isVoter: false,
  isPwd: false,
  isSeniorCitizen: false,
  is4ps: false,
  isSoloParent: false,
  isOfw: false,
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
}

const steps = [
  { id: 1, title: "Personal Information", icon: User, description: "Basic personal details" },
  { id: 2, title: "Address Information", icon: Home, description: "Residence details" },
  { id: 3, title: "Additional Information", icon: FileText, description: "Work and education" },
  { id: 4, title: "Emergency Contact", icon: Users, description: "Emergency contact person" },
  { id: 5, title: "Account Setup", icon: Shield, description: "Create your account credentials" },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.dob && formData.gender && formData.email)
      case 2:
        return !!(formData.houseNumber && formData.street && formData.purok)
      case 3:
        return true // Optional fields
      case 4:
        return !!(formData.emergencyContactName && formData.emergencyContactPhone)
      case 5:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.agreeToTerms)
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    } else {
      toast({
        title: "Please complete required fields",
        description: "Fill in all required information before proceeding.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Please complete all required fields",
        description: "Make sure all information is filled out correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: `${formData.firstName} ${formData.lastName}`,
            role: 'resident'
          }
        }
      })

      if (authError) {
        throw new Error(`Authentication error: ${authError.message}`)
      }

      if (!authData.user) {
        throw new Error("Failed to create user account")
      }

      // 2. Create user profile
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          role: 'resident',
          phone: formData.contactNumber,
          is_active: true
        }])

      if (userError) {
        console.error("User creation error:", userError)
        // Continue anyway, as auth user was created
      }

      // 3. Create household record
      const householdData = {
        house_number: formData.houseNumber,
        street: formData.street,
        purok: formData.purok,
        barangay: '76-A Bucana',
        city: 'Davao City',
        province: 'Davao del Sur',
        zip_code: '8000',
        total_members: 1,
        monthly_income: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : null,
        is_active: true
      }

      const { data: householdResult, error: householdError } = await supabase
        .from('households')
        .insert([householdData])
        .select()
        .single()

      if (householdError) {
        console.error("Household creation error:", householdError)
        throw new Error(`Failed to create household record: ${householdError.message}`)
      }

      // 4. Create resident record
      const age = calculateAge(formData.dob)
      const residentData = {
        user_id: authData.user.id,
        household_id: householdResult.id,
        first_name: formData.firstName,
        middle_name: formData.middleName || null,
        last_name: formData.lastName,
        suffix: formData.suffix || null,
        nickname: formData.nickname || null,
        dob: formData.dob,
        age: age,
        gender: formData.gender,
        marital_status: formData.maritalStatus || null,
        contact_number: formData.contactNumber || null,
        email: formData.email,
        gov_id: formData.govId || null,
        occupation: formData.occupation || null,
        monthly_income: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : null,
        educational_attainment: formData.educationalAttainment || null,
        religion: formData.religion || null,
        blood_type: formData.bloodType || null,
        is_voter: formData.isVoter,
        is_pwd: formData.isPwd,
        is_senior_citizen: formData.isSeniorCitizen,
        is_4ps: formData.is4ps,
        is_solo_parent: formData.isSoloParent,
        is_ofw: formData.isOfw,
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhone,
        emergency_contact_relationship: formData.emergencyContactRelationship,
        is_household_head: true,
        relationship_to_head: 'Self',
        is_active: true
      }

      const { data: residentResult, error: residentError } = await supabase
        .from('residents')
        .insert([residentData])
        .select()
        .single()

      if (residentError) {
        console.error("Resident creation error:", residentError)
        throw new Error(`Failed to create resident record: ${residentError.message}`)
      }

      // 5. Update household with head reference
      const { error: updateHouseholdError } = await supabase
        .from('households')
        .update({ household_head_id: residentResult.id })
        .eq('id', householdResult.id)

      if (updateHouseholdError) {
        console.error("Household update error:", updateHouseholdError)
        // Continue anyway, main records are created
      }

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please check your email for verification.",
      })

      // Redirect to success page
      router.push('/register/success')

    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => updateFormData('middleName', e.target.value)}
                  placeholder="Enter your middle name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Select value={formData.suffix} onValueChange={(value) => updateFormData('suffix', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select suffix" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => updateFormData('nickname', e.target.value)}
                  placeholder="Enter your nickname"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateFormData('dob', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => updateFormData('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => updateFormData('contactNumber', e.target.value)}
                  placeholder="+63 912 345 6789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="houseNumber">House Number *</Label>
                <Input
                  id="houseNumber"
                  value={formData.houseNumber}
                  onChange={(e) => updateFormData('houseNumber', e.target.value)}
                  placeholder="e.g., 123, Block 1 Lot 2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => updateFormData('street', e.target.value)}
                  placeholder="e.g., Mabini Street"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purok">Purok *</Label>
              <Select value={formData.purok} onValueChange={(value) => updateFormData('purok', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your purok" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Purok 1">Purok 1</SelectItem>
                  <SelectItem value="Purok 2">Purok 2</SelectItem>
                  <SelectItem value="Purok 3">Purok 3</SelectItem>
                  <SelectItem value="Purok 4">Purok 4</SelectItem>
                  <SelectItem value="Purok 5">Purok 5</SelectItem>
                  <SelectItem value="Purok 6">Purok 6</SelectItem>
                  <SelectItem value="Purok 7">Purok 7</SelectItem>
                  <SelectItem value="Purok 8">Purok 8</SelectItem>
                  <SelectItem value="Purok 9">Purok 9</SelectItem>
                  <SelectItem value="Purok 10">Purok 10</SelectItem>
                  <SelectItem value="Purok 11">Purok 11</SelectItem>
                  <SelectItem value="Purok 12">Purok 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Address Preview</h4>
              <p className="text-blue-700">
                {formData.houseNumber && formData.street && formData.purok
                  ? `${formData.houseNumber} ${formData.street}, ${formData.purok}, 76-A Bucana, Davao City, Davao del Sur 8000`
                  : "Complete the form to see your full address"}
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => updateFormData('occupation', e.target.value)}
                  placeholder="e.g., Teacher, Engineer, Student"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (PHP)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="educationalAttainment">Educational Attainment</Label>
                <Select value={formData.educationalAttainment} onValueChange={(value) => updateFormData('educationalAttainment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elementary">Elementary</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Senior High School">Senior High School</SelectItem>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="Vocational">Vocational</SelectItem>
                    <SelectItem value="Graduate Studies">Graduate Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) => updateFormData('religion', e.target.value)}
                  placeholder="e.g., Roman Catholic, Protestant"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData('bloodType', value)}>
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
                <Label htmlFor="govId">Government ID</Label>
                <Input
                  id="govId"
                  value={formData.govId}
                  onChange={(e) => updateFormData('govId', e.target.value)}
                  placeholder="e.g., SSS, GSIS, PhilHealth ID"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Classifications (Check all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVoter"
                    checked={formData.isVoter}
                    onCheckedChange={(checked) => updateFormData('isVoter', checked as boolean)}
                  />
                  <Label htmlFor="isVoter">Registered Voter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPwd"
                    checked={formData.isPwd}
                    onCheckedChange={(checked) => updateFormData('isPwd', checked as boolean)}
                  />
                  <Label htmlFor="isPwd">PWD</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isSeniorCitizen"
                    checked={formData.isSeniorCitizen}
                    onCheckedChange={(checked) => updateFormData('isSeniorCitizen', checked as boolean)}
                  />
                  <Label htmlFor="isSeniorCitizen">Senior Citizen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is4ps"
                    checked={formData.is4ps}
                    onCheckedChange={(checked) => updateFormData('is4ps', checked as boolean)}
                  />
                  <Label htmlFor="is4ps">4Ps Beneficiary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isSoloParent"
                    checked={formData.isSoloParent}
                    onCheckedChange={(checked) => updateFormData('isSoloParent', checked as boolean)}
                  />
                  <Label htmlFor="isSoloParent">Solo Parent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOfw"
                    checked={formData.isOfw}
                    onCheckedChange={(checked) => updateFormData('isOfw', checked as boolean)}
                  />
                  <Label htmlFor="isOfw">OFW</Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                placeholder="Full name of emergency contact"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                  placeholder="+63 912 345 6789"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                <Select value={formData.emergencyContactRelationship} onValueChange={(value) => updateFormData('emergencyContactRelationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Relative">Relative</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Neighbor">Neighbor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                This emergency contact will be notified in case of emergencies or if we cannot reach you directly. 
                Please ensure the information is accurate and up-to-date.
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  placeholder="Create a strong password"
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
              <p className="text-sm text-gray-600">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
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
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData('agreeToTerms', checked as boolean)}
                />
                <div className="text-sm">
                  <Label htmlFor="agreeToTerms" className="cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      privacy policy
                    </a>
                    . I understand that my information will be used for barangay services and management purposes in accordance with the Data Privacy Act of 2012. *
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Your account will be created with resident privileges.</p>
                    <p>
                      You'll be able to access all resident services including document requests, 
                      health appointments, and community announcements. Account verification may be 
                      required for certain services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resident Registration</h1>
          <p className="text-gray-600">Join the Barangay Bucana digital community</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center min-w-0 flex-1 ${
                index < steps.length - 1 ? 'border-r border-gray-200 pr-4' : ''
              } ${index > 0 ? 'pl-4' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : currentStep > step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 truncate">{step.title}</p>
                <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              <span>{steps[currentStep - 1].title}</span>
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!validateStep(currentStep) || isSubmitting}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{isSubmitting ? "Creating Account..." : "Complete Registration"}</span>
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/portal" className="text-blue-600 hover:underline font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}
