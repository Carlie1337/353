"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Home, Users, Search, Plus, MapPin, Phone, DollarSign, Heart } from "lucide-react"

const households = [
  {
    id: 1,
    householdNumber: "HH-2024-001",
    headOfFamily: "Roberto Santos",
    address: "123 Mabini Street, Purok 1",
    members: 5,
    income: "₱25,000",
    status: "Active",
    programs: ["4Ps", "Senior Citizen"],
    contact: "+63 912 345 6789",
    dateRegistered: "2024-01-15",
  },
  {
    id: 2,
    householdNumber: "HH-2024-002",
    headOfFamily: "Maria Dela Cruz",
    address: "456 Rizal Avenue, Purok 2",
    members: 3,
    income: "₱18,000",
    status: "Active",
    programs: ["PWD Benefits"],
    contact: "+63 912 345 6790",
    dateRegistered: "2024-01-10",
  },
  {
    id: 3,
    householdNumber: "HH-2024-003",
    headOfFamily: "Juan Rodriguez",
    address: "789 Luna Street, Purok 3",
    members: 7,
    income: "₱32,000",
    status: "Active",
    programs: ["4Ps", "Scholarship"],
    contact: "+63 912 345 6791",
    dateRegistered: "2024-01-08",
  },
]

const socialPrograms = [
  { name: "4Ps (Pantawid Pamilyang Pilipino Program)", beneficiaries: 45, budget: "₱2,250,000" },
  { name: "Senior Citizen Benefits", beneficiaries: 78, budget: "₱468,000" },
  { name: "PWD Benefits", beneficiaries: 23, budget: "₱276,000" },
  { name: "Scholarship Program", beneficiaries: 32, budget: "₱320,000" },
  { name: "Livelihood Program", beneficiaries: 28, budget: "₱560,000" },
]

const demographics = [
  { category: "Total Households", count: 245, percentage: 100 },
  { category: "Low Income (Below ₱20,000)", count: 98, percentage: 40 },
  { category: "Middle Income (₱20,000-₱50,000)", count: 122, percentage: 50 },
  { category: "High Income (Above ₱50,000)", count: 25, percentage: 10 },
]

export default function HouseholdsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHouseholds = households.filter(
    (household) =>
      household.headOfFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.householdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Household Management</h1>
          <p className="text-muted-foreground">Manage household records and social programs</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Register Household
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Households</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Population</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,225</div>
            <p className="text-xs text-muted-foreground">Average 5 members per household</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Beneficiaries</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">206</div>
            <p className="text-xs text-muted-foreground">84% of households enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱24,500</div>
            <p className="text-xs text-muted-foreground">Monthly household income</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="households" className="space-y-4">
        <TabsList>
          <TabsTrigger value="households">Households</TabsTrigger>
          <TabsTrigger value="programs">Social Programs</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="households" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household Registry</CardTitle>
              <CardDescription>Complete list of registered households</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search households..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-4">
                {filteredHouseholds.map((household) => (
                  <div key={household.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {household.headOfFamily
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{household.headOfFamily}</h3>
                        <p className="text-sm text-muted-foreground">{household.householdNumber}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{household.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{household.contact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{household.members} members</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{household.income}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {household.programs.map((program, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                      <Badge variant={household.status === "Active" ? "default" : "secondary"}>
                        {household.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {socialPrograms.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Beneficiaries:</span>
                      <span className="text-sm font-medium">{program.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Budget:</span>
                      <span className="text-sm font-medium">{program.budget}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household Demographics</CardTitle>
              <CardDescription>Income distribution and household statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {demographics.map((demo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{demo.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {demo.count} households ({demo.percentage}%)
                      </span>
                    </div>
                    <Progress value={demo.percentage} className="h-2" />
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
