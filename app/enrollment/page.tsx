import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { UserPlus, Users, QrCode, Home } from "lucide-react"

export default function EnrollmentPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">BAES - Barangay Automated Enrollment System</h2>
          <p className="text-muted-foreground">Digital enrollment system for resident and non-resident registration</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          New Registration
        </Button>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="households">Households</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Register New Resident</CardTitle>
              <CardDescription>Enter the details of the resident to register them in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middle-name">Middle Name</Label>
                  <Input id="middle-name" placeholder="Enter middle name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input id="suffix" placeholder="Jr., Sr., III, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Date of Birth</Label>
                  <Input id="birthdate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civil-status">Civil Status</Label>
                  <Select>
                    <SelectTrigger id="civil-status">
                      <SelectValue placeholder="Select civil status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="separated">Separated</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Enter contact number" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="House/Lot/Blk No., Street Name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purok">Purok/Zone</Label>
                  <Input id="purok" placeholder="Enter purok/zone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="household-id">Household ID</Label>
                  <Input id="household-id" placeholder="Enter or generate ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="household-role">Role in Household</Label>
                  <Select>
                    <SelectTrigger id="household-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">Head of Family</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="relative">Relative</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-type">ID Type</Label>
                  <Select>
                    <SelectTrigger id="id-type">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="philid">PhilID/National ID</SelectItem>
                      <SelectItem value="drivers">Driver's License</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="voters">Voter's ID</SelectItem>
                      <SelectItem value="sss">SSS ID</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input id="id-number" placeholder="Enter ID number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resident-type">Resident Type</Label>
                  <Select>
                    <SelectTrigger id="resident-type">
                      <SelectValue placeholder="Select resident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanent Resident</SelectItem>
                      <SelectItem value="temporary">Temporary Resident</SelectItem>
                      <SelectItem value="non-resident">Non-Resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Register Resident</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="households" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Household Management</CardTitle>
              <CardDescription>Create and manage household/family trees</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Home className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">Household Management</h3>
                  <p className="text-muted-foreground">Create and manage household relationships</p>
                </div>
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Create New Household
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>Approve or reject pending registrations</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">Verification Queue</h3>
                  <p className="text-muted-foreground">No pending registrations to verify</p>
                </div>
                <Button variant="outline">Refresh Queue</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr-codes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Generation</CardTitle>
              <CardDescription>Generate QR codes for resident identification</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <QrCode className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">QR Code Generator</h3>
                  <p className="text-muted-foreground">Generate QR codes for resident identification</p>
                </div>
                <Button>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
