"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Heart, Activity, Pill, FileText, Calendar, AlertTriangle, Plus, Edit, Printer } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  address: string
  phone: string
  emergencyContact: string
  bloodType: string
  allergies: string[]
  chronicConditions: string[]
  insurance?: string
}

interface VitalSigns {
  id: string
  date: Date
  bloodPressure: string
  heartRate: number
  temperature: number
  weight: number
  height: number
  bmi: number
  respiratoryRate: number
  oxygenSaturation: number
  recordedBy: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: Date
  endDate?: Date
  prescribedBy: string
  instructions: string
  status: "active" | "completed" | "discontinued"
}

interface MedicalRecord {
  id: string
  date: Date
  type: "consultation" | "emergency" | "follow-up" | "vaccination" | "lab-result"
  chiefComplaint: string
  diagnosis: string
  treatment: string
  notes: string
  provider: string
  followUpDate?: Date
  attachments?: string[]
}

export function EMRInterface() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  // Mock patient data
  const mockPatient: Patient = {
    id: "P-2024-001",
    name: "Maria Santos",
    age: 45,
    gender: "Female",
    address: "123 Main St, Purok 1, Barangay Bucana",
    phone: "09123456789",
    emergencyContact: "Juan Santos - 09987654321",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    insurance: "PhilHealth",
  }

  const mockVitalSigns: VitalSigns[] = [
    {
      id: "1",
      date: new Date("2024-01-20"),
      bloodPressure: "140/90",
      heartRate: 78,
      temperature: 36.5,
      weight: 65,
      height: 160,
      bmi: 25.4,
      respiratoryRate: 18,
      oxygenSaturation: 98,
      recordedBy: "Nurse Ana",
    },
    {
      id: "2",
      date: new Date("2024-01-15"),
      bloodPressure: "135/85",
      heartRate: 75,
      temperature: 36.8,
      weight: 65.5,
      height: 160,
      bmi: 25.6,
      respiratoryRate: 16,
      oxygenSaturation: 99,
      recordedBy: "Dr. Cruz",
    },
  ]

  const mockMedications: Medication[] = [
    {
      id: "1",
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      startDate: new Date("2024-01-01"),
      prescribedBy: "Dr. Cruz",
      instructions: "Take with food in the morning",
      status: "active",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: new Date("2024-01-01"),
      prescribedBy: "Dr. Cruz",
      instructions: "Take with meals",
      status: "active",
    },
  ]

  const mockRecords: MedicalRecord[] = [
    {
      id: "1",
      date: new Date("2024-01-20"),
      type: "consultation",
      chiefComplaint: "Elevated blood pressure readings at home",
      diagnosis: "Hypertension - well controlled",
      treatment: "Continue current medications, lifestyle modifications",
      notes: "Patient reports good compliance with medications. BP slightly elevated today.",
      provider: "Dr. Cruz",
      followUpDate: new Date("2024-02-20"),
    },
    {
      id: "2",
      date: new Date("2024-01-15"),
      type: "lab-result",
      chiefComplaint: "Routine diabetes monitoring",
      diagnosis: "Type 2 Diabetes - good control",
      treatment: "Continue Metformin",
      notes: "HbA1c: 6.8% - within target range",
      provider: "Lab Tech Maria",
    },
  ]

  useState(() => {
    setSelectedPatient(mockPatient)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "discontinued":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "default"
      case "emergency":
        return "destructive"
      case "follow-up":
        return "secondary"
      case "vaccination":
        return "outline"
      case "lab-result":
        return "secondary"
      default:
        return "secondary"
    }
  }

  if (!selectedPatient) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Select a patient to view their medical records</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {selectedPatient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedPatient.age} years old</span>
                  <span>{selectedPatient.gender}</span>
                  <span>Blood Type: {selectedPatient.bloodType}</span>
                  <span>ID: {selectedPatient.id}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {selectedPatient.chronicConditions.map((condition) => (
                    <Badge key={condition} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print Summary
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Record
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* EMR Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="allergies">Allergies & Alerts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Information</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <Label>Address</Label>
                    <p className="text-muted-foreground">{selectedPatient.address}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-muted-foreground">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <p className="text-muted-foreground">{selectedPatient.emergencyContact}</p>
                  </div>
                  <div>
                    <Label>Insurance</Label>
                    <p className="text-muted-foreground">{selectedPatient.insurance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Latest Vital Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockVitalSigns[0] && (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label>Blood Pressure</Label>
                      <p className="font-medium">{mockVitalSigns[0].bloodPressure}</p>
                    </div>
                    <div>
                      <Label>Heart Rate</Label>
                      <p className="font-medium">{mockVitalSigns[0].heartRate} bpm</p>
                    </div>
                    <div>
                      <Label>Temperature</Label>
                      <p className="font-medium">{mockVitalSigns[0].temperature}°C</p>
                    </div>
                    <div>
                      <Label>Weight</Label>
                      <p className="font-medium">{mockVitalSigns[0].weight} kg</p>
                    </div>
                    <div>
                      <Label>BMI</Label>
                      <p className="font-medium">{mockVitalSigns[0].bmi}</p>
                    </div>
                    <div>
                      <Label>O2 Saturation</Label>
                      <p className="font-medium">{mockVitalSigns[0].oxygenSaturation}%</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Active Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Active Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMedications
                  .filter((med) => med.status === "active")
                  .map((medication) => (
                    <div key={medication.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {medication.name} {medication.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                        <p className="text-xs text-muted-foreground">{medication.instructions}</p>
                      </div>
                      <Badge variant={getStatusColor(medication.status)}>{medication.status}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Allergies & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Allergies & Medical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedPatient.allergies.map((allergy) => (
                  <Badge key={allergy} variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {allergy}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vital Signs History</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Vitals
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVitalSigns.map((vitals) => (
                  <div key={vitals.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{vitals.date.toLocaleDateString()}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Recorded by {vitals.recordedBy}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label>Blood Pressure</Label>
                        <p className="font-medium">{vitals.bloodPressure}</p>
                      </div>
                      <div>
                        <Label>Heart Rate</Label>
                        <p className="font-medium">{vitals.heartRate} bpm</p>
                      </div>
                      <div>
                        <Label>Temperature</Label>
                        <p className="font-medium">{vitals.temperature}°C</p>
                      </div>
                      <div>
                        <Label>Weight</Label>
                        <p className="font-medium">{vitals.weight} kg</p>
                      </div>
                      <div>
                        <Label>Height</Label>
                        <p className="font-medium">{vitals.height} cm</p>
                      </div>
                      <div>
                        <Label>BMI</Label>
                        <p className="font-medium">{vitals.bmi}</p>
                      </div>
                      <div>
                        <Label>Respiratory Rate</Label>
                        <p className="font-medium">{vitals.respiratoryRate}/min</p>
                      </div>
                      <div>
                        <Label>O2 Saturation</Label>
                        <p className="font-medium">{vitals.oxygenSaturation}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medication History</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Prescribe Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMedications.map((medication) => (
                  <div key={medication.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">
                          {medication.name} {medication.dosage}
                        </h4>
                        <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                      </div>
                      <Badge variant={getStatusColor(medication.status)}>{medication.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label>Start Date</Label>
                        <p>{medication.startDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>Prescribed By</Label>
                        <p>{medication.prescribedBy}</p>
                      </div>
                      <div className="col-span-2">
                        <Label>Instructions</Label>
                        <p>{medication.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medical Records</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Record
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecords.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{record.date.toLocaleDateString()}</span>
                        <Badge variant={getTypeColor(record.type)}>{record.type}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{record.provider}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label>Chief Complaint</Label>
                        <p className="text-sm">{record.chiefComplaint}</p>
                      </div>
                      <div>
                        <Label>Diagnosis</Label>
                        <p className="text-sm font-medium">{record.diagnosis}</p>
                      </div>
                      <div>
                        <Label>Treatment</Label>
                        <p className="text-sm">{record.treatment}</p>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <p className="text-sm">{record.notes}</p>
                      </div>
                      {record.followUpDate && (
                        <div>
                          <Label>Follow-up Date</Label>
                          <p className="text-sm">{record.followUpDate.toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Allergies & Medical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Known Allergies</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPatient.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Chronic Conditions</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPatient.chronicConditions.map((condition) => (
                      <Badge key={condition} variant="outline">
                        <Heart className="h-3 w-3 mr-1" />
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Medical Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No documents uploaded yet</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
