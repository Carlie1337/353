"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, Edit, Trash2, Home, MapPin, Phone, Mail, Calendar, User, Baby } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function HouseholdPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  // Sample household data
  const householdInfo = {
    id: "HH-2024-001",
    address: "123 Mabuhay Street, Purok 2",
    headOfFamily: "Juan Dela Cruz",
    totalMembers: 5,
    registrationDate: "January 15, 2024",
    status: "Active",
    contactNumber: "+63 912 345 6789",
    email: "juan.delacruz@email.com",
  }

  const familyMembers = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      relationship: "Head",
      age: 45,
      gender: "Male",
      civilStatus: "Married",
      occupation: "Teacher",
      education: "College Graduate",
      birthDate: "1979-03-15",
      isVoter: true,
      isPWD: false,
      isSenior: false,
    },
    {
      id: 2,
      name: "Maria Dela Cruz",
      relationship: "Spouse",
      age: 42,
      gender: "Female",
      civilStatus: "Married",
      occupation: "Nurse",
      education: "College Graduate",
      birthDate: "1982-07-22",
      isVoter: true,
      isPWD: false,
      isSenior: false,
    },
    {
      id: 3,
      name: "Jose Dela Cruz",
      relationship: "Son",
      age: 18,
      gender: "Male",
      civilStatus: "Single",
      occupation: "Student",
      education: "High School Graduate",
      birthDate: "2006-11-10",
      isVoter: true,
      isPWD: false,
      isSenior: false,
    },
    {
      id: 4,
      name: "Ana Dela Cruz",
      relationship: "Daughter",
      age: 15,
      gender: "Female",
      civilStatus: "Single",
      occupation: "Student",
      education: "High School",
      birthDate: "2009-04-18",
      isVoter: false,
      isPWD: false,
      isSenior: false,
    },
    {
      id: 5,
      name: "Lola Carmen",
      relationship: "Mother",
      age: 68,
      gender: "Female",
      civilStatus: "Widow",
      occupation: "Retired",
      education: "Elementary",
      birthDate: "1956-12-03",
      isVoter: true,
      isPWD: false,
      isSenior: true,
    },
  ]

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case "head":
        return <User className="h-4 w-4" />
      case "spouse":
        return <User className="h-4 w-4" />
      case "son":
      case "daughter":
        return <Baby className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusBadge = (member: any) => {
    const badges = []
    if (member.isVoter)
      badges.push(
        <Badge key="voter" variant="secondary">
          Voter
        </Badge>,
      )
    if (member.isPWD)
      badges.push(
        <Badge key="pwd" variant="destructive">
          PWD
        </Badge>,
      )
    if (member.isSenior)
      badges.push(
        <Badge key="senior" variant="outline">
          Senior
        </Badge>,
      )
    return badges
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Household Management</h2>
          <p className="text-muted-foreground">Manage your household information and family members</p>
        </div>
        <Button onClick={() => setIsAddMemberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Family Members</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Household ID</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{householdInfo.id}</div>
                <p className="text-xs text-muted-foreground">Registered {householdInfo.registrationDate}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{householdInfo.totalMembers}</div>
                <p className="text-xs text-muted-foreground">Family members</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Badge variant="default">{householdInfo.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">Household status</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Head of Family</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{householdInfo.headOfFamily}</div>
                <p className="text-xs text-muted-foreground">Primary contact</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Household Information</CardTitle>
              <CardDescription>Basic details about your household</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{householdInfo.address}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{householdInfo.contactNumber}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{householdInfo.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration">Registration Date</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{householdInfo.registrationDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
              <CardDescription>Manage your household members and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getRelationshipIcon(member.relationship)}
                          <h3 className="font-medium">{member.name}</h3>
                          <Badge variant="outline">{member.relationship}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Age: {member.age}</span>
                          <span>•</span>
                          <span>{member.gender}</span>
                          <span>•</span>
                          <span>{member.occupation}</span>
                        </div>
                        <div className="flex items-center space-x-2">{getStatusBadge(member)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household Documents</CardTitle>
              <CardDescription>Important documents related to your household</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Household Certificate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="default">Available</Badge>
                        <p className="text-xs text-muted-foreground">Last updated: March 15, 2024</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Barangay Clearance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="secondary">Pending</Badge>
                        <p className="text-xs text-muted-foreground">Requested: March 20, 2024</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Track Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Residency Certificate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="default">Available</Badge>
                        <p className="text-xs text-muted-foreground">Last updated: February 28, 2024</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household History</CardTitle>
              <CardDescription>Timeline of changes and updates to your household</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-muted pl-4 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">Member Added</span>
                      <span className="text-xs text-muted-foreground">March 20, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Added new family member: Ana Dela Cruz</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Information Updated</span>
                      <span className="text-xs text-muted-foreground">March 15, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Updated contact information</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Document Issued</span>
                      <span className="text-xs text-muted-foreground">February 28, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Household Certificate issued</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">Household Registered</span>
                      <span className="text-xs text-muted-foreground">January 15, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial household registration completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>Add a new member to your household. Fill in the required information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="son">Son</SelectItem>
                  <SelectItem value="daughter">Daughter</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthdate" className="text-right">
                Birth Date
              </Label>
              <Input id="birthdate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
