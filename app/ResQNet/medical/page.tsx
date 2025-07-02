"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, MapPin, Clock, AlertTriangle, Plus, Phone, Navigation, Package, UserCheck } from "lucide-react"

export default function MedicalResponsePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const medicalTeams = [
    {
      id: 1,
      name: "Medical Team Alpha",
      leader: "Dr. Maria Santos",
      members: 6,
      specialization: "Emergency Medicine",
      status: "Deployed",
      location: "Zone 2 - Flood Area",
      lastUpdate: "5 min ago",
      equipment: ["Ambulance", "Emergency Kit", "Defibrillator"],
      contact: "+63 912 345 6789",
    },
    {
      id: 2,
      name: "Medical Team Bravo",
      leader: "Dr. Juan Cruz",
      members: 4,
      specialization: "Trauma Care",
      status: "Available",
      location: "Medical Station 1",
      lastUpdate: "2 min ago",
      equipment: ["Mobile Unit", "Trauma Kit", "Oxygen"],
      contact: "+63 923 456 7890",
    },
    {
      id: 3,
      name: "Medical Team Charlie",
      leader: "Nurse Ana Reyes",
      members: 3,
      specialization: "Basic Care",
      status: "En Route",
      location: "Responding to Zone 4",
      lastUpdate: "1 min ago",
      equipment: ["First Aid Kit", "Medications"],
      contact: "+63 934 567 8901",
    },
  ]

  const casualties = [
    {
      id: 1,
      name: "Roberto Garcia",
      age: 45,
      condition: "Severe",
      injury: "Head trauma, lacerations",
      location: "Zone 2 Evacuation Center",
      assignedTeam: "Medical Team Alpha",
      status: "Under Treatment",
      time: "14:30",
    },
    {
      id: 2,
      name: "Elena Martinez",
      age: 32,
      condition: "Moderate",
      injury: "Broken arm, cuts",
      location: "Zone 1 Medical Station",
      assignedTeam: "Medical Team Bravo",
      status: "Stable",
      time: "14:45",
    },
    {
      id: 3,
      name: "Carlos Dela Cruz",
      age: 28,
      condition: "Minor",
      injury: "Minor cuts, shock",
      location: "Zone 3 First Aid",
      assignedTeam: "Local Volunteer",
      status: "Treated",
      time: "15:00",
    },
  ]

  const medicalSupplies = [
    {
      item: "Emergency Bandages",
      current: 150,
      minimum: 100,
      maximum: 200,
      status: "Adequate",
      location: "Medical Warehouse",
    },
    {
      item: "Pain Medications",
      current: 45,
      minimum: 50,
      maximum: 100,
      status: "Low",
      location: "Medical Station 1",
    },
    {
      item: "IV Fluids",
      current: 80,
      minimum: 60,
      maximum: 120,
      status: "Adequate",
      location: "Mobile Units",
    },
    {
      item: "Antibiotics",
      current: 25,
      minimum: 30,
      maximum: 60,
      status: "Critical",
      location: "Emergency Cache",
    },
    {
      item: "Oxygen Tanks",
      current: 12,
      minimum: 10,
      maximum: 20,
      status: "Adequate",
      location: "Ambulances",
    },
  ]

  const medicalFacilities = [
    {
      name: "Barangay Health Center",
      type: "Primary Care",
      status: "Operational",
      capacity: 20,
      currentPatients: 8,
      specialties: ["General Medicine", "First Aid"],
      contact: "+63 912 111 2222",
    },
    {
      name: "Mobile Medical Unit 1",
      type: "Mobile",
      status: "Deployed",
      capacity: 4,
      currentPatients: 2,
      specialties: ["Emergency Care", "Basic Surgery"],
      contact: "+63 923 333 4444",
    },
    {
      name: "Field Hospital",
      type: "Temporary",
      status: "Setting Up",
      capacity: 15,
      currentPatients: 0,
      specialties: ["Trauma Care", "Surgery"],
      contact: "+63 934 555 6666",
    },
  ]

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "Severe":
        return <Badge variant="destructive">Severe</Badge>
      case "Moderate":
        return <Badge variant="secondary">Moderate</Badge>
      case "Minor":
        return <Badge variant="outline">Minor</Badge>
      default:
        return <Badge variant="outline">{condition}</Badge>
    }
  }

  const getSupplyStatus = (status: string) => {
    switch (status) {
      case "Adequate":
        return "default"
      case "Low":
        return "secondary"
      case "Critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Deployed":
        return <Badge className="bg-blue-500">Deployed</Badge>
      case "Available":
        return <Badge className="bg-green-500">Available</Badge>
      case "En Route":
        return <Badge className="bg-yellow-500">En Route</Badge>
      case "Off Duty":
        return <Badge variant="outline">Off Duty</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medical Response</h1>
          <p className="text-muted-foreground">Emergency medical services coordination and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Hospital
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Incident
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalTeams.filter((t) => t.status !== "Off Duty").length}</div>
            <p className="text-xs text-muted-foreground">
              {medicalTeams.filter((t) => t.status === "Deployed").length} deployed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casualties</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{casualties.length}</div>
            <p className="text-xs text-muted-foreground">
              {casualties.filter((c) => c.condition === "Severe").length} severe cases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Facilities</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {medicalFacilities.filter((f) => f.status === "Operational").length}
            </div>
            <p className="text-xs text-muted-foreground">Operational facilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {medicalSupplies.filter((s) => s.status === "Low" || s.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Medical Teams</TabsTrigger>
          <TabsTrigger value="casualties">Casualties</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Medical Facilities Status</CardTitle>
                <CardDescription>Current operational status of medical facilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicalFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{facility.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {facility.currentPatients}/{facility.capacity} capacity
                        </p>
                      </div>
                    </div>
                    <Badge variant={facility.status === "Operational" ? "default" : "secondary"}>
                      {facility.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>Emergency response performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Response Time</span>
                    <span className="font-medium">8.5 minutes</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 10 minutes</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Treatment Success Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <p className="text-xs text-muted-foreground">Excellent performance</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resource Utilization</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <p className="text-xs text-muted-foreground">Optimal range</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Critical Supplies Alert</CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicalSupplies
                  .filter((s) => s.status === "Critical" || s.status === "Low")
                  .map((supply, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{supply.item}</p>
                        <p className="text-xs text-muted-foreground">{supply.current} remaining</p>
                      </div>
                      <Badge variant={getSupplyStatus(supply.status)}>{supply.status}</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Deployment</CardTitle>
                <CardDescription>Current medical team assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicalTeams
                  .filter((t) => t.status === "Deployed")
                  .map((team) => (
                    <div key={team.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.location}</p>
                      </div>
                      <Badge className="bg-blue-500">Deployed</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Cases</CardTitle>
                <CardDescription>Severe and critical patients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {casualties
                  .filter((c) => c.condition === "Severe")
                  .map((casualty) => (
                    <div key={casualty.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{casualty.name}</p>
                        <p className="text-xs text-muted-foreground">{casualty.injury}</p>
                      </div>
                      <Badge variant="destructive">Severe</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid gap-4">
            {medicalTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription>
                        Led by {team.leader} • {team.members} members • {team.specialization}
                      </CardDescription>
                    </div>
                    {getStatusBadge(team.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Current Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team.location}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Equipment</p>
                      <div className="flex flex-wrap gap-1">
                        {team.equipment.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Contact</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team.contact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-muted-foreground">Last update: {team.lastUpdate}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        Reassign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="casualties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Casualty Management</CardTitle>
              <CardDescription>Current patients and their treatment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casualties.map((casualty) => (
                  <div key={casualty.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">
                          {casualty.name}, {casualty.age}
                        </h4>
                        <p className="text-sm text-muted-foreground">{casualty.injury}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getConditionBadge(casualty.condition)}
                        <Badge variant="outline">{casualty.status}</Badge>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{casualty.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{casualty.assignedTeam}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Reported: {casualty.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Transfer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Supply Inventory</CardTitle>
              <CardDescription>Current stock levels and supply management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalSupplies.map((supply, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{supply.item}</h4>
                        <p className="text-sm text-muted-foreground">Location: {supply.location}</p>
                      </div>
                      <Badge variant={getSupplyStatus(supply.status)}>{supply.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Stock</span>
                        <span>
                          {supply.current} / {supply.maximum}
                        </span>
                      </div>
                      <Progress value={(supply.current / supply.maximum) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Minimum: {supply.minimum}</span>
                        <span>Maximum: {supply.maximum}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Request Resupply
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Count
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
