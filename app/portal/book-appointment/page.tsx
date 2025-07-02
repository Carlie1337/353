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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { User, Stethoscope, CheckCircle2, AlertCircle, Heart, Pill, Users } from "lucide-react"

export default function BookAppointmentPage() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [appointmentData, setAppointmentData] = useState({
    patientName: "Maria Santos", // Pre-filled from user session
    patientId: "P-2024-001",
    phone: "09123456789",
    email: "maria.santos@email.com",
    serviceType: "",
    preferredProvider: "",
    appointmentReason: "",
    symptoms: "",
    urgency: "routine",
  })

  const healthServices = [
    {
      id: "general-consultation",
      name: "General Consultation",
      description: "Basic health checkup and consultation",
      duration: "30 minutes",
      fee: "Free",
      icon: Stethoscope,
      available: true,
    },
    {
      id: "vaccination",
      name: "Vaccination Services",
      description: "Immunization and vaccination programs",
      duration: "15 minutes",
      fee: "Free",
      icon: Pill,
      available: true,
    },
    {
      id: "maternal-care",
      name: "Maternal Care",
      description: "Prenatal and postnatal care services",
      duration: "45 minutes",
      fee: "Free",
      icon: Heart,
      available: true,
    },
    {
      id: "senior-care",
      name: "Senior Citizen Care",
      description: "Specialized care for elderly residents",
      duration: "30 minutes",
      fee: "Free",
      icon: Users,
      available: true,
    },
  ]

  const providers = [
    { id: "dr-cruz", name: "Dr. Cruz", specialty: "General Medicine", available: true },
    { id: "dr-reyes", name: "Dr. Reyes", specialty: "Internal Medicine", available: true },
    { id: "dr-santos", name: "Dr. Santos", specialty: "Maternal Care", available: true },
    { id: "nurse-johnson", name: "Nurse Johnson", specialty: "Vaccination", available: true },
  ]

  const availableTimeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  const handleInputChange = (field: string, value: string) => {
    setAppointmentData((prev) => ({ ...prev, [field]: value }))
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

  if (success) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Appointment Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been scheduled. You will receive a confirmation message shortly.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Appointment Details</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Service:</strong> {healthServices.find((s) => s.id === selectedService)?.name}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Provider:</strong> {providers.find((p) => p.id === appointmentData.preferredProvider)?.name}
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSuccess(false)}>Book Another Appointment</Button>
              <Button variant="outline">View My Appointments</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Book Appointment</h2>
          <p className="text-muted-foreground">Schedule your health consultation or service</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Service Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Health Service</CardTitle>
              <CardDescription>Choose the type of health service you need</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                {healthServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={service.id} id={service.id} />
                    <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <service.icon className="h-6 w-6 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium text-green-600">{service.fee}</p>
                          <p className="text-gray-500">{service.duration}</p>
                          <Badge variant={service.available ? "default" : "secondary"}>
                            {service.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {selectedService && (
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Provide details for your appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Preferred Date *</Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Preferred Time *</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredProvider">Preferred Healthcare Provider</Label>
                    <Select
                      value={appointmentData.preferredProvider}
                      onValueChange={(value) => handleInputChange("preferredProvider", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name} - {provider.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <RadioGroup
                      value={appointmentData.urgency}
                      onValueChange={(value) => handleInputChange("urgency", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="routine" id="routine" />
                        <Label htmlFor="routine">Routine</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent">Urgent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="emergency" id="emergency" />
                        <Label htmlFor="emergency">Emergency</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentReason">Reason for Appointment *</Label>
                    <Textarea
                      id="appointmentReason"
                      value={appointmentData.appointmentReason}
                      onChange={(e) => handleInputChange("appointmentReason", e.target.value)}
                      placeholder="Please describe the reason for your visit..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Current Symptoms (if any)</Label>
                    <Textarea
                      id="symptoms"
                      value={appointmentData.symptoms}
                      onChange={(e) => handleInputChange("symptoms", e.target.value)}
                      placeholder="Describe any symptoms you're experiencing..."
                    />
                  </div>

                  {appointmentData.urgency === "emergency" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        For medical emergencies, please call 911 or visit the nearest emergency room immediately.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime}>
                      {isSubmitting ? "Booking..." : "Book Appointment"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Patient Information Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{appointmentData.patientName}</p>
                <p className="text-sm text-gray-600">ID: {appointmentData.patientId}</p>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Phone:</strong> {appointmentData.phone}
                </p>
                <p>
                  <strong>Email:</strong> {appointmentData.email}
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Center Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">Emergency services available 24/7</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ul className="list-disc pl-4 space-y-1">
                <li>Please arrive 15 minutes before your appointment</li>
                <li>Bring a valid ID and any relevant medical documents</li>
                <li>Appointments can be cancelled up to 2 hours before</li>
                <li>All services are free for barangay residents</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
