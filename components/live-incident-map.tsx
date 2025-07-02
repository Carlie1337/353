"use client"

import { useState } from "react"
import { UnifiedMap } from "./unified-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, MapPin, Users } from "lucide-react"

interface Incident {
  id: string
  type: string
  location: { lat: number; lng: number }
  address: string
  priority: "High" | "Medium" | "Low"
  status: "Active" | "Responding" | "Resolved"
  reportedAt: string
  assignedUnits: string[]
}

export function LiveIncidentMap() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "INC-001",
      type: "Traffic Accident",
      location: { lat: 7.0745, lng: 125.6135 },
      address: "Main Road Junction",
      priority: "High",
      status: "Active",
      reportedAt: "10 minutes ago",
      assignedUnits: ["Unit Alpha", "Ambulance 1"],
    },
    {
      id: "INC-002",
      type: "Medical Emergency",
      location: { lat: 7.0725, lng: 125.6115 },
      address: "Purok 3, Block 2",
      priority: "High",
      status: "Responding",
      reportedAt: "5 minutes ago",
      assignedUnits: ["Unit Bravo", "Ambulance 2"],
    },
    {
      id: "INC-003",
      type: "Noise Complaint",
      location: { lat: 7.0738, lng: 125.6142 },
      address: "Residential Area",
      priority: "Low",
      status: "Active",
      reportedAt: "25 minutes ago",
      assignedUnits: ["Unit Charlie"],
    },
  ])

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  // Convert incidents to map markers
  const incidentMarkers = incidents.map((incident) => ({
    id: incident.id,
    position: incident.location,
    type: "incident",
    title: incident.type,
    description: `${incident.address} - ${incident.priority} Priority`,
    status: incident.status,
    priority: incident.priority,
    data: incident,
  }))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "destructive"
      case "Responding":
        return "default"
      case "Resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <UnifiedMap
          center={{ lat: 7.0731, lng: 125.6128 }}
          zoom={16}
          height="600px"
          markers={incidentMarkers}
          onLocationClick={(location) => {
            console.log("New incident location:", location)
          }}
        />
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedIncident?.id === incident.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{incident.type}</h4>
                    <Badge variant={getPriorityColor(incident.priority)} className="text-xs">
                      {incident.priority}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{incident.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{incident.reportedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{incident.assignedUnits.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={getStatusColor(incident.status)} className="text-xs">
                      {incident.status}
                    </Badge>
                    <div className="text-xs text-gray-500">#{incident.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedIncident && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedIncident.type}</h4>
                <p className="text-sm text-gray-600">{selectedIncident.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">Priority</label>
                  <Badge variant={getPriorityColor(selectedIncident.priority)} className="text-xs mt-1">
                    {selectedIncident.priority}
                  </Badge>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Status</label>
                  <Badge variant={getStatusColor(selectedIncident.status)} className="text-xs mt-1">
                    {selectedIncident.status}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500">Assigned Units</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedIncident.assignedUnits.map((unit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {unit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Update Status
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Dispatch Unit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
