"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Siren,
  Phone,
  Radio,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Activity,
  Truck,
  Shield,
  Zap,
  MessageSquare,
  Navigation,
  Heart,
  Flame,
  Car,
  Building,
} from "lucide-react"

export default function TanodEmergencyPage() {
  const [emergencyType, setEmergencyType] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const activeEmergencies = [
    {
      id: "EMG-2024-003",
      type: "Flash Flood",
      location: "Purok 3-5, Low-lying areas",
      severity: "High",
      status: "Active",
      responders: 12,
      affectedResidents: 150,
      timeStarted: "1 hour ago",
      coordinator: "Tanod Garcia",
      description: "Heavy rainfall causing flash flooding in low-lying residential areas",
      responseTeams: ["Alpha Team", "Medical Unit", "Evacuation Team"],
      evacuationCenters: ["Community Center", "School Gymnasium"],
    },
  ]

  const emergencyContacts = [
    { name: "Fire Department", number: "116", type: "Fire Emergency", available: true },
    { name: "Police Emergency", number: "117", type: "Crime/Security", available: true },
    { name: "Medical Emergency", number: "911", type: "Medical", available: true },
    { name: "MDRRMO", number: "(082) 123-4567", type: "Disaster Response", available: true },
    { name: "Barangay Captain", number: "(082) 234-5678", type: "Local Authority", available: true },
    { name: "Health Center", number: "(082) 345-6789", type: "Medical", available: true },
    { name: "Coast Guard", number: "(082) 456-7890", type: "Water Emergency", available: false },
    { name: "Red Cross", number: "(082) 567-8901", type: "Humanitarian", available: true },
  ]

  const responseTeams = [
    {
      name: "Alpha Response Team",
      status: "Deployed",
      location: "Purok 3",
      members: 6,
      equipment: "Rescue boats, Life jackets, First aid",
      eta: "On site",
      contact: "Team Leader Santos",
      specialization: "Water Rescue",
    },
    {
      name: "Bravo Medical Team",
      status: "Standby",
      location: "Health Center",
      members: 4,
      equipment: "Medical supplies, Ambulance",
      eta: "Ready",
      contact: "Dr. Cruz",
      specialization: "Emergency Medical",
    },
    {
      name: "Charlie Evacuation Team",
      status: "En Route",
      location: "Purok 5",
      members: 8,
      equipment: "Transport vehicles, Communication gear",
      eta: "5 minutes",
      contact: "Team Leader Reyes",
      specialization: "Evacuation Operations",
    },
    {
      name: "Delta Security Team",
      status: "Available",
      location: "Barangay Hall",
      members: 5,
      equipment: "Security gear, Communication radios",
      eta: "Ready",
      contact: "Security Chief Lopez",
      specialization: "Area Security",
    },
  ]

  const emergencyTypes = [
    { value: "fire", label: "Fire Emergency", icon: Flame, color: "text-red-600" },
    { value: "flood", label: "Flood/Water Emergency", icon: Activity, color: "text-blue-600" },
    { value: "medical", label: "Medical Emergency", icon: Heart, color: "text-pink-600" },
    { value: "crime", label: "Crime in Progress", icon: Shield, color: "text-purple-600" },
    { value: "accident", label: "Traffic Accident", icon: Car, color: "text-orange-600" },
    { value: "natural", label: "Natural Disaster", icon: AlertTriangle, color: "text-yellow-600" },
    { value: "structural", label: "Building Emergency", icon: Building, color: "text-gray-600" },
    { value: "other", label: "Other Emergency", icon: Siren, color: "text-red-600" },
  ]

  const handleEmergencyAlert = () => {
    if (emergencyType && location && severity) {
      alert(`Emergency alert sent!\nType: ${emergencyType}\nLocation: ${location}\nSeverity: ${severity}`)
      setEmergencyType("")
      setLocation("")
      setDescription("")
      setSeverity("")
    }
  }

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case "Deployed":
        return "destructive"
      case "En Route":
        return "default"
      case "Standby":
        return "secondary"
      case "Available":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-red-900">Emergency Response Center</h1>
          <p className="text-gray-600 mt-1">Coordinate emergency response and disaster management</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <Badge variant="destructive" className="animate-pulse justify-center">
            <Activity className="h-3 w-3 mr-1" />
            EMERGENCY MODE
          </Badge>
          <Button className="bg-red-600 hover:bg-red-700">
            <Siren className="h-4 w-4 mr-2" />
            Broadcast Alert
          </Button>
        </div>
      </div>

      {/* Active Emergency Alert */}
      {activeEmergencies.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <Siren className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <strong>ACTIVE EMERGENCY:</strong> {activeEmergencies[0].type} in {activeEmergencies[0].location}
                <br />
                <span className="text-sm">
                  {activeEmergencies[0].affectedResidents} residents affected • {activeEmergencies[0].responders}{" "}
                  responders deployed • Started {activeEmergencies[0].timeStarted}
                </span>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 flex-1 lg:flex-none bg-transparent"
                >
                  View Details
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 flex-1 lg:flex-none">
                  Coordinate Response
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Emergencies</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <Siren className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Teams</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Affected Residents</p>
                <p className="text-2xl font-bold text-orange-600">150</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-green-600">4.2 min</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alert">New Alert</TabsTrigger>
          <TabsTrigger value="teams">Response Teams</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Active Emergency Details */}
          {activeEmergencies.map((emergency) => (
            <Card key={emergency.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Active Emergency: {emergency.type}
                </CardTitle>
                <CardDescription>Emergency ID: {emergency.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="font-medium">{emergency.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Severity</p>
                    <Badge variant="destructive">{emergency.severity}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Coordinator</p>
                    <p className="font-medium">{emergency.coordinator}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Affected Residents</p>
                    <p className="font-medium">{emergency.affectedResidents}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Teams</p>
                    <p className="font-medium">{emergency.responseTeams.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Duration</p>
                    <p className="font-medium">{emergency.timeStarted}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                  <p className="text-gray-700">{emergency.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Evacuation Centers</p>
                  <div className="flex flex-wrap gap-2">
                    {emergency.evacuationCenters.map((center, index) => (
                      <Badge key={index} variant="outline">
                        {center}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alert" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Emergency Alert Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Declare Emergency Alert
                </CardTitle>
                <CardDescription>Report and broadcast emergency situations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Emergency Type</label>
                  <Select value={emergencyType} onValueChange={setEmergencyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      {emergencyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-4 w-4 ${type.color}`} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Specific location of emergency"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Severity Level</label>
                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor incident</SelectItem>
                      <SelectItem value="medium">Medium - Moderate response needed</SelectItem>
                      <SelectItem value="high">High - Major emergency</SelectItem>
                      <SelectItem value="critical">Critical - Life threatening</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Detailed description of the emergency situation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleEmergencyAlert}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!emergencyType || !location || !severity}
                >
                  <Siren className="h-4 w-4 mr-2" />
                  Send Emergency Alert
                </Button>
              </CardContent>
            </Card>

            {/* Quick Emergency Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Quick Emergency Actions
                </CardTitle>
                <CardDescription>Immediate response actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 h-16 text-lg">
                  <Siren className="h-6 w-6 mr-3" />
                  MASS EVACUATION ALERT
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12">
                  <Radio className="h-5 w-5 mr-2" />
                  Emergency Broadcast
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  <Users className="h-5 w-5 mr-2" />
                  Deploy All Teams
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Notify Authorities
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Response Teams Status
              </CardTitle>
              <CardDescription>Current deployment and availability of emergency response teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {responseTeams.map((team, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{team.name}</h4>
                      <Badge variant={getTeamStatusColor(team.status)}>{team.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">Location:</span>
                          <p className="font-medium">{team.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Members:</span>
                          <p className="font-medium">{team.members}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Contact:</span>
                          <p className="font-medium">{team.contact}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">ETA:</span>
                          <p className="font-medium">{team.eta}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Specialization:</span>
                        <p className="font-medium">{team.specialization}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Equipment:</span>
                        <p className="text-gray-700">{team.equipment}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Radio className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MapPin className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Navigation className="h-3 w-3 mr-1" />
                        Deploy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Quick access to emergency services and authorities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contact.available ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <Phone className={`h-5 w-5 ${contact.available ? "text-green-600" : "text-red-600"}`} />
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.type}</p>
                        <p className="text-xs text-gray-500">{contact.available ? "Available" : "Unavailable"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg font-bold">{contact.number}</p>
                      <Button
                        size="sm"
                        className={`mt-1 ${contact.available ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}`}
                        disabled={!contact.available}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
