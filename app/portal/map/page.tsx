"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { UnifiedMap } from "@/components/unified-map"
import { SimpleLocationMap } from "@/components/simple-location-map"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { ErrorBoundary } from "@/components/enhanced-error-boundary"
import { MapPin, Navigation, Building, Heart, GraduationCap, ShoppingCart, Phone, Clock, Star, Search, Filter, Info, AlertTriangle } from 'lucide-react'

export default function PortalMapPage() {
  const facilities = [
    {
      id: "barangay-hall",
      name: "Barangay Bucana Hall",
      category: "Government",
      address: "Main Street, Bucana",
      phone: "(082) 123-4567",
      hours: "8:00 AM - 5:00 PM",
      rating: 4.5,
      services: ["Document Processing", "Certificates", "Permits"],
      location: { lat: 7.0731, lng: 125.6128 },
      icon: Building,
      color: "text-blue-600",
      status: "Open",
    },
    {
      id: "health-center",
      name: "Bucana Health Center",
      category: "Healthcare",
      address: "Health Street, Bucana",
      phone: "(082) 123-4568",
      hours: "24/7 Emergency",
      rating: 4.8,
      services: ["Medical Consultation", "Vaccination", "Emergency Care"],
      location: { lat: 7.0735, lng: 125.6125 },
      icon: Heart,
      color: "text-red-600",
      status: "Open",
    },
    {
      id: "elementary-school",
      name: "Bucana Elementary School",
      category: "Education",
      address: "Education Avenue, Bucana",
      phone: "(082) 123-4569",
      hours: "7:00 AM - 5:00 PM",
      rating: 4.3,
      services: ["Elementary Education", "After School Programs"],
      location: { lat: 7.0728, lng: 125.6135 },
      icon: GraduationCap,
      color: "text-green-600",
      status: "Open",
    },
    {
      id: "market",
      name: "Bucana Public Market",
      category: "Commerce",
      address: "Market Street, Bucana",
      phone: "(082) 123-4570",
      hours: "5:00 AM - 6:00 PM",
      rating: 4.1,
      services: ["Fresh Produce", "Meat & Fish", "Dry Goods"],
      location: { lat: 7.0725, lng: 125.614 },
      icon: ShoppingCart,
      color: "text-orange-600",
      status: "Open",
    },
  ]

  const emergencyContacts = [
    { name: "Barangay Emergency Hotline", number: "911", type: "emergency" },
    { name: "Barangay Captain", number: "(082) 123-4567", type: "official" },
    { name: "Health Center", number: "(082) 123-4568", type: "health" },
    { name: "Fire Department", number: "(082) 123-4571", type: "emergency" },
    { name: "Police Station", number: "(082) 123-4572", type: "security" },
  ]

  const safetyAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Road Construction",
      location: "Main Street",
      description: "Ongoing road repairs may cause traffic delays",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      title: "Community Event",
      location: "Barangay Plaza",
      description: "Basketball tournament this weekend",
      severity: "low",
    },
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Barangay Map & Directory</h1>
          <p className="text-muted-foreground">Find facilities, services, and important locations in Barangay Bucana</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button>
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </div>
      </div>

      {/* Safety Alerts */}
      {safetyAlerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Area Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {safetyAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{alert.title}</span>
                    <span className="text-muted-foreground"> - {alert.location}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Barangay Bucana Map
                  </CardTitle>
                  <CardDescription>Interactive map showing all facilities and services in the barangay</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    Legend
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] md:h-[600px]">
                <ErrorBoundary>
                  <RealGoogleMaps 
                    userRole="resident" 
                    userId="RES-2025-0089" 
                    userName="Juan Dela Cruz" 
                    height="100%" 
                  />
                </ErrorBoundary>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search facilities..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Category
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${facility.color}`}>
                        <facility.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{facility.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{facility.category}</Badge>
                          <Badge
                            variant={facility.status === "Open" ? "default" : "secondary"}
                            className={facility.status === "Open" ? "bg-green-100 text-green-800" : ""}
                          >
                            {facility.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{facility.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{facility.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{facility.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{facility.hours}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Services Offered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="h-48 rounded-lg overflow-hidden border">
                    <SimpleLocationMap
                      location={{
                        ...facility.location,
                        name: facility.name,
                        description: facility.address,
                      }}
                      height="100%"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" className="flex-1">
                      <Navigation className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Important phone numbers for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            contact.type === "emergency"
                              ? "bg-red-100 text-red-600"
                              : contact.type === "health"
                                ? "bg-green-100 text-green-600"
                                : contact.type === "security"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Phone className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="font-medium">{contact.name}</span>
                          <p className="text-xs text-muted-foreground capitalize">{contact.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg">{contact.number}</span>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${contact.number}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Emergency Locations
                </CardTitle>
                <CardDescription>Key locations for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 rounded-lg overflow-hidden border mb-4">
                  <ErrorBoundary>
                    <RealGoogleMaps 
                      userRole="resident" 
                      userId="RES-2025-0089" 
                      userName="Juan Dela Cruz" 
                      height="100%" 
                    />
                  </ErrorBoundary>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Emergency Services</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Public Facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Safe Areas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Evacuation Centers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Procedures */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Procedures</CardTitle>
              <CardDescription>What to do in different emergency situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-red-600 mb-2">🔥 Fire Emergency</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Call 911 immediately</li>
                    <li>• Evacuate the building</li>
                    <li>• Do not use elevators</li>
                    <li>• Meet at designated assembly point</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-blue-600 mb-2">🌊 Flood Emergency</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Move to higher ground</li>
                    <li>• Avoid walking in flood water</li>
                    <li>• Listen to official announcements</li>
                    <li>• Go to evacuation centers</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-green-600 mb-2">🏥 Medical Emergency</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Call 911 or health center</li>
                    <li>• Provide first aid if trained</li>
                    <li>• Keep patient calm</li>
                    <li>• Wait for medical assistance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
