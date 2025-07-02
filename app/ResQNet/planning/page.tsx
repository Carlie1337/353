"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  MapPin,
  Users,
  FileText,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  Edit,
} from "lucide-react"

export default function DisasterPlanningPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const plans = [
    {
      id: 1,
      name: "Flood Response Plan 2024",
      type: "Flood",
      status: "Active",
      lastUpdated: "2024-01-15",
      coverage: "Barangay-wide",
      completeness: 95,
    },
    {
      id: 2,
      name: "Earthquake Preparedness Plan",
      type: "Earthquake",
      status: "Under Review",
      lastUpdated: "2024-01-10",
      coverage: "High-risk zones",
      completeness: 87,
    },
    {
      id: 3,
      name: "Fire Emergency Response",
      type: "Fire",
      status: "Active",
      lastUpdated: "2024-01-08",
      coverage: "Residential areas",
      completeness: 92,
    },
    {
      id: 4,
      name: "Typhoon Evacuation Plan",
      type: "Typhoon",
      status: "Draft",
      lastUpdated: "2024-01-05",
      coverage: "Coastal areas",
      completeness: 65,
    },
  ]

  const riskAssessments = [
    {
      hazard: "Flooding",
      probability: "High",
      impact: "High",
      riskLevel: "Critical",
      lastAssessed: "2024-01-10",
    },
    {
      hazard: "Earthquake",
      probability: "Medium",
      impact: "High",
      riskLevel: "High",
      lastAssessed: "2024-01-08",
    },
    {
      hazard: "Fire",
      probability: "Medium",
      impact: "Medium",
      riskLevel: "Medium",
      lastAssessed: "2024-01-12",
    },
    {
      hazard: "Landslide",
      probability: "Low",
      impact: "High",
      riskLevel: "Medium",
      lastAssessed: "2024-01-06",
    },
  ]

  const evacuationSites = [
    {
      name: "Barangay Hall",
      capacity: 200,
      currentOccupancy: 0,
      status: "Ready",
      facilities: ["Water", "Power", "Medical", "Communications"],
    },
    {
      name: "Elementary School",
      capacity: 500,
      currentOccupancy: 0,
      status: "Ready",
      facilities: ["Water", "Power", "Kitchen", "Restrooms"],
    },
    {
      name: "Community Center",
      capacity: 150,
      currentOccupancy: 0,
      status: "Under Maintenance",
      facilities: ["Water", "Power"],
    },
    {
      name: "Basketball Court (Covered)",
      capacity: 300,
      currentOccupancy: 0,
      status: "Ready",
      facilities: ["Water", "Power", "Open Space"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Disaster Planning</h1>
          <p className="text-muted-foreground">Comprehensive disaster preparedness and response planning</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Plan
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Plan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Emergency Plans</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="evacuation">Evacuation Sites</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">2 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Areas</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Critical zones identified</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Evacuation Sites</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Total capacity: 2,500 people</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Trained personnel ready</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Plan Completion Status</CardTitle>
                <CardDescription>Overall preparedness across all disaster types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Flood Response</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fire Emergency</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Earthquake Prep</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Typhoon Evacuation</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>Latest changes to disaster plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Flood Response Plan updated</p>
                    <p className="text-xs text-muted-foreground">Jan 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Earthquake Plan under review</p>
                    <p className="text-xs text-muted-foreground">Jan 10, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New evacuation route mapped</p>
                    <p className="text-xs text-muted-foreground">Jan 8, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Response team trained</p>
                    <p className="text-xs text-muted-foreground">Jan 5, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid gap-4">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>
                        Type: {plan.type} • Coverage: {plan.coverage}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          plan.status === "Active"
                            ? "default"
                            : plan.status === "Under Review"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium">Completion</p>
                      <div className="mt-2">
                        <Progress value={plan.completeness} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{plan.completeness}% complete</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">{plan.lastUpdated}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>Current risk levels for identified hazards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Hazard Type</th>
                      <th className="text-left p-2">Probability</th>
                      <th className="text-left p-2">Impact</th>
                      <th className="text-left p-2">Risk Level</th>
                      <th className="text-left p-2">Last Assessed</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskAssessments.map((risk, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{risk.hazard}</td>
                        <td className="p-2">
                          <Badge variant="outline">{risk.probability}</Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{risk.impact}</Badge>
                        </td>
                        <td className="p-2">
                          <Badge
                            variant={
                              risk.riskLevel === "Critical"
                                ? "destructive"
                                : risk.riskLevel === "High"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {risk.riskLevel}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">{risk.lastAssessed}</td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evacuation" className="space-y-6">
          <div className="grid gap-4">
            {evacuationSites.map((site, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <CardDescription>
                        Capacity: {site.capacity} people • Current: {site.currentOccupancy}
                      </CardDescription>
                    </div>
                    <Badge variant={site.status === "Ready" ? "default" : "secondary"}>{site.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium mb-2">Available Facilities</p>
                      <div className="flex flex-wrap gap-1">
                        {site.facilities.map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Occupancy Rate</p>
                      <Progress value={(site.currentOccupancy / site.capacity) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {site.currentOccupancy} / {site.capacity} people
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
