"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Crown, Users, Phone, Mail } from "lucide-react"

const officials = [
  {
    id: 1,
    name: "Maria Santos",
    position: "Barangay Captain",
    committee: "Executive",
    term: "2023-2026",
    contact: "+63 912 345 6789",
    email: "maria.santos@barangay.gov",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    position: "Kagawad",
    committee: "Peace & Order",
    term: "2023-2026",
    contact: "+63 912 345 6790",
    email: "juan.delacruz@barangay.gov",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Ana Rodriguez",
    position: "Kagawad",
    committee: "Health & Sanitation",
    term: "2023-2026",
    contact: "+63 912 345 6791",
    email: "ana.rodriguez@barangay.gov",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    position: "SK Chairman",
    committee: "Youth Development",
    term: "2023-2026",
    contact: "+63 912 345 6792",
    email: "carlos.mendoza@barangay.gov",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const committees = [
  { name: "Peace & Order", members: 3, chairman: "Juan Dela Cruz" },
  { name: "Health & Sanitation", members: 2, chairman: "Ana Rodriguez" },
  { name: "Education", members: 2, chairman: "Pedro Garcia" },
  { name: "Infrastructure", members: 3, chairman: "Luis Reyes" },
  { name: "Youth Development", members: 4, chairman: "Carlos Mendoza" },
]

export default function OfficialsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOfficials = officials.filter(
    (official) =>
      official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      official.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      official.committee.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Barangay Officials</h1>
          <p className="text-muted-foreground">Manage barangay officials and committees</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Official
        </Button>
      </div>

      <Tabs defaultValue="officials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="officials">Officials</TabsTrigger>
          <TabsTrigger value="committees">Committees</TabsTrigger>
          <TabsTrigger value="structure">Organizational Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="officials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Officials</CardTitle>
              <CardDescription>List of all barangay officials for term 2023-2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search officials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-4">
                {filteredOfficials.map((official) => (
                  <div key={official.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={official.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {official.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{official.name}</h3>
                        <p className="text-sm text-muted-foreground">{official.position}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{official.committee}</Badge>
                          <Badge variant={official.status === "Active" ? "default" : "secondary"}>
                            {official.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{official.term}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{official.contact}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{official.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="committees" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {committees.map((committee, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{committee.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Chairman:</span>
                      <span className="text-sm font-medium">{committee.chairman}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Members:</span>
                      <span className="text-sm font-medium">{committee.members}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Structure</CardTitle>
              <CardDescription>Barangay organizational chart and hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-8">
                {/* Barangay Captain */}
                <div className="flex justify-center">
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                    <Crown className="h-6 w-6 mx-auto mb-2" />
                    <h3 className="font-semibold">Barangay Captain</h3>
                    <p className="text-sm">Maria Santos</p>
                  </div>
                </div>

                {/* Kagawads */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {officials
                    .filter((o) => o.position === "Kagawad")
                    .map((kagawad) => (
                      <div key={kagawad.id} className="bg-secondary p-3 rounded-lg">
                        <h4 className="font-medium text-sm">{kagawad.position}</h4>
                        <p className="text-xs">{kagawad.name}</p>
                        <p className="text-xs text-muted-foreground">{kagawad.committee}</p>
                      </div>
                    ))}
                </div>

                {/* SK Chairman */}
                <div className="flex justify-center">
                  <div className="bg-accent p-4 rounded-lg">
                    <Users className="h-5 w-5 mx-auto mb-2" />
                    <h3 className="font-semibold">SK Chairman</h3>
                    <p className="text-sm">Carlos Mendoza</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
